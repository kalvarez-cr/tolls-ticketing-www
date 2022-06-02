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
    // FormControlLabel,
    // Switch,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import AnimateButton from 'ui-component/extended/AnimateButton'
import TextField from '@mui/material/TextField'
import { MenuItem } from '@mui/material'
//REDUX
import { useSelector, useDispatch } from 'react-redux'
import { account, DefaultRootStateProps } from 'types'

import { useNavigate } from 'react-router'
import { documentType, gridSpacing, NUMBER_CODE } from 'store/constant'
import {
    createAccountHolderRequest,
    updateAccountHolderRequest,
} from 'store/accountHolder/AccountHolderActions'
import { getStatesRequest } from 'store/states/stateAction'

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
    first_name: string
    last_name: string
    nif1: string
    email: string
    phone_number: string //natural
    phone_code: string //natural
    account_holder: string
    nif_holder: string
    state: string
    criteria: string
    email_holder: string
    phone_number1: string //juridico
    phone_code_holder: string //juridico
    nif_type: string
}

const Schema = yup.object().shape({
    first_name: yup.string().when('criterio', {
        is: (criterio) => criterio === 'natural' || criterio === 'juridico',

        then: (value) => value.required('Este campo es requerido'),
    }),
    last_name: yup.string().when('criterio', {
        is: (criterio) => criterio === 'natural' || criterio === 'juridico',

        then: (value) => value.required('Este campo es requerido'),
    }),
    nif1: yup.string().when('criterio', {
        is: (criterio) => criterio === 'natural' || criterio === 'juridico',

        then: (value) => value.required('Este campo es requerido'),
    }),
    nif_type: yup.string().when('criterio', {
        is: (criterio) => criterio === 'natural' || criterio === 'juridico',

        then: (value) => value.required('Este campo es requerido'),
    }),
    email: yup.string().when('criterio', {
        is: (criterio) => criterio === 'natural' || criterio === 'juridico',

        then: (value) => value.required('Este campo es requerido'),
    }),
    phone_code: yup.string().when('criterio', {
        is: (criterio) => criterio === 'natural' || criterio === 'juridico',

        then: (value) => value.required('Este campo es requerido'),
    }),
    phone_number: yup
        .string()
        .max(7, 'Máximo 7 carácteres')
        .when('criterio', {
            is: (criterio) => criterio === 'natural' || criterio === 'juridico',

            then: (value) => value.required('Este campo es requerido'),
        }),
    state: yup.string().when('criterio', {
        is: (criterio) => criterio === 'juridico' || criterio === 'natural',

        then: (value) => value.required('Este campo es requerido'),
    }),
    nif_holder: yup.string().when('criterio', {
        is: (criterio) => criterio === 'juridico',

        then: (value) => value.required('Este campo es requerido'),
    }),
    account_holder: yup.string().when('criterio', {
        is: (criterio) => criterio === 'juridico',

        then: (value) => value.required('Este campo es requerido'),
    }),
    email_holder: yup.string().when('criterio', {
        is: (criterio) => criterio === 'juridico',

        then: (value) => value.required('Este campo es requerido'),
    }),
    phone_number1: yup
        .string()
        .max(7, 'Máximo 7 carácteres')
        .when('criterio', {
            is: (criterio) => criterio === 'juridico',

            then: (value) => value.required('Este campo es requerido'),
        }),
    phone_code_holder: yup.string().when('criterio', {
        is: (criterio) => criterio === 'juridico',

        then: (value) => value.required('Este campo es requerido'),
    }),
})

interface FleetProfileProps {
    userData?: any
    fleetId?: string
    readOnly?: boolean
    onlyView?: boolean
}

const criteria: any = [
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
    userData,
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

    const state = useSelector((state: DefaultRootStateProps) => state.states)

    const [readOnlyState, setReadOnlyState] = React.useState<
        boolean | undefined
    >(readOnly)

    const [editable, setEditable] = React.useState<boolean>(false)

    const [AccountHolderData] = React.useState<account | any>(
        readOnlyState ? userData : []
    )

    const [criterio, setCriterio] = React.useState<string>(
        readOnlyState
            ? AccountHolderData?.is_company
                ? 'juridico'
                : 'natural'
            : ''
    )

    const handleCriteria = (event) => {
        const value = event.target.value

        setValue('criteria', value, { shouldValidate: true })
        setCriterio(event.target.value)
    }

    const handleAbleToEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
    }

    const handleCancelEdit = () => {
        setReadOnlyState(!readOnlyState)
        if (readOnlyState) {
            setEditable(!editable)
            setValue('account_holder', AccountHolderData?.account_holder, {})
            setValue('email', AccountHolderData?.email, {})
            setValue('email_holder', AccountHolderData?.email_holder, {})
            setValue('first_name', AccountHolderData?.first_name, {})
            setValue('last_name', AccountHolderData?.last_name, {})
            setValue('nif_holder', AccountHolderData?.nif.slice(1), {})
            setValue(
                'phone_code',
                AccountHolderData?.phone_number_holder.substring(0, 4),
                {}
            )
            setValue(
                'phone_number1',
                AccountHolderData?.phone_number_holder.slice(4),
                {}
            )
            setValue(
                'phone_code_holder',
                AccountHolderData?.phone_number.substring(0, 4),
                {}
            )
            setValue(
                'phone_number',
                AccountHolderData?.phone_number.slice(4),
                {}
            )
            setValue('state', AccountHolderData?.state, {})
        }
        // setActive(AccountHolderData?.setActive)
    }

    React.useEffect(() => {
        dispatch(getStatesRequest())
        if (readOnlyState) {
            setValue('account_holder', AccountHolderData?.account_holder, {})
            setValue('email', AccountHolderData?.email, {})
            setValue('email_holder', AccountHolderData?.email_holder, {})
            setValue('first_name', AccountHolderData?.first_name, {})
            setValue('last_name', AccountHolderData?.last_name, {})
            setValue('nif_holder', AccountHolderData?.nif.slice(1), {})
            setValue(
                'phone_code',
                AccountHolderData?.phone_number_holder.substring(0, 4),
                {}
            )
            setValue(
                'phone_number1',
                AccountHolderData?.phone_number_holder.slice(7),
                {}
            )
            setValue(
                'phone_code_holder',
                AccountHolderData?.phone_number.substring(0, 4),
                {}
            )
            setValue(
                'phone_number',
                AccountHolderData?.phone_number.slice(7),
                {}
            )
            setValue('state', AccountHolderData?.state, {})
        }
    }, [dispatch, setValue, AccountHolderData])
    const onInvalid = (data) => {
        console.log(data)
    }

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const {
            first_name,
            last_name,
            phone_code,
            phone_number,
            phone_code_holder,
            phone_number1,
            account_holder,
            nif_type,
            nif1,
            nif_holder,
            state,
            email,
            email_holder,
        } = data
        if (!editable) {
            dispatch(
                createAccountHolderRequest({
                    account_holder:
                        criterio === 'juridico' ? account_holder : '',
                    nif_holder: criterio === 'juridico' ? nif_holder : '',
                    first_name,
                    last_name,
                    nif: nif1,
                    nif_type,
                    phone_number_holder:
                        criterio === 'juridico'
                            ? `${phone_code}${phone_number1}`
                            : '',
                    phone_number: `${phone_code_holder}${phone_number}`,
                    state,
                    email,
                    email_holder: criterio === 'juridico' ? email_holder : '',
                    is_company: criterio === 'juridico' ? true : false,
                })
            )
            navigate(`gestion-de-cuentas-usuarios/`)
        }

        if (editable) {
            dispatch(
                updateAccountHolderRequest({
                    id: AccountHolderData.id,
                    account_holder:
                        criterio === 'juridico' ? account_holder : '',
                    nif_holder: criterio === 'juridico' ? nif_holder : '',
                    first_name,
                    last_name,
                    nif: nif1,
                    nif_type,
                    phone_number_holder:
                        criterio === 'juridico'
                            ? `${phone_code}${phone_number1}`
                            : '',
                    phone_number: `${phone_code_holder}${phone_number}`,
                    state,
                    email,
                    email_holder,
                    is_company: criterio === 'juridico' ? true : false,
                })
            )
            navigate(`/gestion-de-cuentas-usuarios`)
        }
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
                    {readOnly ? null : (
                        <Grid
                            item
                            xs={12}
                            md={6}
                            className={classes.searchControl}
                        >
                            <TextField
                                select
                                fullWidth
                                label="Tipo de persona"
                                size="small"
                                autoComplete="off"
                                error={!!errors.criteria}
                                helperText={errors.criteria?.message}
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

                    {criterio === 'juridico' ? (
                        <>
                            <Controller
                                name="account_holder"
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
                                            error={!!errors.account_holder}
                                            helperText={
                                                errors.account_holder?.message
                                            }
                                            disabled={readOnlyState}
                                        />
                                    </Grid>
                                )}
                            />
                            <Controller
                                name="nif_holder"
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
                                            error={!!errors.nif_holder}
                                            helperText={
                                                errors.nif_holder?.message
                                            }
                                            disabled={readOnlyState}
                                        />
                                    </Grid>
                                )}
                            />

                            <Controller
                                name="state"
                                control={control}
                                defaultValue={AccountHolderData?.state}
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
                                            error={!!errors.state}
                                            helperText={errors.state?.message}
                                            disabled={readOnlyState}
                                        >
                                            {state &&
                                                state.map((option) => (
                                                    <MenuItem
                                                        key={option.id}
                                                        value={option.id}
                                                    >
                                                        {option.name}
                                                    </MenuItem>
                                                ))}
                                        </TextField>
                                    </Grid>
                                )}
                            />
                            {/* <Controller
                                name="municipio"
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
                                            error={!!errors.municipio}
                                            helperText={errors.municipio?.message}
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
                            /> */}

                            <Controller
                                name="email"
                                control={control}
                                // defaultValue={AccountData?.category}
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
                                            error={!!errors.email}
                                            helperText={errors.email?.message}
                                            disabled={readOnlyState}
                                        />
                                    </Grid>
                                )}
                            />

                            <Controller
                                name="phone_code"
                                control={control}
                                defaultValue={AccountHolderData?.phone_number_holder?.substring(
                                    0,
                                    4
                                )}
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
                                            error={!!errors.phone_code}
                                            helperText={
                                                errors.phone_code?.message
                                            }
                                            disabled={readOnlyState}
                                        >
                                            {NUMBER_CODE &&
                                                NUMBER_CODE.map((option) => (
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
                            <Controller
                                name="phone_number1"
                                control={control}
                                defaultValue={AccountHolderData?.phone_number_holder?.slice(
                                    5
                                )}
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
                                            error={!!errors.phone_number1}
                                            helperText={
                                                errors.phone_number1?.message
                                            }
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
                                    name="first_name"
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
                                                error={!!errors.first_name}
                                                helperText={
                                                    errors.first_name?.message
                                                }
                                                disabled={readOnlyState}
                                            />
                                        </Grid>
                                    )}
                                />
                                <Controller
                                    name="last_name"
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
                                                error={!!errors.last_name}
                                                helperText={
                                                    errors.last_name?.message
                                                }
                                                disabled={readOnlyState}
                                            />
                                        </Grid>
                                    )}
                                />
                                <Controller
                                    name="nif_type"
                                    control={control}
                                    defaultValue={AccountHolderData?.nif?.slice(
                                        0
                                    )}
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
                                                error={!!errors.nif_type}
                                                helperText={
                                                    errors.nif_type?.message
                                                }
                                                disabled={readOnlyState}
                                            >
                                                {documentType &&
                                                    documentType.map(
                                                        (option) => (
                                                            <MenuItem
                                                                key={
                                                                    option.value
                                                                }
                                                                value={
                                                                    option.value
                                                                }
                                                            >
                                                                {option.label}
                                                            </MenuItem>
                                                        )
                                                    )}
                                            </TextField>
                                        </Grid>
                                    )}
                                />
                                <Controller
                                    name="nif1"
                                    control={control}
                                    defaultValue={AccountHolderData?.nif?.slice(
                                        1
                                    )}
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
                                                error={!!errors.nif1}
                                                helperText={
                                                    errors.nif1?.message
                                                }
                                                disabled={readOnlyState}
                                            />
                                        </Grid>
                                    )}
                                />
                                <Controller
                                    name="email_holder"
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
                                                error={!!errors.email_holder}
                                                helperText={
                                                    errors.email_holder?.message
                                                }
                                                disabled={readOnlyState}
                                            />
                                        </Grid>
                                    )}
                                />
                                <Controller
                                    name="phone_code_holder"
                                    control={control}
                                    defaultValue={
                                        AccountHolderData?.phone_number
                                    }
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
                                                error={
                                                    !!errors.phone_code_holder
                                                }
                                                helperText={
                                                    errors.phone_code_holder
                                                        ?.message
                                                }
                                                disabled={readOnlyState}
                                            >
                                                {NUMBER_CODE.map((option) => (
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

                                <Controller
                                    name="phone_number"
                                    control={control}
                                    defaultValue={AccountHolderData?.phone_number?.slice(
                                        5
                                    )}
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
                                                error={!!errors.phone_number}
                                                helperText={
                                                    errors.phone_number?.message
                                                }
                                                disabled={readOnlyState}
                                            />
                                        </Grid>
                                    )}
                                />
                                {/* <Controller
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
                                /> */}
                            </Grid>
                        </>
                    ) : null}
                    {criterio === 'natural' ? (
                        <>
                            <Grid
                                container
                                spacing={gridSpacing}
                                sx={{ marginTop: '5px' }}
                            >
                                <Controller
                                    name="first_name"
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
                                                error={!!errors.first_name}
                                                helperText={
                                                    errors.first_name?.message
                                                }
                                                disabled={readOnlyState}
                                            />
                                        </Grid>
                                    )}
                                />
                                <Controller
                                    name="last_name"
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
                                                error={!!errors.last_name}
                                                helperText={
                                                    errors.last_name?.message
                                                }
                                                disabled={readOnlyState}
                                            />
                                        </Grid>
                                    )}
                                />
                                <Controller
                                    name="nif_type"
                                    control={control}
                                    defaultValue={AccountHolderData?.nif_type}
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
                                                error={!!errors.nif_type}
                                                helperText={
                                                    errors.nif_type?.message
                                                }
                                                disabled={readOnlyState}
                                            >
                                                {documentType &&
                                                    documentType.map(
                                                        (option) => (
                                                            <MenuItem
                                                                key={
                                                                    option.value
                                                                }
                                                                value={
                                                                    option.value
                                                                }
                                                            >
                                                                {option.label}
                                                            </MenuItem>
                                                        )
                                                    )}
                                            </TextField>
                                        </Grid>
                                    )}
                                />
                                <Controller
                                    name="nif1"
                                    control={control}
                                    defaultValue={AccountHolderData?.nif?.slice(
                                        1
                                    )}
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
                                                error={!!errors.nif1}
                                                helperText={
                                                    errors.nif1?.message
                                                }
                                                disabled={readOnlyState}
                                            />
                                        </Grid>
                                    )}
                                />
                                <Controller
                                    name="state"
                                    control={control}
                                    defaultValue={AccountHolderData?.state}
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
                                                error={!!errors.state}
                                                helperText={
                                                    errors.state?.message
                                                }
                                                disabled={readOnlyState}
                                            >
                                                {state &&
                                                    state.map((option) => (
                                                        <MenuItem
                                                            key={option.id}
                                                            value={option.id}
                                                        >
                                                            {option.name}
                                                        </MenuItem>
                                                    ))}
                                            </TextField>
                                        </Grid>
                                    )}
                                />
                                <Controller
                                    name="email"
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
                                                error={!!errors.email}
                                                helperText={
                                                    errors.email?.message
                                                }
                                                disabled={readOnlyState}
                                            />
                                        </Grid>
                                    )}
                                />
                                <Controller
                                    name="phone_code"
                                    control={control}
                                    // defaultValue={
                                    //     AccountHolderData
                                    //         ?.phone_number_holder[0]
                                    // }
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
                                                error={!!errors.phone_code}
                                                helperText={
                                                    errors.phone_code?.message
                                                }
                                                disabled={readOnlyState}
                                            >
                                                {NUMBER_CODE.map((option) => (
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

                                <Controller
                                    name="phone_number"
                                    control={control}
                                    defaultValue={AccountHolderData?.phone_number_holder?.slice(
                                        5
                                    )}
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
                                                error={!!errors.phone_number}
                                                helperText={
                                                    errors.phone_number?.message
                                                }
                                                disabled={readOnlyState}
                                            />
                                        </Grid>
                                    )}
                                />
                                {/* <Controller
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
                                /> */}
                            </Grid>
                        </>
                    ) : null}
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
