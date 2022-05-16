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
    // TextField,
    Theme,
    Typography,
    CardActions,
    MenuItem,
    Button,
    FormControlLabel,
    Switch,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import AnimateButton from 'ui-component/extended/AnimateButton'
// import ErrorTwoToneIcon from '@material-ui/icons/ErrorTwoTone'
// import UploadTwoToneIcon from '@material-ui/icons/UploadTwoTone'
// import Avatar from 'ui-component/extended/Avatar'
// import { gridSpacing } from 'store/constant'

import TextField from '@mui/material/TextField'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps, category } from 'types'
import { getVehicleTypeRequest } from 'store/vehicleType/VehicleActions'
import { useDispatch } from 'react-redux'
import {
    createCategoryRequest,
    updateCategoryRequest,
} from 'store/Category/CategoryActions'
import { useNavigate } from 'react-router'
// import { DefaultRootStateProps } from 'types'

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
    weight_kg: number
    active: boolean
}

const Schema = yup.object().shape({
    axles: yup.number().required('Este campo es obligatorio'),
    weight_kg: yup.number().required('Este campo es obligatorio'),
    title: yup.string().required('Este campo es obligatorio'),
    description: yup.string().required('Este campo es requerido'),
    active: yup.boolean(),
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

    const [readOnlyState, setReadOnlyState] = React.useState<
        boolean | undefined
    >(readOnly)

    const [editable, setEditable] = React.useState<boolean>(false)

    const vehicles = useSelector(
        (state: DefaultRootStateProps) => state.Tvehicle
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
        setValue('axles', CategoryData?.axles, {
            shouldValidate: true,
        })
        setValue('weight_kg', CategoryData?.weight_kg, {
            shouldValidate: true,
        })
        setValue('title', CategoryData?.title, {
            shouldValidate: true,
        })
        setValue('description', CategoryData?.description, {
            shouldValidate: true,
        })
        // setActive(CategoryData?.active)
    }

    React.useEffect(() => {
        setValue('axles', CategoryData?.axles)
        setValue('weight_kg', CategoryData?.weight_kg)
        setValue('title', CategoryData?.title)
        setValue('description', CategoryData?.description)
    }, [CategoryData, setValue])

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const { axles, weight_kg, description, title, active } = data

        if (!editable) {
            dispatch(
                createCategoryRequest({
                    axles,
                    weight_kg,
                    description,
                    title,
                    active: active,
                })
            )
        }

        if (editable) {
            dispatch(
                updateCategoryRequest({
                    id: CategoryData?.id,
                    axles,
                    weight_kg,
                    description,
                    title,
                    active: active,
                })
            )
        }

        navigate(`/categorias`)
    }

    const handleTable = () => {
        navigate(`/categorias`)
    }

    React.useEffect(() => {
        dispatch(getVehicleTypeRequest())
    }, [dispatch])

    return (
        <>
            <Grid item xs={12}>
                <Typography variant="h4">Nueva categoría</Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2} alignItems="center">
                    {/* <Grid item>
                        <Avatar
                            alt="logo de la empresa"
                            className={classes.userAvatar}
                        />
                    </Grid> */}
                    <Grid item sm zeroMinWidth></Grid>
                    {!onlyView && readOnly ? (
                        <Grid item>
                            <AnimateButton>
                                <Button
                                    variant="contained"
                                    size="large"
                                    onClick={handleAbleToEdit}
                                >
                                    Editar
                                </Button>
                            </AnimateButton>
                        </Grid>
                    ) : null}
                </Grid>
            </Grid>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2} sx={{ marginTop: '5px' }}>
                    <Controller
                        name="title"
                        control={control}
                        // defaultValue={fleetData?.plate}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    select
                                    fullWidth
                                    label="Tipo de vehiculo"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    disabled={readOnlyState}
                                    error={!!errors.title}
                                    helperText={errors.title?.message}
                                >
                                    {vehicles.map((option) => (
                                        <MenuItem
                                            key={option.id}
                                            value={option.title}
                                        >
                                            {option.title}
                                        </MenuItem>
                                    ))}
                                </TextField>
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
                                    label="cantidad de ejes asociados"
                                    fullWidth
                                    size="small"
                                    type="number"
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
                                    label="Peso del vehiculo"
                                    size="small"
                                    type="number"
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
                                label="Activa"
                                labelPlacement="start"
                            />
                        )}
                    />
                </Grid>

                <CardActions>
                    <Grid container justifyContent="flex-end" spacing={0}>
                        <Grid item>
                            {editable ? (
                                <Grid item sx={{ display: 'flex' }}>
                                    <AnimateButton>
                                        <Button
                                            // variant="contained"
                                            size="medium"
                                            onClick={handleCancelEdit}
                                            className="mx-4"
                                            color="error"
                                        >
                                            Cancelar
                                        </Button>
                                    </AnimateButton>
                                    <AnimateButton>
                                        <Button
                                            variant="contained"
                                            size="medium"
                                            type="submit"
                                        >
                                            Aceptar
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            ) : null}
                            {readOnly ? null : (
                                <>
                                    <Grid item sx={{ display: 'flex' }}>
                                        <AnimateButton>
                                            <Button
                                                size="medium"
                                                onClick={handleTable}
                                                color="error"
                                                // disabled={loading}
                                                className="mx-4"
                                            >
                                                Cancelar
                                            </Button>
                                        </AnimateButton>
                                        <AnimateButton>
                                            <Button
                                                variant="contained"
                                                size="medium"
                                                type="submit"
                                            >
                                                Aceptar
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    </Grid>
                </CardActions>
            </form>
        </>
    )
}

export default FareProfile
