import React from 'react'
import * as yup from 'yup'
// import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
// material-ui
import {
    Grid,
    Theme,
    Typography,
    CardActions,
    TextField,
    Button,
    Menu,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { MenuItem } from '@mui/material'
//REDUX
import { useSelector, useDispatch } from 'react-redux'
import { account, DefaultRootStateProps } from 'types'
import { useNavigate } from 'react-router'
import {
    documentTypeN,
    gridSpacing,
    NUMBER_CODE,
    documentTypeJ,
    documentTypeJLegal,
} from 'store/constant'
import {
    createAccountHolderRequest,
    getAccountHolderRequest,
    updateAccountHolderRequest,
} from 'store/accountHolder/AccountHolderActions'
import { getStatesRequest } from 'store/states/stateAction'
import EditButton from 'components/buttons/EditButton'
// import CancelEditButton from 'components/buttons/CancelEditButton'
// import AcceptButton from 'components/buttons/AcceptButton'
// import CancelButton from 'components/buttons/CancelButton'
// import CreateButton from 'components/buttons/CreateButton'
import { onKeyDown } from 'components/utils'
import AnimateButton from 'ui-component/extended/AnimateButton'
import Authorization from 'components/removeForms/Authorization'
import { getMunicipalityRequest } from 'store/municipality/municipalityAction'

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
    phone_number1: string //jurídico
    phone_code_holder: string //jurídico
    nif_type: string
    nif_holder_type: string
    city: string
    proofOfPaymentType: string
    uploadFile: any
}

const Schema = yup.object().shape({
    first_name: yup.string().when('criteria', {
        is: (criteria) => criteria === 'natural' || criteria === 'jurídico',

        then: yup.string().required('Este campo es requerido'),
    }),
    last_name: yup.string().when('criteria', {
        is: (criteria) => criteria === 'natural' || criteria === 'jurídico',

        then: yup.string().required('Este campo es requerido'),
    }),
    nif1: yup
        .string()
        .matches(/[1-9]\d*$/, 'Debe ser un número válido ')
        .min(7, 'Mínimo 7 carácteres')

        .max(8, 'Máximo 8 carácteres')
        .when('criteria', {
            is: (criteria) => criteria === 'natural' || criteria === 'jurídico',

            then: yup
                .string()
                .min(7, 'Mínimo 7 carácteres')

                .max(8, 'Máximo 8 carácteres')
                .required('Este campo es requerido'),
        }),
    nif_type: yup.string().when('criteria', {
        is: (criteria) => criteria === 'natural' || criteria === 'jurídico',

        then: yup.string().required('Este campo es requerido'),
    }),
    email: yup
        .string()
        .email('Debe ser un correo válido')
        .when('criteria', {
            is: (criteria) => criteria === 'natural' || criteria === 'jurídico',

            then: yup
                .string()
                .email('Debe ser un correo válido')
                .required('Este campo es requerido'),
        })
        .when('readOnly', {
            is: (readOnly) => readOnly,
            then: (value) => value.required('Este campo es requerido'),
        }),
    phone_code: yup.string().when('criteria', {
        is: (criteria) => criteria === 'natural' || criteria === 'jurídico',

        then: yup.string().required('Este campo es requerido'),
    }),
    phone_number: yup
        .string()
        .matches(/[1-9]\d*$/, 'Debe ser un número válido ')
        .min(7, 'Mínimo 7 carácteres')
        .max(7, 'Máximo 7 carácteres')
        .when('criteria', {
            is: (criteria) => criteria === 'natural' || criteria === 'jurídico',

            then: yup
                .string()
                .min(7, 'Mínimo 7 carácteres')
                .max(7, 'Máximo 7 carácteres')
                .required('Este campo es requerido'),
        }),
    state: yup.string().when('criteria', {
        is: (criteria) => criteria === 'jurídico' || criteria === 'natural',

        then: yup.string().required('Este campo es requerido'),
    }),

    city: yup.string().when('criteria', {
        is: (criteria) => criteria === 'jurídico' || criteria === 'natural',

        then: yup.string().required('Este campo es requerido'),
    }),

    nif_holder: yup
        .string()
        .matches(/[1-9]\d*$/, 'Debe ser un número válido ')
        .min(9, 'Mínimo 9 carácteres')
        .max(9, 'Máximo 9 carácteres')
        .when('criteria', {
            is: (criteria) => criteria === 'jurídico',

            then: yup
                .string()
                .min(9, 'Mínimo 9 carácteres')
                .max(9, 'Máximo 9 carácteres')
                .required('Este campo es requerido'),
        }),
    nif_holder_type: yup.string().when('criteria', {
        is: (criteria) => criteria === 'jurídico',

        then: yup.string().required('Este campo es requerido'),
    }),
    account_holder: yup.string().when('criteria', {
        is: (criteria) => criteria === 'jurídico',

        then: yup.string().required('Este campo es requerido'),
    }),
    email_holder: yup
        .string()
        .email('Debe ser un correo válido')
        .when('criteria', {
            is: (criteria) => criteria === 'jurídico',

            then: yup
                .string()
                .email('Debe ser un correo válido')
                .required('Este campo es requerido'),
        }),
    phone_number1: yup
        .string()
        .matches(/[1-9]\d*$/, 'Debe ser un número válido ')
        .min(7, 'Mínimo 7 carácteres')
        .max(7, 'Máximo 7 carácteres')
        .when('criteria', {
            is: (criteria) => criteria === 'jurídico',

            then: yup
                .string()
                .min(7, 'Mínimo 7 carácteres')
                .max(7, 'Máximo 7 carácteres')
                .required('Este campo es requerido'),
        }),
    phone_code_holder: yup.string().when('criteria', {
        is: (criteria) => criteria === 'jurídico',

        then: yup.string().required('Este campo es requerido'),
    }),
    proofOfPaymentType: yup.boolean(),
    // uploadFile: yup.mixed().when('proofOfPaymentType', {
    //     is: (val) => {
    //         return val
    //     },
    //     then: yup
    //         .mixed()
    //         .test('name', 'Debes subir un icono', (value) => {
    //             return value[0] && value[0].name !== ''
    //         })
    //         .test('fileSize', 'Supera el tamaño máximo', (value) => {
    //             return value[0] && value[0].size <= 1000000
    //         })
    //         .test('type', 'Solo soporta .png ', (value) => {
    //             if (value[0]?.type.includes('image/png')) {
    //                 return true
    //             }

    //             return false
    //         }),
    // }),
})

interface FleetProfileProps {
    userData?: any
    fleetId?: string
    readOnly?: boolean
    onlyView?: boolean
    userId?: any
    setEditUser?: any
    handleEditUser?: () => void
    handleCreateNew?: (boo: boolean) => void
    handleEditVolver?: any
    dataUser?: any
    setNeww?: any
}

const criteriaOptions: any = [
    {
        value: 'jurídico',

        label: 'Jurídico',
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
    userId,
    setEditUser,
}: FleetProfileProps) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        getValues,
        watch,
        register,
    } = useForm<Inputs>({
        resolver: yupResolver(Schema),
        mode: 'onChange',
    })

    const state = useSelector((state: DefaultRootStateProps) => state.states)
    const cities = useSelector(
        (state: DefaultRootStateProps) => state.municipality
    )

    const [readOnlyState, setReadOnlyState] = React.useState<
        boolean | undefined
    >(readOnly)

    const [editable, setEditable] = React.useState<boolean>(false)
    const [loading, setLoading] = React.useState<boolean>(false)
    const [AccountHolderData] = React.useState<account | any>(
        readOnlyState ? userData : []
    )
    const [modal, setModal] = React.useState<string>()
    const [open, setOpen] = React.useState<boolean>(true)
    const [email, setEmail] = React.useState<string>('')
    const [idModal, setIdModal] = React.useState<string>('')
    const [selectedFile, setSelectedFile] = React.useState(null)

    const [documentTypes, setDocumentTypes] = React.useState<
        {
            label: string
            value: string
            disabled?: boolean
        }[]
    >([
        {
            label: 'Documento de Identidad',
            value: 'RIF',
        },
        {
            label: 'Titulo de Propiedad',
            value: 'title',
        },
        {
            label: 'Permiso',
            value: 'permissions',
        },
        {
            label: 'Licencia',
            value: 'license',
        },
    ])

    const [documents, setDocuments] = React.useState<any[]>([])
    const handleSelectItem = (type) => {
        const newDocumentTypes = documentTypes.filter(
            (documentType) => documentType.value !== type.value
        )
        setDocumentTypes([...newDocumentTypes, { ...type, disabled: true }])
        setDocuments([...documents, type])
    }

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const openMenu = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const [criteria, setCriteria] = React.useState<string>(
        readOnlyState
            ? AccountHolderData?.is_company
                ? 'jurídico'
                : 'natural'
            : ''
    )

    const handleCriteria = (event) => {
        const value = event.target.value

        setValue('criteria', value, { shouldValidate: true })
        setCriteria(event.target.value)
    }

    const handleAbleToEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
    }

    const handleCancelEdit = () => {
        setReadOnlyState(!readOnlyState)
        if (readOnlyState) {
            setEditable(!editable)
            setValue('account_holder', AccountHolderData?.account_holder)
            setValue('email', AccountHolderData?.email)
            setValue('email_holder', AccountHolderData?.email_holder)
            setValue('first_name', AccountHolderData?.first_name)
            setValue('last_name', AccountHolderData?.last_name)
            setValue('nif_holder', AccountHolderData?.nif_holder)
            setValue('nif_holder_type', AccountHolderData?.nif_holder_type)
            setValue('nif_type', AccountHolderData?.nif_type)
            setValue('nif1', AccountHolderData?.nif)
            setValue(
                'phone_code',
                AccountHolderData?.phone_number_holder.substring(0, 4)
            )
            setValue(
                'phone_number1',
                AccountHolderData?.phone_number_holder.slice(4)
            )
            setValue(
                'phone_code_holder',
                AccountHolderData?.phone_number.substring(0, 4)
            )
            setValue('phone_number', AccountHolderData?.phone_number.slice(4))
            setValue('state', AccountHolderData?.state?.id)
        }
        // setActive(AccountHolderData?.setActive)
    }

    React.useEffect(() => {
        dispatch(getMunicipalityRequest({ state: getValues('state') }))
    }, [watch('state')])

    React.useEffect(() => {
        dispatch(getStatesRequest())
        if (readOnlyState) {
            setValue('account_holder', AccountHolderData?.account_holder)
            setValue('email', AccountHolderData?.email)
            setValue('email_holder', AccountHolderData?.email_holder)
            setValue('first_name', AccountHolderData?.first_name)
            setValue('last_name', AccountHolderData?.last_name)
            setValue('nif_holder', AccountHolderData?.nif_holder)
            setValue('nif_holder_type', AccountHolderData?.nif_holder_type)
            setValue('nif_type', AccountHolderData?.nif_type)
            setValue('nif1', AccountHolderData?.nif)

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
            setValue('state', AccountHolderData?.state?.id)
        }
    }, [dispatch, setValue, AccountHolderData])
    const onInvalid = (data) => {
        console.log(data)
    }

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
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
            nif_holder_type,
            state,
            email,
            email_holder,
        } = data
        const fetchData1 = async () => {
            setLoading(true)
            const responseData1 = await dispatch(
                createAccountHolderRequest({
                    account_holder: account_holder,
                    nif_holder: nif_holder,
                    nif_holder_type: nif_holder_type,
                    first_name,
                    last_name,
                    nif: nif1,
                    nif_type: nif_type,
                    phone_number_holder:
                        criteria === 'jurídico'
                            ? `${phone_code_holder}${phone_number1}`
                            : `${phone_code}${phone_number}`,
                    phone_number: `${phone_code}${phone_number}`,
                    state,
                    email,
                    email_holder: email_holder,
                    is_company: criteria === 'jurídico' ? true : false,
                    is_deleted: false,
                })
            )
            console.log(responseData1)
            dispatch(
                getAccountHolderRequest({
                    // @ts-ignore
                    id: responseData1?.holder?.id,
                })
            )
            //@ts-ignore
            setIdModal(responseData1?.holder?.id)
            //@ts-ignore
            setEmail(responseData1?.holder?.email)
            setLoading(false)
            // @ts-ignore
            return responseData1?.holder?.id
        }
        const fetchData2 = async () => {
            setLoading(true)
            const responseData2 = await dispatch(
                updateAccountHolderRequest({
                    id: AccountHolderData.id,
                    account_holder: account_holder,
                    nif_holder: nif_holder,
                    nif_holder_type: nif_holder_type,
                    first_name,
                    last_name,
                    nif: nif1,
                    nif_type: nif_type,
                    phone_number_holder:
                        criteria === 'jurídico'
                            ? `${phone_code_holder}${phone_number1}`
                            : `${phone_code}${phone_number}`,
                    phone_number: `${phone_code}${phone_number}`,
                    state,
                    email,
                    email_holder,
                    is_company: criteria === 'jurídico' ? true : false,
                    is_deleted: false,
                })
            )
            setLoading(false)
            return responseData2
        }
        if (!editable) {
            const response = await fetchData1()

            if (response) {
                setOpen(true)
                setModal('autorization')
            }
        }
        if (editable) {
            fetchData2()
            // navigate(-1)
        }
    }

    const handleReturnTable = () => {
        navigate('/gestion-de-cuentas-usuarios')
    }

    const handleModal = () => {
        setOpen(true)
        setModal('autorization')
        setEmail(AccountHolderData?.email)
        setIdModal(AccountHolderData?.id)
    }

    const uploadPhoto = async (e) => {
        const file = e.target?.files[0]
        setSelectedFile(file)
        setValue('uploadFile', e.target.files, { shouldValidate: true })
    }

    return (
        <>
            <>
                {modal === 'autorization' ? (
                    <Authorization
                        open={open}
                        setOpen={setOpen}
                        email={email}
                        id={idModal}
                    />
                ) : null}
            </>

            <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
                <Grid container spacing={gridSpacing}>
                    {readOnly ? null : (
                        <Controller
                            name="criteria"
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
                                        {criteriaOptions &&
                                            criteriaOptions.map((option) => (
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
                    )}
                </Grid>

                <Grid
                    item
                    xs={12}
                    // sx={{
                    //     display: 'flex',
                    //     justifyContent: 'space-around',
                    //     alignItems: 'center',
                    // }}
                    className="flex justify-start"
                >
                    {criteria === '' ? null : (
                        <Typography variant="h4" sx={{ marginTop: '25px' }}>
                            Datos del titular de la cuenta {criteria}
                        </Typography>
                    )}

                    {AccountHolderData?.is_confirmed || !readOnly ? null : (
                        <Grid item>
                            <AnimateButton>
                                <Button
                                    // variant="outlined"
                                    size="large"
                                    onClick={handleModal}
                                    sx={{
                                        marginTop: '15px',
                                        marginRight: '15px',
                                    }}
                                >
                                    Verificar cuenta
                                </Button>
                            </AnimateButton>
                        </Grid>
                    )}
                </Grid>
                <Grid item className="flex space-x-2 justify-end">
                    <Grid item>
                        <AnimateButton>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={handleReturnTable}
                            >
                                Volver
                            </Button>
                        </AnimateButton>
                    </Grid>

                    {!onlyView && readOnly ? (
                        <Grid item>
                            <EditButton
                                loading={loading}
                                handleAbleToEdit={handleAbleToEdit}
                            />
                        </Grid>
                    ) : null}
                </Grid>

                {criteria === 'jurídico' ? (
                    <>
                        <Grid
                            container
                            spacing={gridSpacing}
                            sx={{ marginTop: '5px' }}
                        >
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
                        </Grid>
                        <Grid container spacing={2} sx={{ marginTop: '5px' }}>
                            <Controller
                                name="nif_holder_type"
                                control={control}
                                defaultValue={
                                    AccountHolderData?.nif_holder_type
                                }
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
                                            select
                                            size="small"
                                            autoComplete="off"
                                            {...field}
                                            error={!!errors.nif_holder_type}
                                            helperText={
                                                errors.nif_holder_type?.message
                                            }
                                            disabled={readOnlyState}
                                        >
                                            {documentTypeJ &&
                                                documentTypeJ.map((option) => (
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
                                name="nif_holder"
                                control={control}
                                // defaultValue={AccountHolderData?.nif_holder}
                                render={({ field }) => (
                                    <Grid
                                        item
                                        xs={12}
                                        md={4}
                                        className={classes.searchControl}
                                    >
                                        <TextField
                                            label="Rif"
                                            fullWidth
                                            onKeyDown={onKeyDown}
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

                            <Controller
                                name="city"
                                control={control}
                                // defaultValue={companieData?.city?.id}
                                render={({ field }) => (
                                    <Grid
                                        item
                                        xs={12}
                                        md={6}
                                        className={classes.searchControl}
                                    >
                                        <TextField
                                            select
                                            label="Municipio"
                                            fullWidth
                                            size="small"
                                            {...field}
                                            error={!!errors.city}
                                            helperText={errors.city?.message}
                                            disabled={
                                                readOnlyState || !watch('state')
                                            }
                                        >
                                            {cities.map((option) => (
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

                            {readOnly ? null : (
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
                                                label="Email (ejemplo@ejemplo.com)"
                                                fullWidth
                                                size="small"
                                                type="email"
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
                            )}

                            <Controller
                                name="phone_code"
                                control={control}
                                defaultValue={
                                    AccountHolderData?.phone_number_holder
                                }
                                render={({ field }) => (
                                    <Grid
                                        item
                                        xs={12}
                                        md={2}
                                        className={classes.searchControl}
                                    >
                                        <TextField
                                            label="Código"
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
                                // defaultValue={AccountHolderData?.phone_number_holder}
                                render={({ field }) => (
                                    <Grid
                                        item
                                        xs={12}
                                        md={4}
                                        className={classes.searchControl}
                                    >
                                        <TextField
                                            label="Teléfono"
                                            fullWidth
                                            size="small"
                                            onKeyDown={onKeyDown}
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
                                item
                                xs={12}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginTop: '25px',
                                }}
                            >
                                <Typography variant="h4">
                                    Datos del representante legal
                                </Typography>
                            </Grid>

                            {/* <Grid
                                container
                                spacing={gridSpacing}
                                sx={{ marginTop: '5px' }}
                            > */}
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
                                        md={2}
                                        className={classes.searchControl}
                                    >
                                        <TextField
                                            label="Tipo"
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
                                            {documentTypeJLegal &&
                                                documentTypeJLegal.map(
                                                    (option) => (
                                                        <MenuItem
                                                            key={option.value}
                                                            value={option.value}
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
                                // defaultValue={AccountHolderData?.nif}
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
                                            label="Email (ejemplo@ejemplo.com)"
                                            fullWidth
                                            size="small"
                                            type="email"
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
                                    AccountHolderData?.phone_number_holder
                                }
                                render={({ field }) => (
                                    <Grid
                                        item
                                        xs={12}
                                        md={2}
                                        className={classes.searchControl}
                                    >
                                        <TextField
                                            label="Código"
                                            fullWidth
                                            select
                                            size="small"
                                            autoComplete="off"
                                            {...field}
                                            error={!!errors.phone_code_holder}
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
                                // defaultValue={AccountHolderData?.phone_number}
                                render={({ field }) => (
                                    <Grid
                                        item
                                        xs={12}
                                        md={4}
                                        className={classes.searchControl}
                                    >
                                        <TextField
                                            label="Número de teléfono"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            {...field}
                                            onKeyDown={onKeyDown}
                                            error={!!errors.phone_number}
                                            helperText={
                                                errors.phone_number?.message
                                            }
                                            disabled={readOnlyState}
                                        />
                                    </Grid>
                                )}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: '25px',
                            }}
                        >
                            <Typography variant="h4">Documentos</Typography>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            md={6}
                            className={classes.searchControl}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: '25px',
                                marginBottom: '25px',
                            }}
                        >
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                color={'primary'}
                                variant={'contained'}
                                onClick={handleClick}
                                size={'large'}
                            >
                                Añadir Documento
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={openMenu}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                {documentTypes &&
                                    documentTypes.map((type) => (
                                        <MenuItem
                                            disabled={type?.disabled}
                                            onClick={() =>
                                                handleSelectItem(type)
                                            }
                                        >
                                            {type.label}
                                        </MenuItem>
                                    ))}
                            </Menu>
                        </Grid>

                        {documents.map((document) => (
                            <div className="w-full md:w-1/2 px-4 my-3">
                                <label className="font-bold">
                                    {/* Icono{' '} */}
                                    {errors.uploadFile?.message ? (
                                        <span className="text-red-600">
                                            ({errors.uploadFile?.message})
                                        </span>
                                    ) : null}
                                </label>
                                <label
                                    className={`flex mt-1 justify-center h-10 items-center text-white hover:text-black rounded-lg hover:border-logo border-2 cursor-pointer ${
                                        selectedFile && !errors.uploadFile
                                            ? 'bg-materialdarkgreen'
                                            : 'bg-materialgreen'
                                    }`}
                                >
                                    <>
                                        <svg
                                            className="w-8 h-8 mx-2 "
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                        </svg>
                                        <span className=" text-base leading-normal mx-2 font-bold">
                                            Subir Archivo
                                        </span>
                                    </>

                                    <input
                                        type="file"
                                        className="hidden"
                                        {...register('uploadFile')}
                                        name="uploadFile"
                                        onChange={uploadPhoto}
                                    />
                                </label>
                                {selectedFile && !errors.uploadFile ? (
                                    <div className="flex justify-between">
                                        <p className="text-green-900 font-bold">
                                            Cargado correctamente
                                        </p>
                                        <p className="text-green-900 font-bold">
                                            {
                                                // @ts-ignore
                                                selectedFile?.name
                                            }
                                        </p>
                                    </div>
                                ) : null}
                            </div>
                        ))}

                        <Grid
                            item
                            xs={12}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: '25px',
                            }}
                        >
                            <Typography variant="h4">
                                Preferencia de notificaciones
                            </Typography>
                        </Grid>

                        <Grid
                            container
                            spacing={gridSpacing}
                            sx={{ marginTop: '5px' }}
                        >
                            <Controller
                                name="phone_code_holder"
                                control={control}
                                // defaultValue={
                                //     AccountHolderData?.phone_number_holder
                                // }
                                render={({ field }) => (
                                    <Grid
                                        item
                                        xs={12}
                                        md={6}
                                        className={classes.searchControl}
                                    >
                                        <TextField
                                            label="Notificaciones"
                                            fullWidth
                                            select
                                            size="small"
                                            autoComplete="off"
                                            {...field}
                                            error={!!errors.phone_code_holder}
                                            helperText={
                                                errors.phone_code_holder
                                                    ?.message
                                            }
                                            disabled={true}
                                        >
                                            {/* {NUMBER_CODE.map((option) => (
                                                <MenuItem
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </MenuItem>
                                            ))} */}
                                        </TextField>
                                    </Grid>
                                )}
                            />
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: '25px',
                            }}
                        >
                            <Typography variant="h4">
                                Reseteo de contraseñas
                            </Typography>
                        </Grid>

                        <Grid
                            container
                            spacing={gridSpacing}
                            sx={{ marginTop: '5px' }}
                        >
                            <Controller
                                name="phone_code_holder"
                                control={control}
                                // defaultValue={
                                //     AccountHolderData?.phone_number_holder
                                // }
                                render={({ field }) => (
                                    <Grid
                                        item
                                        xs={12}
                                        md={6}
                                        className={classes.searchControl}
                                    >
                                        <TextField
                                            label="Contraseña"
                                            fullWidth
                                            select
                                            size="small"
                                            autoComplete="off"
                                            {...field}
                                            error={!!errors.phone_code_holder}
                                            helperText={
                                                errors.phone_code_holder
                                                    ?.message
                                            }
                                            disabled={true}
                                        >
                                            {/* {NUMBER_CODE.map((option) => (
                                                <MenuItem
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </MenuItem>
                                            ))} */}
                                        </TextField>
                                    </Grid>
                                )}
                            />

                            <Controller
                                name="phone_code_holder"
                                control={control}
                                // defaultValue={
                                //     AccountHolderData?.phone_number_holder
                                // }
                                render={({ field }) => (
                                    <Grid
                                        item
                                        xs={12}
                                        md={6}
                                        className={classes.searchControl}
                                    >
                                        <TextField
                                            label=" Confirmar Contraseña"
                                            fullWidth
                                            select
                                            size="small"
                                            autoComplete="off"
                                            {...field}
                                            error={!!errors.phone_code_holder}
                                            helperText={
                                                errors.phone_code_holder
                                                    ?.message
                                            }
                                            disabled={true}
                                        >
                                            {/* {NUMBER_CODE.map((option) => (
                                                <MenuItem
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </MenuItem>
                                            ))} */}
                                        </TextField>
                                    </Grid>
                                )}
                            />
                        </Grid>
                    </>
                ) : null}
                {criteria === 'natural' ? (
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
                                        md={2}
                                        className={classes.searchControl}
                                    >
                                        <TextField
                                            label="Tipo"
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
                                            {documentTypeN &&
                                                documentTypeN.map((option) => (
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
                                name="nif1"
                                control={control}
                                // defaultValue={AccountHolderData?.nif}
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

                            <Controller
                                name="city"
                                control={control}
                                // defaultValue={companieData?.city?.id}
                                render={({ field }) => (
                                    <Grid
                                        item
                                        xs={12}
                                        md={6}
                                        className={classes.searchControl}
                                    >
                                        <TextField
                                            select
                                            label="Municipio"
                                            fullWidth
                                            size="small"
                                            {...field}
                                            error={!!errors.city}
                                            helperText={errors.city?.message}
                                            disabled={
                                                readOnlyState || !watch('state')
                                            }
                                        >
                                            {cities.map((option) => (
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

                            {readOnly ? null : (
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
                                                label="Email  (ejemplo@ejemplo.com)"
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
                            )}
                            <Controller
                                name="phone_code"
                                control={control}
                                defaultValue={AccountHolderData?.phone_number}
                                render={({ field }) => (
                                    <Grid
                                        item
                                        xs={12}
                                        md={2}
                                        className={classes.searchControl}
                                    >
                                        <TextField
                                            label="Código"
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
                                // defaultValue={AccountHolderData?.phone_number_holder}
                                render={({ field }) => (
                                    <Grid
                                        item
                                        xs={12}
                                        md={4}
                                        className={classes.searchControl}
                                    >
                                        <TextField
                                            onKeyDown={onKeyDown}
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
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: '25px',
                            }}
                        >
                            <Typography variant="h4">
                                Preferencia de notificaciones
                            </Typography>
                        </Grid>

                        <Grid
                            container
                            spacing={gridSpacing}
                            sx={{ marginTop: '5px' }}
                        >
                            <Controller
                                name="phone_code_holder"
                                control={control}
                                defaultValue={
                                    AccountHolderData?.phone_number_holder
                                }
                                render={({ field }) => (
                                    <Grid
                                        item
                                        xs={12}
                                        md={6}
                                        className={classes.searchControl}
                                    >
                                        <TextField
                                            label="Notificaciones"
                                            fullWidth
                                            select
                                            size="small"
                                            autoComplete="off"
                                            {...field}
                                            error={!!errors.phone_code_holder}
                                            helperText={
                                                errors.phone_code_holder
                                                    ?.message
                                            }
                                            disabled={true}
                                        >
                                            {/* {NUMBER_CODE.map((option) => (
                                                <MenuItem
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </MenuItem>
                                            ))} */}
                                        </TextField>
                                    </Grid>
                                )}
                            />
                        </Grid>

                        {/* <Grid
                            item
                            xs={12}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: '25px',
                            }}
                        >
                            <Typography variant="h4">Seguridad</Typography>
                        </Grid> */}
                    </>
                ) : null}
                {/* </Grid> */}

                <CardActions>
                    <Grid container justifyContent="flex-end" spacing={0}>
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
                                <Grid
                                    container
                                    justifyContent="flex-end"
                                    sx={{ marginBottom: '-45px' }}
                                >
                                    <Grid item>
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
                                </Grid>
                            </>
                        )}
                        {/* <Grid container > */}
                        <Grid container className="mr-auto">
                            {/* <Grid item>
                                <AnimateButton>
                                    <Button
                                        variant="contained"
                                        size="medium"
                                        onClick={handleReturnTable}
                                    >
                                        Volver
                                    </Button>
                                </AnimateButton>
                            </Grid> */}

                            {/* <Grid item>
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
                                    <Grid item sx={{ display: 'flex' }}>
                                        <CancelButton
                                            loading={loading}
                                            handleTable={handleReturnTable}
                                        />
                                        <CreateButton loading={loading} />
                                    </Grid>
                                )}
                            </Grid> */}
                        </Grid>
                    </Grid>
                </CardActions>
            </form>
        </>
    )
}

export default AccountUserProfile
