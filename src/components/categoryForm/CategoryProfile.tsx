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
    FormControlLabel,
    Switch,
    Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
// import ErrorTwoToneIcon from '@material-ui/icons/ErrorTwoTone'
// import UploadTwoToneIcon from '@material-ui/icons/UploadTwoTone'
// import Avatar from 'ui-component/extended/Avatar'
// import { gridSpacing } from 'store/constant'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps, category } from 'types'
import { getVehicleTypeRequest } from 'store/vehicleType/VehicleActions'
import { useDispatch } from 'react-redux'
import {
    createCategoryRequest,
    updateCategoryRequest,
} from 'store/Category/CategoryActions'
import { useNavigate } from 'react-router'
import { onKeyDown } from 'components/utils'
import AcceptButton from 'components/buttons/AcceptButton'
import EditButton from 'components/buttons/EditButton'
import CancelEditButton from 'components/buttons/CancelEditButton'
import CancelButton from 'components/buttons/CancelButton'
import AnimateButton from 'ui-component/extended/AnimateButton'

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
    title: string
    description: string
    axles: number
    weight_kg: string
    active: boolean
    code_category: string
}

const Schema = yup.object().shape({
    axles: yup
        .number()
        .typeError('Debe ser un número')
        .required('Este campo es obligatorio')
        .max(4, 'Solo puede tener 4 Carácteres'),
    weight_kg: yup
        .string()
        .typeError('Debe ser un número')
        .required('Este campo es obligatorio')
        .max(4, 'Solo puede tener 4 Carácteres'),
    title: yup.string().required('Este campo es obligatorio').max(49, 'Solo puede tener 49 Carácteres'),
    description: yup.string().required('Este campo es requerido').max(50, 'Solo puede tener 50 Carácteres'),
    active: yup.boolean(),
    code_category: yup
        .string()
        .min(2, 'Solo puede tener 2 Carácteres')
        .max(2, 'Solo puede tener 2 Carácteres'),
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
        mode: 'onChange',
    })

    const [loading, setLoading] = React.useState(false)

    const [readOnlyState, setReadOnlyState] = React.useState<
        boolean | undefined
    >(readOnly)

    const [editable, setEditable] = React.useState<boolean>(false)

    const role = useSelector(
        (state: DefaultRootStateProps) => state.login?.user?.role
    )
    const categories = useSelector(
        (state: DefaultRootStateProps) => state.category
    )
    const [CategoryData] = React.useState<category | undefined>(
        categories?.find((category) => category.id === fleetId)
    )
    const [active, setActive] = React.useState<boolean>(
        CategoryData?.active !== undefined ? CategoryData?.active : false
    )

    const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name

        if (name === 'active') {
            setActive(!active)
            setValue(name, !active)
        }
    }

    const handleAbleToEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
    }

    const handleCancelEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
        if (readOnlyState) {
            setValue('axles', CategoryData?.axles)
            setValue('weight_kg', CategoryData?.weight_kg)
            setValue('title', CategoryData?.title)
            setValue('description', CategoryData?.description)
            setValue('code_category', CategoryData?.code_category)
        }
        // setActive(CategoryData?.active)
    }

    React.useEffect(() => {
        if (readOnlyState) {
            setValue('axles', CategoryData?.axles)
            setValue('weight_kg', CategoryData?.weight_kg)
            setValue('title', CategoryData?.title)
            setValue('description', CategoryData?.description)
            setValue('code_category', CategoryData?.code_category)
        }
    }, [CategoryData, setValue])

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const { axles, weight_kg, description, title, active, code_category } =
            data

        const fetchData1 = async () => {
            setLoading(true)
            const responseData1 = await dispatch(
                createCategoryRequest({
                    axles,
                    weight_kg,
                    description,
                    title,
                    active: active,
                    code_category,
                })
            )
            setLoading(false)
            return responseData1
        }
        const fetchData2 = async () => {
            setLoading(true)
            const responseData2 = await dispatch(
                updateCategoryRequest({
                    id: CategoryData?.id,
                    axles,
                    weight_kg,
                    description,
                    title,
                    active: active,
                    code_category,
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

        navigate(`/categorias`)
    }

    const handleTable = () => {
        navigate(`/categorias`)
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
                <Typography variant="h4">Categoría</Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item sm zeroMinWidth></Grid>
                    {!onlyView && readOnly && role !== 'visualizer' ? (
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
                        name="code_category"
                        control={control}
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
                                    error={!!errors.code_category}
                                    helperText={errors.code_category?.message}
                                />
                            </Grid>
                        )}
                    />

                    <Controller
                        name="title"
                        control={control}
                        defaultValue={CategoryData?.title}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    fullWidth
                                    label="Tipo de vehículo"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    disabled={readOnlyState}
                                    error={!!errors.title}
                                    helperText={errors.title?.message}
                                />
                            </Grid>
                        )}
                    />
                </Grid>
                <Grid container spacing={2} sx={{ marginTop: '5px' }}>
                    <Controller
                        name="axles"
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
                                    label="Cantidad de ejes asociados"
                                    fullWidth
                                    size="small"
                                    onKeyDown={onKeyDown}
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.axles}
                                    helperText={errors.axles?.message}
                                    disabled={readOnlyState}
                                />
                            </Grid>
                        )}
                    />
                    <Controller
                        name="weight_kg"
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
                                    label="Peso del vehículo(kg)"
                                    size="small"
                                    onKeyDown={onKeyDown}
                                    autoComplete="off"
                                    {...field}
                                    disabled={readOnlyState}
                                    error={!!errors.weight_kg}
                                    helperText={errors.weight_kg?.message}
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
                        name="description"
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
                                    fullWidth
                                    label="Descripción de la categoría"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    disabled={readOnlyState}
                                    error={!!errors.description}
                                    helperText={errors.description?.message}
                                />
                            </Grid>
                        )}
                    />

                    <Controller
                        name="active"
                        control={control}
                        render={({ field }) => (
                            <FormControlLabel
                                {...field}
                                value={active || ''}
                                name="active"
                                sx={{ marginTop: '10px', marginLeft: '25px' }}
                                control={
                                    <Switch
                                        color="primary"
                                        onChange={handleSwitch}
                                        value={active}
                                        checked={active}
                                        disabled={readOnlyState}
                                    />
                                }
                                label="Activo"
                                labelPlacement="start"
                            />
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
