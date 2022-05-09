import React from 'react'
import * as yup from 'yup'
// import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
// import { DefaultRootStateProps } from 'types'

// material-ui
import {
    Grid,
    // TextField,
    Theme,
    Typography,
    CardActions,
    // MenuItem,
    Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import AnimateButton from 'ui-component/extended/AnimateButton'
import TextField from '@mui/material/TextField'
import { MenuItem } from '@mui/material'
//REDUX
import { useSelector, useDispatch } from 'react-redux'
import { account, DefaultRootStateProps } from 'types'

import { useNavigate } from 'react-router'
import { getCategoryRequest } from 'store/Category/CategoryActions'

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
    active: boolean
    license_plate: string
    make?: string
    model: string
    year: string
    color: string
    category: string
    axles: string
    weight: string
    tag_id: string
}

const Schema = yup.object().shape({
    license_plate: yup
        .string()
        .max(8, 'Máximo 8 caracteres')
        .required('Este campo es requerido'),
    // make: yup.string().required('Este campo es requerido'),
    model: yup.string().required('Este campo es requerido'),
    year: yup.number().required('Este campo es requerido'),
    color: yup.string().required('Este campo es requerido'),
    category: yup.string().required('Este campo es requerido'),
    axles: yup.number().required('Este campo es requerido'),
    weight: yup.number().required('Este campo es requerido'),
    tag_id: yup.string().required('Este campo es requerido'),
    active: yup.boolean(),
})

interface FleetProfileProps {
    fleetId?: string
    readOnly?: boolean
    onlyView?: boolean
}

const AssociateVehicleProfile = ({
    fleetId,
    onlyView,
    readOnly,
}: FleetProfileProps) => {
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

    const accounts = useSelector(
        (state: DefaultRootStateProps) => state.account
    )

    const [readOnlyState, setReadOnlyState] = React.useState<
        boolean | undefined
    >(readOnly)

    const [editable, setEditable] = React.useState<boolean>(false)

    const [AccountData] = React.useState<account | any>(
        accounts?.find((account) => account.id === fleetId)
    )
    const category = useSelector(
        (state: DefaultRootStateProps) => state.category
    )

    const handleAbleToEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
    }

    const handleCancelEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
        // setValue('tag_id', AccountData?.tag_id, {})
        // setValue('make', AccountData?.make, {})
        // setValue('model', AccountData?.model, {})
        // setValue('year', AccountData?.year, {})
        // setValue('color', AccountData?.color, {})
        // setValue('category', AccountData?.category, {})
        // setValue('axles', AccountData?.axles, {})
        // setValue('weight', AccountData?.weight, {})
        // setValue('license_plate', AccountData?.license_plate, {})
        // setActive(AccountData?.setActive)
    }

    React.useEffect(() => {
        dispatch(getCategoryRequest())
        // setValue('tag_id', AccountData?.tag_id, {})
        // setValue('make', AccountData?.make, {})
        // setValue('model', AccountData?.model, {})
        // setValue('year', AccountData?.year, {})
        // setValue('color', AccountData?.color, {})
        // setValue('category', AccountData?.category, {})
        // setValue('axles', AccountData?.axles, {})
        // setValue('weight', AccountData?.weight, {})
        // setValue('license_plate', AccountData?.license_plate, {})
        // setActive(AccountData?.setActive)
    }, [dispatch, setValue])
    const onInvalid = (data) => {
        console.log(data)
    }

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        // navigate(`/gestion-de-cuentas-usuarios`)
    }
    const handleTable = () => {
        navigate(`/gestion-de-cuentas-usuarios/vehiculos`)
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
                <Grid
                    item
                    xs={12}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h4">Asociación de vehiculo</Typography>

                    {!onlyView && readOnly ? (
                        <Grid item sx={{ marginRight: '16px' }}>
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
                <Grid container spacing={2} sx={{ marginTop: '5px' }}>
                    <Controller
                        name="tag_id"
                        control={control}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Tag"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.tag_id}
                                    helperText={errors.tag_id?.message}
                                    disabled={readOnlyState}
                                />
                            </Grid>
                        )}
                    />

                    <Controller
                        name="license_plate"
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
                                    label="Marca del vehiculo"
                                    fullWidth
                                    select
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.license_plate}
                                    helperText={errors.license_plate?.message}
                                    disabled={readOnlyState}
                                >
                                    {
                                        <MenuItem key={'Ford'} value={'ford'}>
                                            {'Ford'}
                                        </MenuItem>
                                    }
                                </TextField>
                            </Grid>
                        )}
                    />
                    <Controller
                        name="license_plate"
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
                                    label="Modelo del vehiculo"
                                    fullWidth
                                    select
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.license_plate}
                                    helperText={errors.license_plate?.message}
                                    disabled={readOnlyState}
                                >
                                    {
                                        <>
                                            <MenuItem
                                                key={'explorer'}
                                                value={'explorer'}
                                            >
                                                {'Explorer'}
                                            </MenuItem>
                                            <MenuItem
                                                key={'escape'}
                                                value={'escape'}
                                            >
                                                {'Escape'}
                                            </MenuItem>
                                            <MenuItem
                                                key={'fiesta'}
                                                value={'fiesta'}
                                            >
                                                {'Fiesta'}
                                            </MenuItem>
                                        </>
                                    }
                                </TextField>
                            </Grid>
                        )}
                    />
                    <Controller
                        name="license_plate"
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
                                    label="Tipo de vehiculo"
                                    fullWidth
                                    select
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.license_plate}
                                    helperText={errors.license_plate?.message}
                                    disabled={readOnlyState}
                                >
                                    {
                                        <>
                                            <MenuItem
                                                key={'sedan'}
                                                value={'sedan'}
                                            >
                                                {'Sedan'}
                                            </MenuItem>
                                            <MenuItem
                                                key={'pickup'}
                                                value={'pickup'}
                                            >
                                                {'Pickup'}
                                            </MenuItem>
                                            <MenuItem
                                                key={'coupe'}
                                                value={'coupe'}
                                            >
                                                {'Coupé'}
                                            </MenuItem>
                                        </>
                                    }
                                </TextField>
                            </Grid>
                        )}
                    />
                    <Controller
                        name="license_plate"
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
                                    label="Categoria"
                                    fullWidth
                                    select
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.license_plate}
                                    helperText={errors.license_plate?.message}
                                    disabled={readOnlyState}
                                >
                                    {category.map((option) => (
                                        <MenuItem
                                            key={option.id}
                                            value={option.id}
                                        >
                                            {option.title}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        )}
                    />
                    <Controller
                        name="model"
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
                                    label="Placa del vehiculo"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.model}
                                    helperText={errors.model?.message}
                                    disabled={readOnlyState}
                                />
                            </Grid>
                        )}
                    />

                    <Controller
                        name="year"
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
                                    label="Vin"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.year}
                                    helperText={errors.year?.message}
                                    disabled={readOnlyState}
                                />
                            </Grid>
                        )}
                    />
                    <Controller
                        name="color"
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
                                    label="Configuración de ejes"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.color}
                                    helperText={errors.color?.message}
                                    disabled={readOnlyState}
                                />
                            </Grid>
                        )}
                    />

                    <Controller
                        name="category"
                        control={control}
                        defaultValue={AccountData?.category}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    label="Peso del vehiculo"
                                    fullWidth
                                    type="number"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.category}
                                    helperText={errors.category?.message}
                                    disabled={readOnlyState}
                                />
                            </Grid>
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
                            {editable ? null : (
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
                                                Asociar
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

export default AssociateVehicleProfile
