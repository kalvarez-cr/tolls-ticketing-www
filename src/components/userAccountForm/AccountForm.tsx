import React from 'react'
import * as yup from 'yup'

// import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
// material-ui
import { Grid, Theme, CardActions, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

//REDUX
import { useDispatch } from 'react-redux'
import { account } from 'types'
import { gridSpacing } from 'store/constant'

import { getStatesRequest } from 'store/states/stateAction'
// import CancelEditButton from 'components/buttons/CancelEditButton'
// import AcceptButton from 'components/buttons/AcceptButton'
// import CancelButton from 'components/buttons/CancelButton'
// import CreateButton from 'components/buttons/CreateButton'
import { onKeyDown } from 'components/utils'
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
    nif_holder_type: string
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
    nif1: yup
        .string()
        .max(8, 'Máximo 8 carácteres')
        .when('criterio', {
            is: (criterio) => criterio === 'natural' || criterio === 'juridico',

            then: (value) => value.required('Este campo es requerido'),
        }),
    nif_type: yup.string().when('criterio', {
        is: (criterio) => criterio === 'natural' || criterio === 'juridico',

        then: (value) => value.required('Este campo es requerido'),
    }),
    email: yup
        .string()
        .email('Debe ser un correo válido')
        .when('criterio', {
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
    nif_holder_type: yup.string().when('criterio', {
        is: (criterio) => criterio === 'juridico',

        then: (value) => value.required('Este campo es requerido'),
    }),
    account_holder: yup.string().when('criterio', {
        is: (criterio) => criterio === 'juridico',

        then: (value) => value.required('Este campo es requerido'),
    }),
    email_holder: yup
        .string()
        .email('Debe ser un correo válido')
        .when('criterio', {
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
    userId?: any
    setEditUser?: any
    setNeww?: any
}

const AccountUserProfile = ({
    userData,
    onlyView,
    readOnly,
    setNeww,
    setEditUser,
}: FleetProfileProps) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const {
        // handleSubmit,
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
    // const [loading, setLoading] = React.useState<boolean>(false)
    const [AccountHolderData] = React.useState<account | any>(
        readOnlyState ? userData : []
    )

    const handleAbleToEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
        console.log(handleAbleToEdit)
    }

    // const handleCancelEdit = () => {
    //     setReadOnlyState(!readOnlyState)
    //     if (readOnlyState) {
    //         setEditable(!editable)
    //         setValue('account_holder', AccountHolderData?.account_holder, {})
    //         setValue('email', AccountHolderData?.email, {})
    //         setValue('email_holder', AccountHolderData?.email_holder, {})
    //         setValue('first_name', AccountHolderData?.first_name, {})
    //         setValue('last_name', AccountHolderData?.last_name, {})
    //         setValue('nif_holder', AccountHolderData?.nif_holder, {})
    //         setValue('nif_holder_type', AccountHolderData?.nif_holder_type, {})
    //         setValue('nif_type', AccountHolderData?.nif_type, {})
    //         setValue('nif1', AccountHolderData?.nif, {})
    //         setValue(
    //             'phone_code',
    //             AccountHolderData?.phone_number_holder.substring(0, 4),
    //             {}
    //         )
    //         setValue(
    //             'phone_number1',
    //             AccountHolderData?.phone_number_holder.slice(4),
    //             {}
    //         )
    //         setValue(
    //             'phone_code_holder',
    //             AccountHolderData?.phone_number.substring(0, 4),
    //             {}
    //         )
    //         setValue(
    //             'phone_number',
    //             AccountHolderData?.phone_number.slice(4),
    //             {}
    //         )
    //         setValue('state', AccountHolderData?.state, {})
    //     }
    //     // setActive(AccountHolderData?.setActive)
    // }

    React.useEffect(() => {
        dispatch(getStatesRequest())
        if (readOnlyState) {
            setValue('account_holder', AccountHolderData?.account_holder, {})
            setValue('email', AccountHolderData?.email, {})
            setValue('email_holder', AccountHolderData?.email_holder, {})
            setValue('first_name', AccountHolderData?.first_name, {})
            setValue('last_name', AccountHolderData?.last_name, {})
            setValue('nif_holder', AccountHolderData?.nif_holder, {})
            setValue('nif_holder_type', AccountHolderData?.nif_holder_type, {})
            setValue('nif_type', AccountHolderData?.nif_type, {})
            setValue('nif1', AccountHolderData?.nif, {})

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
    }, [dispatch, setValue, AccountHolderData])

    const handleReturnTable = () => {
        setEditUser(false)
        setNeww(false)
    }

    return (
        <>
            <Grid container spacing={gridSpacing} sx={{ marginTop: '5px' }}>
                <Controller
                    name="first_name"
                    control={control}
                    defaultValue={userData?.account_number}
                    render={({ field }) => (
                        <Grid
                            item
                            xs={12}
                            md={6}
                            className={classes.searchControl}
                        >
                            <TextField
                                label="Número de cuenta"
                                fullWidth
                                size="small"
                                autoComplete="off"
                                {...field}
                                error={!!errors.first_name}
                                helperText={errors.first_name?.message}
                                disabled={true}
                            />
                        </Grid>
                    )}
                />
                <Controller
                    name="last_name"
                    control={control}
                    defaultValue={userData?.account_holder}
                    render={({ field }) => (
                        <Grid
                            item
                            xs={12}
                            md={6}
                            className={classes.searchControl}
                        >
                            <TextField
                                label="Titular de la cuenta"
                                fullWidth
                                size="small"
                                autoComplete="off"
                                {...field}
                                error={!!errors.last_name}
                                helperText={errors.last_name?.message}
                                disabled={true}
                            />
                        </Grid>
                    )}
                />
                <Controller
                    name="nif_type"
                    control={control}
                    defaultValue={userData?.nif_type}
                    render={({ field }) => (
                        <Grid
                            item
                            xs={12}
                            md={2}
                            className={classes.searchControl}
                        >
                            <TextField
                                label="Tipo"
                                fullWidth
                                size="small"
                                autoComplete="off"
                                {...field}
                                error={!!errors.nif_type}
                                helperText={errors.nif_type?.message}
                                disabled={true}
                            />
                        </Grid>
                    )}
                />
                <Controller
                    name="nif1"
                    control={control}
                    defaultValue={userData?.nif}
                    render={({ field }) => (
                        <Grid
                            item
                            xs={12}
                            md={4}
                            className={classes.searchControl}
                        >
                            <TextField
                                label="Documento de identidad"
                                fullWidth
                                size="small"
                                onKeyDown={onKeyDown}
                                autoComplete="off"
                                {...field}
                                error={!!errors.nif1}
                                helperText={errors.nif1?.message}
                                disabled={true}
                            />
                        </Grid>
                    )}
                />
                <Controller
                    name="state"
                    control={control}
                    defaultValue={userData?.account_detail?.nominal_balance}
                    render={({ field }) => (
                        <Grid
                            item
                            xs={12}
                            md={6}
                            className={classes.searchControl}
                        >
                            <TextField
                                label="Saldo"
                                fullWidth
                                size="small"
                                autoComplete="off"
                                {...field}
                                error={!!errors.state}
                                helperText={errors.state?.message}
                                disabled={true}
                            />
                        </Grid>
                    )}
                />

                <Grid item xs={12} md={6} className={classes.searchControl}>
                    <TextField
                        label="Último uso"
                        fullWidth
                        size="small"
                        autoComplete="off"
                        defaultValue={userData?.account_detail?.last_use_date}
                        error={!!errors.state}
                        helperText={errors.state?.message}
                        disabled={true}
                    />
                </Grid>
            </Grid>

            <CardActions>
                <Grid container justifyContent="flex-end" spacing={0}>
                    {/* <Grid container > */}
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
        </>
    )
}

export default AccountUserProfile
