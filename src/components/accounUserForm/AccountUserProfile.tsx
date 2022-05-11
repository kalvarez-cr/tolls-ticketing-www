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
    FormControlLabel,
    Switch,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import AnimateButton from 'ui-component/extended/AnimateButton'
import TextField from '@mui/material/TextField'
import { MenuItem } from '@mui/material'
//REDUX
import { useSelector, useDispatch } from 'react-redux'
import { account, DefaultRootStateProps } from 'types'

import { useNavigate } from 'react-router'
import { gridSpacing } from 'store/constant'

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

const criteria = [
    {
        value: 'juridico',
        label: 'Juridico',
    },
    {
        value: 'natural',
        label: 'Natural',
    },
]

const AccountUserProfile = ({
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
    const [criterio, setCriterio] = React.useState<string>('')

    const [AccountData] = React.useState<account | any>(
        accounts?.find((account) => account.id === fleetId)
    )

    const [active, setActive] = React.useState<boolean>(AccountData?.active)

    const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name

        if (name === 'active') {
            setActive(!active)
            setValue(name, !active)
        }
    }

    const handleCriteria = (event) => {
        const value = event.target.value

        setValue('tag_id', value, { shouldValidate: true })
        setCriterio(event.target.value)
    }

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
        const {} = data
        // navigate(`/gestion-de-cuentas-usuarios`)
    }
    const handleTable = () => {
        navigate(`/gestion-de-cuentas-usuarios`)
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
                    <Typography variant="h4">
                        Gestión de cuentas de usuario
                    </Typography>

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
                        defaultValue={AccountData?.tag_id || ''}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    label="Tipo de persona"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.tag_id}
                                    helperText={errors.tag_id?.message}
                                    disabled={readOnlyState}
                                    onChange={handleCriteria}
                                >
                                    {criteria &&
                                        criteria.map((option) => (
                                            <MenuItem
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                </TextField>
                            </Grid>
                        )}
                    />

                    {criterio === 'juridico' && (
                        <>
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
                                            label="Nombre de la empresa"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            {...field}
                                            error={!!errors.license_plate}
                                            helperText={
                                                errors.license_plate?.message
                                            }
                                            disabled={readOnlyState}
                                        />
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
                                            label="Rif"
                                            fullWidth
                                            type="number"
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
                                            label="Estado"
                                            fullWidth
                                            select
                                            size="small"
                                            autoComplete="off"
                                            {...field}
                                            error={!!errors.year}
                                            helperText={errors.year?.message}
                                            disabled={readOnlyState}
                                        >
                                            {
                                                <MenuItem
                                                    key={'Distrito Capital'}
                                                    value={'Distrito Capital'}
                                                >
                                                    {'Distrito Capital'}
                                                </MenuItem>
                                            }
                                        </TextField>
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
                                            label="Municipio"
                                            fullWidth
                                            select
                                            size="small"
                                            autoComplete="off"
                                            {...field}
                                            error={!!errors.color}
                                            helperText={errors.color?.message}
                                            disabled={readOnlyState}
                                        >
                                            {
                                                <MenuItem
                                                    key={'Libertador'}
                                                    value={'Libertador'}
                                                >
                                                    {'Libertador'}
                                                </MenuItem>
                                            }
                                        </TextField>
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
                                            label="Email"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            {...field}
                                            error={!!errors.category}
                                            helperText={
                                                errors.category?.message
                                            }
                                            disabled={readOnlyState}
                                        />
                                    </Grid>
                                )}
                            />

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
                                            label="Código de teléfono"
                                            fullWidth
                                            select
                                            size="small"
                                            type="number"
                                            autoComplete="off"
                                            {...field}
                                            error={!!errors.axles}
                                            helperText={errors.axles?.message}
                                            disabled={readOnlyState}
                                        >
                                            {
                                                <MenuItem
                                                    key={'04XX'}
                                                    value={'04XX'}
                                                >
                                                    {'04XX'}
                                                </MenuItem>
                                            }
                                        </TextField>
                                    </Grid>
                                )}
                            />
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
                                            label="Teléfono"
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

                            <Grid
                                container
                                spacing={gridSpacing}
                                sx={{ marginTop: '5px' }}
                            >
                                <Grid item xs={12}>
                                    <Typography variant="h4">
                                        Datos del representante legal
                                    </Typography>
                                </Grid>
                                <Controller
                                    name="weight"
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
                                                label="Primer nombre"
                                                fullWidth
                                                size="small"
                                                autoComplete="off"
                                                {...field}
                                                error={!!errors.weight}
                                                helperText={
                                                    errors.weight?.message
                                                }
                                                disabled={readOnlyState}
                                            />
                                        </Grid>
                                    )}
                                />
                                <Controller
                                    name="weight"
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
                                                label="Primer apellido"
                                                fullWidth
                                                size="small"
                                                autoComplete="off"
                                                {...field}
                                                error={!!errors.weight}
                                                helperText={
                                                    errors.weight?.message
                                                }
                                                disabled={readOnlyState}
                                            />
                                        </Grid>
                                    )}
                                />

                                <Controller
                                    name="weight"
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
                                                label="Tipo de documento"
                                                fullWidth
                                                select
                                                size="small"
                                                autoComplete="off"
                                                {...field}
                                                error={!!errors.weight}
                                                helperText={
                                                    errors.weight?.message
                                                }
                                                disabled={readOnlyState}
                                            >
                                                {
                                                    <>
                                                        <MenuItem
                                                            key={'V'}
                                                            value={'V'}
                                                        >
                                                            {'V'}
                                                        </MenuItem>

                                                        <MenuItem
                                                            key={'E'}
                                                            value={'E'}
                                                        >
                                                            {'E'}
                                                        </MenuItem>
                                                    </>
                                                }
                                            </TextField>
                                        </Grid>
                                    )}
                                />

                                <Controller
                                    name="weight"
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
                                                label="Documento de identidad"
                                                fullWidth
                                                size="small"
                                                type="number"
                                                autoComplete="off"
                                                {...field}
                                                error={!!errors.weight}
                                                helperText={
                                                    errors.weight?.message
                                                }
                                                disabled={readOnlyState}
                                            />
                                        </Grid>
                                    )}
                                />

                                <Controller
                                    name="weight"
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
                                                label="Email"
                                                fullWidth
                                                size="small"
                                                autoComplete="off"
                                                {...field}
                                                error={!!errors.weight}
                                                helperText={
                                                    errors.weight?.message
                                                }
                                                disabled={readOnlyState}
                                            />
                                        </Grid>
                                    )}
                                />

                                <Controller
                                    name="weight"
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
                                                label="Codigo de teléfono"
                                                fullWidth
                                                select
                                                size="small"
                                                autoComplete="off"
                                                {...field}
                                                error={!!errors.weight}
                                                helperText={
                                                    errors.weight?.message
                                                }
                                                disabled={readOnlyState}
                                            >
                                                {
                                                    <MenuItem
                                                        key={'04XX'}
                                                        value={'04XX'}
                                                    >
                                                        {'04XX'}
                                                    </MenuItem>
                                                }
                                            </TextField>
                                        </Grid>
                                    )}
                                />

                                <Controller
                                    name="weight"
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
                                                label="Número de teléfono"
                                                fullWidth
                                                size="small"
                                                autoComplete="off"
                                                {...field}
                                                error={!!errors.weight}
                                                helperText={
                                                    errors.weight?.message
                                                }
                                                disabled={readOnlyState}
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
                                            sx={{
                                                marginTop: '10px',
                                                marginLeft: '25px',
                                            }}
                                            control={
                                                <Switch
                                                    color="primary"
                                                    onChange={handleSwitch}
                                                    value={active}
                                                    checked={active}
                                                    disabled={readOnlyState}
                                                />
                                            }
                                            label="Status del usuario"
                                            labelPlacement="start"
                                        />
                                    )}
                                />
                            </Grid>
                        </>
                    )}
                </Grid>

                {criterio === 'natural' && (
                    <>
                        <Grid
                            container
                            spacing={gridSpacing}
                            sx={{ marginTop: '5px' }}
                        >
                            <Controller
                                name="weight"
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
                                            label="Primer nombre"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            {...field}
                                            error={!!errors.weight}
                                            helperText={errors.weight?.message}
                                            disabled={readOnlyState}
                                        />
                                    </Grid>
                                )}
                            />
                            <Controller
                                name="weight"
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
                                            label="Primer apellido"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            {...field}
                                            error={!!errors.weight}
                                            helperText={errors.weight?.message}
                                            disabled={readOnlyState}
                                        />
                                    </Grid>
                                )}
                            />

                            <Controller
                                name="weight"
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
                                            label="Tipo de documento"
                                            fullWidth
                                            select
                                            size="small"
                                            autoComplete="off"
                                            {...field}
                                            error={!!errors.weight}
                                            helperText={errors.weight?.message}
                                            disabled={readOnlyState}
                                        >
                                            {
                                                <>
                                                    <MenuItem
                                                        key={'V'}
                                                        value={'V'}
                                                    >
                                                        {'V'}
                                                    </MenuItem>

                                                    <MenuItem
                                                        key={'E'}
                                                        value={'E'}
                                                    >
                                                        {'E'}
                                                    </MenuItem>
                                                </>
                                            }
                                        </TextField>
                                    </Grid>
                                )}
                            />

                            <Controller
                                name="weight"
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
                                            label="Documento de identidad"
                                            fullWidth
                                            size="small"
                                            type="number"
                                            autoComplete="off"
                                            {...field}
                                            error={!!errors.weight}
                                            helperText={errors.weight?.message}
                                            disabled={readOnlyState}
                                        />
                                    </Grid>
                                )}
                            />

                            <Controller
                                name="weight"
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
                                            label="Email"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            {...field}
                                            error={!!errors.weight}
                                            helperText={errors.weight?.message}
                                            disabled={readOnlyState}
                                        />
                                    </Grid>
                                )}
                            />

                            <Controller
                                name="weight"
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
                                            label="Codigo de teléfono"
                                            fullWidth
                                            select
                                            size="small"
                                            autoComplete="off"
                                            {...field}
                                            error={!!errors.weight}
                                            helperText={errors.weight?.message}
                                            disabled={readOnlyState}
                                        >
                                            {
                                                <MenuItem
                                                    key={'04XX'}
                                                    value={'04XX'}
                                                >
                                                    {'04XX'}
                                                </MenuItem>
                                            }
                                        </TextField>
                                    </Grid>
                                )}
                            />

                            <Controller
                                name="weight"
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
                                            label="Número de teléfono"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            {...field}
                                            error={!!errors.weight}
                                            helperText={errors.weight?.message}
                                            disabled={readOnlyState}
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
                                        sx={{
                                            marginTop: '10px',
                                            marginLeft: '25px',
                                        }}
                                        control={
                                            <Switch
                                                color="primary"
                                                onChange={handleSwitch}
                                                value={active}
                                                checked={active}
                                                disabled={readOnlyState}
                                            />
                                        }
                                        label="Status del usuario"
                                        labelPlacement="start"
                                    />
                                )}
                            />
                        </Grid>
                    </>
                )}

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
                                                Crear
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

export default AccountUserProfile
