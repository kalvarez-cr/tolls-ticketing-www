import React from 'react'
import * as yup from 'yup'
// import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
// import { DefaultRootStateProps } from 'types'

//REDUX
// import { useSelector } from 'react-redux'
// import {
//     createFleetRequest,
//     updateFleetRequest,
// } from 'store/fleetCompany/FleetCompanyActions'
// material-ui
import {
    Grid,
    TextField,
    Theme,
    Typography,
    CardActions,
    Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
// import ErrorTwoToneIcon from '@material-ui/icons/ErrorTwoTone'
// import UploadTwoToneIcon from '@material-ui/icons/UploadTwoTone'
// import Avatar from 'ui-component/extended/Avatar'
// import { gridSpacing } from 'store/constant'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps, CategorySiteProps } from 'types'
import { getVehicleTypeRequest } from 'store/vehicleType/VehicleActions'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { onKeyDown } from 'components/utils'
import AcceptButton from 'components/buttons/AcceptButton'
import EditButton from 'components/buttons/EditButton'
import CancelEditButton from 'components/buttons/CancelEditButton'
import CancelButton from 'components/buttons/CancelButton'
import AnimateButton from 'ui-component/extended/AnimateButton'
import {
    updateCategorySiteRequest,
    createCategorySiteRequest,
} from 'store/categorySite/categorySiteActions'

const useStyles = makeStyles((theme: Theme) => ({
    alertIcon: {
        height: '16px',
        width: '16px',
        marginRight: '5px',
        verticalAlign: 'text-bottom',
        marginTop: '15px',
        marginLeft: '-15px',
    },
    userAvatar: {
        height: '80px',
        width: '80px',
    },
    input: {
        opacity: 0,
        position: 'absolute',
        zIndex: 1,
        padding: 0.5,
        cursor: 'pointer',
        width: '30%',
    },
    searchControl: {
        width: '100%',
        '& input': {
            background: 'transparent !important',
        },
        '& .Mui-focused input': {
            boxShadow: 'none',
        },
        ' & .css-1xu5ovs-MuiInputBase-input-MuiOutlinedInput-input': {
            color: '#6473a8',
        },

        [theme.breakpoints.down('lg')]: {
            width: '250px',
        },
        [theme.breakpoints.down('md')]: {
            width: '100%',
            marginLeft: '4px',
        },
    },
}))

// ==============================|| PROFILE 1 - PROFILE ACCOUNT ||============================== //
interface Inputs {
    category_code: string
    name: string
    description: string
    mandatory_services: any
}

const Schema = yup.object().shape({
    category_code: yup.string().required('Este campo es obligatorio'),
    name: yup.string().required('Este campo es obligatorio'),
    description: yup.string().required('Este campo es obligatorio'),
    mandatory_services: yup.string().required('Este campo es requerido'),
})

interface FleetProfileProps {
    fleetId?: string
    readOnly?: boolean
    onlyView?: boolean
}

const FareProfile = ({ fleetId, onlyView, readOnly }: FleetProfileProps) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm<Inputs>({
        resolver: yupResolver(Schema),
    })

    const [loading, setLoading] = React.useState(false)

    const [readOnlyState, setReadOnlyState] = React.useState<
        boolean | undefined
    >(readOnly)

    const [editable, setEditable] = React.useState<boolean>(false)

    const categories = useSelector(
        (state: DefaultRootStateProps) => state.categorySite
    )
    const [CategorySiteData] = React.useState<CategorySiteProps | undefined>(
        categories?.find((category) => category.id === fleetId)
    )
    console.log(CategorySiteData)

    const handleAbleToEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
    }

    const handleCancelEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
        if (readOnlyState) {
            setValue('category_code', CategorySiteData?.category_code)
            setValue('name', CategorySiteData?.name)
            setValue('description', CategorySiteData?.description)
            setValue('mandatory_services', CategorySiteData?.mandatory_services)
        }
        // setActive(CategoryData?.active)
    }

    React.useEffect(() => {
        if (readOnlyState) {
            setValue('category_code', CategorySiteData?.category_code)
            setValue('name', CategorySiteData?.name)
            setValue('description', CategorySiteData?.description)
            setValue('mandatory_services', CategorySiteData?.mandatory_services)
        }
    }, [CategorySiteData, setValue])

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const { description, category_code, name, mandatory_services } = data

        const fetchData1 = async () => {
            setLoading(true)
            const responseData1 = await dispatch(
                createCategorySiteRequest({
                    description,
                    category_code,
                    name,
                    mandatory_services,
                })
            )
            setLoading(false)
            return responseData1
        }
        const fetchData2 = async () => {
            setLoading(true)
            const responseData2 = await dispatch(
                updateCategorySiteRequest({
                    id: CategorySiteData?.id,
                    description,
                    category_code,
                    name,
                    mandatory_services,
                })
            )
            setLoading(false)
            return responseData2
        }
        if (!editable) {
            fetchData1()
        }

        if (editable) {
            fetchData2()
        }

        navigate(`/categorias-de-peaje`)
    }

    const handleTable = () => {
        navigate(`/categorias-de-peaje`)
    }

    React.useEffect(() => {
        dispatch(getVehicleTypeRequest())
    }, [dispatch])

    const handleReturnTable = () => {
        navigate(-1)
    }

    return (
        <>
            <Grid item xs={12}>
                <Typography variant="h4">Categoría de peajes</Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item sm zeroMinWidth></Grid>
                    {!onlyView && readOnly ? (
                        <Grid item>
                            <EditButton
                                loading={loading}
                                handleAbleToEdit={handleAbleToEdit}
                            />
                        </Grid>
                    ) : null}
                </Grid>
            </Grid>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2} sx={{ marginTop: '5px' }}>
                    <Controller
                        name="category_code"
                        control={control}
                        // defaultValue={CategoryData?.title}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    fullWidth
                                    label="Código"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    disabled={readOnlyState}
                                    error={!!errors.category_code}
                                    helperText={errors.category_code?.message}
                                />
                            </Grid>
                        )}
                    />
                </Grid>
                <Grid container spacing={2} sx={{ marginTop: '5px' }}>
                    <Controller
                        name="name"
                        control={control}
                        // defaultValue={fleetData?.unit_id}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    label="Nombre"
                                    fullWidth
                                    size="small"
                                    onKeyDown={onKeyDown}
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                    disabled={readOnlyState}
                                />
                            </Grid>
                        )}
                    />
                    <Controller
                        name="description"
                        control={control}
                        // defaultValue={fleetData?.transportation_mean}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    fullWidth
                                    label="Descripción"
                                    size="small"
                                    onKeyDown={onKeyDown}
                                    autoComplete="off"
                                    {...field}
                                    disabled={readOnlyState}
                                    error={!!errors.description}
                                    helperText={errors.description?.message}
                                />
                            </Grid>
                        )}
                    />
                    {/* <Controller
                        name="name_category"
                        control={control}
                        // defaultValue={fleetData?.transportation_mean}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    fullWidth
                                    label="Nombre de categoría"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    disabled={readOnlyState}
                                    error={!!errors.name_category}
                                    helperText={errors.name_category?.message}
                                />
                            </Grid>
                        )}
                    />
                    <Controller
                        name="abbreviation"
                        control={control}
                        // defaultValue={fleetData?.transportation_mean}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    fullWidth
                                    label="Abreviatura"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    disabled={readOnlyState}
                                    error={!!errors.abbreviation}
                                    helperText={errors.abbreviation?.message}
                                />
                            </Grid>
                        )}
                    /> */}
                    <Controller
                        name="mandatory_services"
                        control={control}
                        // defaultValue={fleetData?.transportation_mean}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={12}
                                className={classes.searchControl}
                            >
                                <TextField
                                    select
                                    fullWidth
                                    label="Servicios obligatorios"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    disabled={readOnlyState}
                                    error={!!errors.mandatory_services}
                                    helperText={
                                        errors.mandatory_services?.message
                                    }
                                />
                            </Grid>
                        )}
                    />
                </Grid>
                <CardActions>
                    <Grid container justifyContent="flex-end" spacing={0}>
                        {editable ? (
                            <Grid item sx={{ display: 'flex' }}>
                                <CancelEditButton
                                    loading={loading}
                                    handleCancelEdit={handleCancelEdit}
                                />
                                <AcceptButton loading={loading} />
                            </Grid>
                        ) : null}
                        {readOnly ? null : (
                            <>
                                <Grid item sx={{ display: 'flex' }}>
                                    <CancelButton
                                        loading={loading}
                                        handleTable={handleTable}
                                    />
                                    <AcceptButton loading={loading} />
                                </Grid>
                            </>
                        )}
                        <Grid container className="mr-auto">
                            <Grid item>
                                <AnimateButton>
                                    <Button
                                        variant="contained"
                                        size="medium"
                                        onClick={handleReturnTable}
                                    >
                                        Volver
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardActions>
            </form>
        </>
    )
}

export default FareProfile
