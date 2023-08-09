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
    FormControlLabel,
    Switch,
    Button,
    Autocomplete,
    IconButton,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useDispatch, useSelector } from 'react-redux'
import { DefaultRootStateProps, employees } from 'types'
import { useNavigate } from 'react-router'
import {
    createAllEmployeesRequest,
    updateAllEmployeesRequest,
} from 'store/employee/employeeActions'
import { gridSpacing, NUMBER_CODE } from 'store/constant'
import { onKeyDown } from 'components/utils'
import { getTollsRequest } from 'store/tolls/tollsActions'
import AcceptButton from 'components/buttons/AcceptButton'
import CancelButton from 'components/buttons/CancelButton'
import CancelEditButton from 'components/buttons/CancelEditButton'
import EditButton from 'components/buttons/EditButton'
import AnimateButton from 'ui-component/extended/AnimateButton'
import { getFilteredRequest } from 'store/filtered/filteredActions'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

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
    middle_name: string
    last_name: string
    second_last_name: string
    identification: string
    phone_number: string
    sex: string
    // department: string
    personal_id: string
    role: string
    document_type: string
    cellphone_code: string
    username: string
    password: string
    email: string
    active: boolean
    toll_sites: any
    password_confirm: string
}

const Schema = yup.object().shape({
    first_name: yup
        .string()
        .max(10, 'Máximo 10 carácteres')
        .required('Este campo es requerido'),

    middle_name: yup
        .string()
        .max(10, 'Máximo 10 carácteres')
        .notRequired()
        .nullable(),
    // .typeError('Es obligatorio'),
    // .required('Este campo es obligatorio'),

    last_name: yup
        .string()
        .max(10, 'Máximo 10 carácteres')
        .required('Este campo es requerido'),
    second_last_name: yup
        .string()
        .max(10, 'Máximo 10 carácteres')
        .notRequired()
        .nullable(),
    // .typeError('Es obligatorio'),
    // .required('Este campo es obligatorio'),
    phone_number: yup
        .string()
        .matches(/[1-9]\d*$/, 'Debe ser un número válido ')
        .min(7, 'Mínimo 7 carácteres')
        .max(7, 'Máximo 7 carácteres')
        .required('Este campo es requerido'),
    sex: yup.string().required('Este campo es requerido'),
    // department: yup.string().required('Este campo es requerido'),
    personal_id: yup.string().required('Este campo es requerido'),
    role: yup.string().required('Este campo es requerido'),
    // document_type: yup.string().required('Este campo es requerido'),
    cellphone_code: yup.string().required('Este campo es requerido'),
    username: yup.string().when('readOnly', {
        is: (readOnly) => readOnly,
        then: (value) => value.required('Este campo es requerido'),
    }),
    password: yup.string().when('readOnly', {
        is: (readOnly) => readOnly,
        then: (value) => value.required('Este campo es requerido'),
    }),
    password_confirm: yup
        .string()
        .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
        .when('readOnly', {
            is: (readOnly) => readOnly,
            then: (value) => value.required('Este campo es requerido'),
        }),
    email: yup
        .string()
        .email('Debe ser un email válido')
        .required('Este campo es requerido'),
    active: yup.boolean(),
    toll_sites: yup
        .array()
        .min(1, 'Debes seleccionar al menos uno')
        .required('Este campo es requerido'),
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
        register,
        // getValues,
        watch,
    } = useForm<Inputs>({
        resolver: yupResolver(Schema),
        mode: 'onChange',
    })
    const [readOnlyState, setReadOnlyState] = React.useState<
        boolean | undefined
    >(readOnly)

    const [editable, setEditable] = React.useState<boolean>(false)
    const [active, setActive] = React.useState<boolean>(true)
    // Loading was set to true by default
    const [loading, setLoading] = React.useState(true)
    const role = useSelector(
        (state: DefaultRootStateProps) => state.login?.user?.role
    )
    const company = useSelector(
        (state: DefaultRootStateProps) => state.login.user?.company_info?.id
    )
    const gender = useSelector(
        (state: DefaultRootStateProps) => state.login?.user?.genders
    )

    const roles = useSelector(
        (state: DefaultRootStateProps) => state.login?.user?.roles
    )
    const employees = useSelector(
        (state: DefaultRootStateProps) => state.employee
    )
    const tolls = useSelector((state: DefaultRootStateProps) => state.tolls)

    const [showPassword, setShowPassword] = React.useState<boolean>(false)

    const [showConfirmPassword, setShowConfirmPassword] =
        React.useState<boolean>(false)

    const [employeeData] = React.useState<employees | any>(
        readOnlyState
            ? employees?.find((employee) => employee.id === fleetId)
            : []
    )

    // const [optionSelected, setOptionSelected] = React.useState<any>(
    //     employeeData?.toll_sites?.map((toll) => toll?.id) || []
    // )

    const handleTollFiltering = (event, newValue) => {
        const name = newValue.toUpperCase()
        setLoading(true)
        dispatch(
            getFilteredRequest({
                criteria: 'site',
                param: name,
            })
        )
        setLoading(false)
    }

    const handleTollSelection = (event, newValue) => {
        // @ts-ignore
        const tollsIds: any[] = []
        newValue.forEach((element) => tollsIds.push(element.id))
        setValue('toll_sites', tollsIds, { shouldValidate: true })
    }
    // const handleTollValue = (employeeData) => {
    //     const ids: any[] = []
    //     employeeData?.toll_sites.forEach(toll => ids.push(toll.name))
    //     return ids
    // }

    const handleAbleToEdit = () => {
        setValue(
            'toll_sites',
            employeeData?.toll_sites.map((toll) => toll.id)
        )
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
    }

    const handleActive = () => {
        setValue('active', !active, {
            shouldValidate: true,
        })
        setActive(!active)
    }

    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const handleMouseDownPassword = (event: React.SyntheticEvent) => {
        event.preventDefault()
    }

    const handleCancelEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
        setValue('first_name', employeeData?.first_name)
        setValue('middle_name', employeeData?.middle_name)
        setValue('last_name', employeeData?.last_name)
        setValue('second_last_name', employeeData?.second_last_name)
        setValue('cellphone_code', employeeData?.mobile.substring(0, 4))
        setValue('phone_number', employeeData?.mobile.slice(4))
        setValue('sex', employeeData?.sex)
        setValue('personal_id', employeeData?.personal_id)
        setValue('role', employeeData?.role)
        setValue('username', employeeData?.username)
        setValue('password', employeeData?.password)
        setValue('email', employeeData?.email)
        setValue('active', employeeData?.active)
    }

    React.useEffect(() => {
        if (readOnlyState) {
            setValue('first_name', employeeData?.first_name)
            setValue('middle_name', employeeData?.middle_name)
            setValue('last_name', employeeData?.last_name)
            setValue('second_last_name', employeeData?.second_last_name)
            setValue('cellphone_code', employeeData?.mobile.substring(0, 4))
            setValue('phone_number', employeeData?.mobile.slice(4))
            setValue('sex', employeeData?.sex)
            setValue('personal_id', employeeData?.personal_id)
            setValue('role', employeeData?.role)
            setValue('username', employeeData?.username)
            setValue('password', employeeData?.password)
            setValue('email', employeeData?.email)
            setValue('active', employeeData?.active)
        }
    }, [employeeData, setValue])
    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const responseData = await dispatch(
                getTollsRequest({
                    _all_: true,
                    per_page: 50,
                })
            )

            setLoading(false)
            return responseData
        }

        fetchData()
    }, [dispatch])

    const onInvalid: SubmitErrorHandler<Inputs> = (data, e) => {
        console.log(data)
    }

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const {
            first_name,
            middle_name,
            second_last_name,
            sex,
            last_name,
            personal_id,
            role,
            cellphone_code,
            phone_number,
            username,
            password,
            email,
            toll_sites,
        } = data

        const fetchData1 = async () => {
            setLoading(true)
            const responseData1 = await dispatch(
                createAllEmployeesRequest({
                    first_name,
                    middle_name,
                    last_name,
                    second_last_name,
                    mobile: `${cellphone_code}${phone_number}`,
                    sex,
                    toll_sites,
                    personal_id,
                    role,
                    company: company,
                    username,
                    password,
                    email,
                    active: active,
                })
            )
            setLoading(false)
            return responseData1
        }
        const fetchData2 = async () => {
            setLoading(true)
            const responseData2 = await dispatch(
                updateAllEmployeesRequest({
                    id: employeeData.id,
                    first_name,
                    middle_name,
                    last_name,
                    second_last_name,
                    mobile: `${cellphone_code}${phone_number}`,
                    sex,
                    toll_sites,
                    personal_id,
                    role,
                    company: company,
                    username,
                    password,
                    email,
                    active: active,
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
        navigate(`/empleados`)
    }

    const handleTable = () => {
        navigate(`/empleados`)
    }

    const handleReturnTable = () => {
        navigate(-1)
    }
    return (
        <>
            <Grid item xs={12}>
                <Typography variant="h4">Datos del empleado</Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2} className="flex justify-between">
                    <Grid item sm zeroMinWidth></Grid>
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
                    {!onlyView && readOnly  && role !== 'visualizer' ? (
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
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="first_name"
                            control={control}
                            // defaultValue={dataEmployee?.first_name || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Primer nombre"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.first_name}
                                    helperText={errors.first_name?.message}
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
                            name="middle_name"
                            control={control}
                            // defaultValue={dataEmployee?.second_name || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Segundo nombre"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.middle_name}
                                    helperText={errors.middle_name?.message}
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
                            name="last_name"
                            control={control}
                            // defaultValue={dataEmployee?.last_name || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Primer apellido"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.last_name}
                                    helperText={errors.last_name?.message}
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
                            name="second_last_name"
                            control={control}
                            // defaultValue={dataEmployee?.last_name_2 || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Segundo apellido"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.second_last_name}
                                    helperText={
                                        errors.second_last_name?.message
                                    }
                                    disabled={readOnlyState}
                                />
                            )}
                        />
                    </Grid>

                    <Controller
                        name="sex"
                        control={control}
                        defaultValue={employeeData?.sex}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={2}
                                className={classes.searchControl}
                            >
                                <TextField
                                    select
                                    label="Género"
                                    fullWidth
                                    size="small"
                                    {...field}
                                    error={!!errors.sex}
                                    helperText={errors.sex?.message}
                                    disabled={readOnlyState}
                                >
                                    {gender.map((option) => (
                                        <MenuItem
                                            key={option.abbreviation}
                                            value={option.abbreviation}
                                        >
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        )}
                    />

                    <Controller
                        name="cellphone_code"
                        control={control}
                        defaultValue={employeeData?.mobile}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={2}
                                className={classes.searchControl}
                            >
                                <TextField
                                    select
                                    label="04XX"
                                    fullWidth
                                    size="small"
                                    {...field}
                                    error={!!errors.cellphone_code}
                                    helperText={errors.cellphone_code?.message}
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
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={3}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="phone_number"
                            control={control}
                            // defaultValue={dataEmployee?.phone.substr(4) || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Teléfono"
                                    onKeyDown={onKeyDown}
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.phone_number}
                                    helperText={errors.phone_number?.message}
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
                    <Typography variant="h4"> Datos del usuario </Typography>
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
                                getOptionDisabled={(option) => {
                                    const test = watch('toll_sites')?.some(
                                        (toll) => toll === option?.id
                                    )
                                    if (test) {
                                        return true
                                    }
                                    return false
                                }}
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

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="personal_id"
                            control={control}
                            // defaultValue={dataEmployee?.id_user || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Código de usuario"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.personal_id}
                                    helperText={errors.personal_id?.message}
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
                            name="role"
                            control={control}
                            defaultValue={employeeData?.role}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Rol"
                                    size="small"
                                    select
                                    autoComplete="off"
                                    error={!!errors.role}
                                    helperText={errors.role?.message}
                                    disabled={readOnlyState}
                                >
                                    {roles.map((option) => (
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
                    {readOnly ? null : (
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={6}
                            className={classes.searchControl}
                        >
                            <Controller
                                name="username"
                                control={control}
                                // defaultValue={dataEmployee?.rol || ''}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Nombre de usuario"
                                        size="small"
                                        autoComplete="off"
                                        error={!!errors.username}
                                        helperText={errors.username?.message}
                                        disabled={readOnlyState}
                                    />
                                )}
                            />
                        </Grid>
                    )}

                    <Controller
                        name={'password'}
                        control={control}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    type={showPassword ? 'text' : 'password'}
                                    fullWidth
                                    label="Contraseña"
                                    size="small"
                                    {...field}
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleShowPassword}
                                                onMouseDown={
                                                    handleMouseDownPassword
                                                }
                                                edge="end"
                                            >
                                                {showPassword ? (
                                                    <Visibility />
                                                ) : (
                                                    <VisibilityOff />
                                                )}
                                            </IconButton>
                                        ),
                                    }}
                                />
                            </Grid>
                        )}
                    />

                    <Controller
                        name={'password_confirm'}
                        control={control}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    type={
                                        showConfirmPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    fullWidth
                                    id="outlined-basic"
                                    label="Confirmar contraseña"
                                    size="small"
                                    {...field}
                                    error={!!errors.password_confirm}
                                    helperText={
                                        errors.password_confirm?.message
                                    }
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                    handleShowConfirmPassword
                                                }
                                                onMouseDown={
                                                    handleMouseDownPassword
                                                }
                                                edge="end"
                                            >
                                                {showConfirmPassword ? (
                                                    <Visibility />
                                                ) : (
                                                    <VisibilityOff />
                                                )}
                                            </IconButton>
                                        ),
                                    }}
                                />
                            </Grid>
                        )}
                    />

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="email"
                            control={control}
                            // defaultValue={dataEmployee?.rol || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Correo electrónico"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    disabled={readOnlyState}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={6} md={6}>
                        <Controller
                            name="active"
                            control={control}
                            render={({ field }) => (
                                <FormControlLabel
                                    {...field}
                                    value="top"
                                    name="active"
                                    control={
                                        <Switch
                                            color="primary"
                                            onChange={handleActive}
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
                            <Grid item sx={{ display: 'flex' }}>
                                <CancelButton
                                    loading={loading}
                                    handleTable={handleTable}
                                />
                                <AcceptButton loading={loading} />
                            </Grid>
                        )}
                    </Grid>
                </CardActions>
                {readOnly ? <div className="flex ">
          <div className="flex m-4">
            <h4 className="font-extrabold">Creado:</h4>
            <span className="pl-2">{new Date(
              employeeData?.created_on
              ).toLocaleDateString('es-VE')}</span>
            
              <span className="pl-3 font-semibold">{employeeData?.created_by}</span>
          </div>
          <div className="flex m-4">
            <h4 className="font-extrabold">Actualizado:</h4>
            <span className="pl-2">{new Date(
              employeeData?.updated_on
              ).toLocaleDateString('es-VE')}</span>

              <span className="pl-3 font-semibold">{employeeData?.updated_by}</span>
          </div>
        </div> : null}
            </form>
        </>
    )
}

export default FareProfile
