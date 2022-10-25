import React from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    useForm,
    Controller,
    SubmitHandler,
    SubmitErrorHandler,
} from 'react-hook-form'

import {
    Grid,
    TextField,
    Theme,
    Typography,
    CardActions,
    MenuItem,
    Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useDispatch, useSelector } from 'react-redux'
import { DefaultRootStateProps, employees } from 'types'
import { useNavigate } from 'react-router'
import { documentType, gridSpacing } from 'store/constant'
import { onKeyDown } from 'components/utils'
import AcceptButton from 'components/buttons/AcceptButton'
import CancelButton from 'components/buttons/CancelButton'
import CancelEditButton from 'components/buttons/CancelEditButton'
import EditButton from 'components/buttons/EditButton'
import AnimateButton from 'ui-component/extended/AnimateButton'
import {
    createCompaniesRequest,
    updateCompaniesRequest,
} from 'store/company/companyActions'

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
    company_code: string
    nif_type: string
    nif_number: string
    abbreviation: string
    address: string
    city: string
    state: string
    legal_representative: string
    id_type: string
    id_repre: string
    company_type: string
    account_number: string
    bank_agency: string
    bank: string
    account_type: string
    toll_sites: any
}

const Schema = yup.object().shape({
    name: yup.string().required('Este campo es requerido'),
    company_code: yup
        .string()
        .min(13, 'Debe tener mínimo 13 caracteres')
        .max(13, 'Debe tener mínimo 13 caracteres')
        .when('readOnly', {
            is: (readOnly) => readOnly,
            then: (value) => value.required('Este campo es requerido'),
        }),
    nif_type: yup.string().required('Este campo es requerido'),
    nif_number: yup.string().required('Este campo es requerido'),
    abbreviation: yup.string().required('Este campo es requerido'),
    address: yup.string().required('Este campo es requerido'),
    city: yup.string().required('Este campo es requerido'),
    state: yup.string().required('Este campo es requerido'),
    legal_representative: yup.string().required('Este campo es requerido'),
    id_type: yup.string().required('Este campo es requerido'),
    id_repre: yup.string().required('Este campo es requerido'),
    company_type: yup.string().required('Este campo es requerido'),
    account_number: yup.string().required('Este campo es requerido'),
    bank_agency: yup
        .string()
        .min(3, 'Debe tener 3 caracteres')
        .max(3, 'Debe tener 3 caracteres')
        .required('Este campo es requerido'),
    bank: yup.string().required('Este campo es requerido'),
    account_type: yup.string().required('Este campo es requerido'),
    // toll_sites: yup.array().required('Este campo es requerido'),
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
    // const [active, setActive] = React.useState<boolean>(true)
    // Loading was set to true by default
    const [loading, setLoading] = React.useState(false)
    // const company = useSelector(
    //     (state: DefaultRootStateProps) => state.login.user?.company_info?.id
    // )
    const companyType = useSelector(
        (state: DefaultRootStateProps) => state.login?.user?.company_types
    )

    const banks = useSelector(
        (state: DefaultRootStateProps) => state.login?.user?.banks
    )

    const states = useSelector(
        (state: DefaultRootStateProps) => state.login?.user?.states
    )

    const companies = useSelector(
        (state: DefaultRootStateProps) => state.company
    )
    const accounts = useSelector(
        (state: DefaultRootStateProps) => state.login?.user?.account_types
    )

    const [companieData] = React.useState<employees | any>(
        readOnlyState
            ? companies?.find((employee) => employee.id === fleetId)
            : []
    )

    // const [optionSelected, setOptionSelected] = React.useState<any>(
    //     employeeData?.toll_sites?.map((toll) => toll?.id) || []
    // )

    // const handleTollFiltering = (event, newValue) => {
    //     const name = newValue.toUpperCase()
    //     setLoading(true)
    //     dispatch(
    //         getFilteredRequest({
    //             criteria: 'site',
    //             param: name,
    //         })
    //     )
    //     setLoading(false)
    // }

    // const handleTollSelection = (event, newValue) => {
    //     // @ts-ignore
    //     const tollsIds: any[] = []
    //     newValue.forEach((element) => tollsIds.push(element.id))
    //     setValue('toll_sites', tollsIds)
    // }

    // const handleTollValue = (employeeData) => {
    //     const ids: any[] = []
    //     employeeData?.toll_sites.forEach(toll => ids.push(toll.name))
    //     return ids
    // }

    const handleAbleToEdit = () => {
        // setValue(
        //     'toll_sites',
        //     employeeData?.toll_sites.map((toll) => toll.id)
        // )
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
    }

    // const handleActive = () => {
    //     setValue('active', !active, {
    //         shouldValidate: true,
    //     })
    //     setActive(!active)
    // }

    const handleCancelEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
        setValue('name', companieData?.name)
        setValue('company_code', companieData?.company_code)
        setValue('nif_type', companieData?.nif.substring(0, 1))
        setValue('nif_number', companieData?.nif.slice(2))
        setValue('abbreviation', companieData?.abbreviation)
        setValue('address', companieData?.address)
        setValue('city', companieData?.city)
        setValue('legal_representative', companieData?.legal_representative)
        setValue('id_type', companieData?.id_number?.substring(0, 1))
        setValue('id_repre', companieData?.id_number?.slice(2))
        setValue('state', companieData?.state)
        setValue('company_type', companieData?.company_type)
        setValue('account_number', companieData?.bank_details?.account_number)
        setValue('bank_agency', companieData?.bank_details?.bank_agency)
        setValue('bank', companieData?.bank_details?.bank)
        setValue('account_type', companieData?.bank_details?.account_type)
    }

    React.useEffect(() => {
        if (readOnlyState) {
            setValue('name', companieData?.name)
            setValue('company_code', companieData?.company_code)
            setValue('nif_type', companieData?.nif.substring(0, 1))
            setValue('nif_number', companieData?.nif.slice(2))
            setValue('abbreviation', companieData?.abbreviation)
            setValue('address', companieData?.address)
            setValue('city', companieData?.city)
            setValue('legal_representative', companieData?.legal_representative)
            setValue('id_type', companieData?.id_number?.substring(0, 1))
            setValue('id_repre', companieData?.id_number?.slice(2))
            setValue('state', companieData?.state)
            setValue('company_type', companieData?.company_type)
            setValue(
                'account_number',
                companieData?.bank_details?.account_number
            )
            setValue('bank_agency', companieData?.bank_details?.bank_agency)
            setValue('bank', companieData?.bank_details?.bank)
            setValue('account_type', companieData?.bank_details?.account_type)
        }
    }, [companieData, setValue])
    // React.useEffect(() => {
    //     const fetchData = async () => {
    //         setLoading(true)
    //         const responseData = await dispatch(
    //             getTollsRequest({
    //                 _all_: true,
    //                 per_page: 50,
    //             })
    //         )

    //         setLoading(false)
    //         return responseData
    //     }

    //     fetchData()
    // }, [dispatch])

    const onInvalid: SubmitErrorHandler<Inputs> = (data, e) => {
        console.log(data)
    }

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const {
            city,
            company_code,
            company_type,
            name,
            nif_type,
            nif_number,
            abbreviation,
            account_number,
            account_type,
            address,
            state,
            legal_representative,
            bank,
            bank_agency,
            id_repre,
            id_type,
        } = data

        const fetchData1 = async () => {
            setLoading(true)
            const responseData1 = await dispatch(
                createCompaniesRequest({
                    name,
                    company_code,
                    nif: `${nif_type}-${nif_number}`,
                    abbreviation,
                    address,
                    city,
                    legal_representative,
                    id_number: `${id_type}-${id_repre}`,
                    state,
                    company_type,
                    bank_details: {
                        account_number,
                        account_type,
                        bank,
                        bank_agency,
                    },
                })
            )
            setLoading(false)
            return responseData1
        }
        const fetchData2 = async () => {
            setLoading(true)
            const responseData2 = await dispatch(
                updateCompaniesRequest({
                    id: companieData.id,
                    name,
                    company_code,
                    nif: `${nif_type}-${nif_number}`,
                    abbreviation,
                    address,
                    city,
                    legal_representative,
                    id_number: `${id_type}-${id_repre}`,
                    state,
                    company_type,
                    bank_details: {
                        account_number,
                        account_type,
                        bank,
                        bank_agency,
                    },
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
        navigate(`/empresas`)
    }

    const handleTable = () => {
        navigate(`/empresas`)
    }

    const handleReturnTable = () => {
        navigate(-1)
    }
    return (
        <>
            <Grid item xs={12}>
                <Typography variant="h4">Datos de la empresa</Typography>
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

            <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
                <Grid container spacing={2} sx={{ marginTop: '5px' }}>
                    {readOnly ? null : (
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={6}
                            className={classes.searchControl}
                        >
                            <Controller
                                name="company_code"
                                control={control}
                                // defaultValue={dataEmployee?.first_name || ''}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Código de la empresa"
                                        size="small"
                                        autoComplete="off"
                                        error={!!errors.company_code}
                                        helperText={
                                            errors.company_code?.message
                                        }
                                        disabled={readOnlyState}
                                    />
                                )}
                            />
                        </Grid>
                    )}
                </Grid>
                <Grid container spacing={2} sx={{ marginTop: '5px' }}>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="name"
                            control={control}
                            // defaultValue={dataEmployee?.second_name || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Nombre de la empresa"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                    disabled={readOnlyState}
                                />
                            )}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="abbreviation"
                            control={control}
                            // defaultValue={dataEmployee?.last_name || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Abreviatura de la empresa"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.abbreviation}
                                    helperText={errors.abbreviation?.message}
                                    disabled={readOnlyState}
                                />
                            )}
                        />
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="company_type"
                            control={control}
                            defaultValue={companieData?.company_type}
                            render={({ field }) => (
                                <TextField
                                    select
                                    {...field}
                                    fullWidth
                                    label="Tipo de empresa"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.company_type}
                                    helperText={errors.company_type?.message}
                                    disabled={readOnlyState}
                                >
                                    {companyType.map((option) => (
                                        <MenuItem
                                            key={option.id}
                                            value={option.id}
                                        >
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                    </Grid>

                    <Controller
                        name="nif_type"
                        control={control}
                        defaultValue={companieData?.nif}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={2}
                                className={classes.searchControl}
                            >
                                <TextField
                                    select
                                    label="Tipo"
                                    fullWidth
                                    size="small"
                                    {...field}
                                    error={!!errors.nif_type}
                                    helperText={errors.nif_type?.message}
                                    disabled={readOnlyState}
                                >
                                    {documentType.map((option) => (
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
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="nif_number"
                            control={control}
                            // defaultValue={dataEmployee?.phone.substr(4) || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Documento legal"
                                    onKeyDown={onKeyDown}
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.nif_number}
                                    helperText={errors.nif_number?.message}
                                    disabled={readOnlyState}
                                />
                            )}
                        />
                    </Grid>
                    <Controller
                        name="state"
                        control={control}
                        defaultValue={companieData?.state}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    select
                                    label="Estado"
                                    fullWidth
                                    size="small"
                                    {...field}
                                    error={!!errors.state}
                                    helperText={errors.state?.message}
                                    disabled={readOnlyState}
                                >
                                    {states.map((option) => (
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
                        // defaultValue={employeeData?.sex}
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
                                    size="small"
                                    {...field}
                                    error={!!errors.city}
                                    helperText={errors.city?.message}
                                    disabled={readOnlyState}
                                ></TextField>
                            </Grid>
                        )}
                    />

                    <Controller
                        name="address"
                        control={control}
                        // defaultValue={employeeData?.sex}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={12}
                                className={classes.searchControl}
                            >
                                <TextField
                                    label="Dirección"
                                    fullWidth
                                    size="small"
                                    {...field}
                                    error={!!errors.address}
                                    helperText={errors.address?.message}
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
                        {' '}
                        Datos del representante legal{' '}
                    </Typography>
                </Grid>
                <Grid container spacing={gridSpacing} sx={{ marginTop: '5px' }}>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="legal_representative"
                            control={control}
                            // defaultValue={dataEmployee?.id_user || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Nombre y apellido"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.legal_representative}
                                    helperText={
                                        errors.legal_representative?.message
                                    }
                                    disabled={readOnlyState}
                                />
                            )}
                        />
                    </Grid>

                    <Controller
                        name="id_type"
                        control={control}
                        defaultValue={companieData?.id_number}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={2}
                                className={classes.searchControl}
                            >
                                <TextField
                                    select
                                    label="Tipo"
                                    fullWidth
                                    size="small"
                                    {...field}
                                    error={!!errors.id_type}
                                    helperText={errors.id_type?.message}
                                    disabled={readOnlyState}
                                >
                                    {documentType.map((option) => (
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
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="id_repre"
                            control={control}
                            // defaultValue={dataEmployee?.phone.substr(4) || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Documento legal"
                                    onKeyDown={onKeyDown}
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.id_repre}
                                    helperText={errors.id_repre?.message}
                                    disabled={readOnlyState}
                                />
                            )}
                        />
                    </Grid>
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
                        {' '}
                        Datos bancarios de la empresa{' '}
                    </Typography>
                </Grid>
                <Grid container spacing={gridSpacing} sx={{ marginTop: '5px' }}>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="bank"
                            control={control}
                            defaultValue={companieData?.bank_details?.bank}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Banco"
                                    size="small"
                                    select
                                    autoComplete="off"
                                    error={!!errors.bank}
                                    helperText={errors.bank?.message}
                                    disabled={readOnlyState}
                                >
                                    {banks.map((option) => (
                                        <MenuItem
                                            key={option.id}
                                            value={option.id}
                                        >
                                            {option.bank_name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="bank_agency"
                            control={control}
                            // defaultValue={employeeData?.role}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Sucursal"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.bank_agency}
                                    helperText={errors.bank_agency?.message}
                                    disabled={readOnlyState}
                                />
                            )}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="account_type"
                            control={control}
                            defaultValue={
                                companieData?.bank_details?.account_type
                            }
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Tipo de cuenta"
                                    size="small"
                                    select
                                    autoComplete="off"
                                    error={!!errors.account_type}
                                    helperText={errors.account_type?.message}
                                    disabled={readOnlyState}
                                >
                                    {accounts.map((option) => (
                                        <MenuItem
                                            key={option.id}
                                            value={option.id}
                                        >
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="account_number"
                            control={control}
                            // defaultValue={employeeData?.role}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Número de cuenta"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.account_number}
                                    helperText={errors.account_number?.message}
                                    disabled={readOnlyState}
                                />
                            )}
                        />
                    </Grid>
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
                    <Typography variant="h4">
                        Decreto de concesión de peajes
                    </Typography>
                </Grid>

                <Grid container spacing={gridSpacing} sx={{ marginTop: '5px' }}>
                    {!loading ? (
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={6}
                            className={classes.searchControl}
                        >
                            <Autocomplete
                                id="toll"
                                multiple
                                options={tolls}
                                defaultValue={employeeData?.toll_sites}
                                autoSelect={true}
                                size="small"
                                // @ts-ignore
                                getOptionLabel={(option) => option.name}
                                loading={loading}
                                onChange={handleTollSelection}
                                onInputChange={handleTollFiltering}
                                loadingText="Cargando..."
                                noOptionsText="No existen peajes."
                                disabled={readOnlyState}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        {...register('toll_sites')}
                                        name="toll"
                                        label="Peaje"
                                        helperText={errors.toll_sites?.message}
                                        error={!!errors.toll_sites}
                                    />
                                )}
                            />
                        </Grid>
                    ) : (
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={6}
                            className={classes.searchControl}
                        >
                            <TextField
                                fullWidth
                                label="Peajes"
                                size="small"
                                autoComplete="off"
                                disabled={true}
                            />
                        </Grid>
                    )}
                </Grid> */}
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
                            <Grid item sx={{ display: 'flex' }}>
                                <CancelButton
                                    loading={loading}
                                    handleTable={handleTable}
                                />
                                <AcceptButton loading={loading} />
                            </Grid>
                        )}

                        <Grid container className="mr-auto ">
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
                        </Grid>
                    </Grid>
                </CardActions>
            </form>
        </>
    )
}

export default FareProfile
