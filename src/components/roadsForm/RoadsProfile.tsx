import React from 'react'
import * as yup from 'yup'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'

import {
    Grid,
    TextField,
    Theme,
    Typography,
    CardActions,
    Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps, RoadsProps } from 'types'
import { getVehicleTypeRequest } from 'store/vehicleType/VehicleActions'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import AcceptButton from 'components/buttons/AcceptButton'
import EditButton from 'components/buttons/EditButton'
import CancelEditButton from 'components/buttons/CancelEditButton'
import CancelButton from 'components/buttons/CancelButton'
import AnimateButton from 'ui-component/extended/AnimateButton'
import {
    createRoadsRequest,
    updateRoadsRequest,
} from 'store/roads/roadsActions'

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
    name: string
    description: string
    highway_code: string
    category: string
}

const Schema = yup.object().shape({
    name: yup
        .string()
        .max(15, 'Debe tener máximo 15 caracteres')
        .required('Este campo es obligatorio'),
    description: yup
        .string()
        .max(45, 'Debe tener máximo 45 caracteres')
        .required('Este campo es requerido'),
    category: yup
        .string()
        .max(15, 'Debe tener máximo 15 caracteres')
        .required('Este campo es obligatorio'),
    highway_code: yup
        .string()
        .min(4, 'Debe tener 4 caracteres')
        .max(6, 'Debe tener máximo 6 caracteres')
        .required('Este campo es obligatorio'),
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

    const roads = useSelector((state: DefaultRootStateProps) => state.roads)
    const [RoadData] = React.useState<RoadsProps | undefined>(
        roads?.find((road) => road.id === fleetId)
    )

    const handleAbleToEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
    }

    const handleCancelEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
        if (readOnlyState) {
            setValue('name', RoadData?.name)
            setValue('highway_code', RoadData?.road_code)
            setValue('category', RoadData?.category)
            setValue('description', RoadData?.description)
        }
        // setActive(CategoryData?.active)
    }

    React.useEffect(() => {
        if (readOnlyState) {
            setValue('name', RoadData?.name)
            setValue('highway_code', RoadData?.road_code)
            setValue('category', RoadData?.category)
            setValue('description', RoadData?.description)
        }
    }, [RoadData, setValue])

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const { highway_code, name, category, description } = data

        const fetchData1 = async () => {
            setLoading(true)
            const responseData1 = await dispatch(
                createRoadsRequest({
                    road_code: highway_code,
                    name,
                    description,
                    category,
                })
            )
            setLoading(false)
            return responseData1
        }
        const fetchData2 = async () => {
            setLoading(true)
            const responseData2 = await dispatch(
                updateRoadsRequest({
                    id: RoadData?.id,
                    road_code: highway_code,
                    name,
                    description,
                    category,
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

        navigate(`/vias`)
    }

    const handleTable = () => {
        navigate(`/vias`)
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
                <Typography variant="h4">Vías y autopistas</Typography>
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
                        name="highway_code"
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
                                    error={!!errors.highway_code}
                                    helperText={errors.highway_code?.message}
                                />
                            </Grid>
                        )}
                    />

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
                        name="category"
                        control={control}
                        defaultValue={RoadData?.category}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    fullWidth
                                    label="Categoría"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    disabled={readOnlyState}
                                    error={!!errors.category}
                                    helperText={errors.category?.message}
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
