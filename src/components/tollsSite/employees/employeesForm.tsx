import React from 'react'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'
// import { v4 as uuidv4 } from 'uuid'
import {
    useForm,
    SubmitHandler,
    Controller,
    SubmitErrorHandler,
} from 'react-hook-form'

// Redux
// import { useSelector } from 'react-redux'

// material-ui
import { makeStyles } from '@material-ui/styles'
import {
    Grid,
    Button,
    TextField,
    Theme,
    Typography,
    // FormControlLabel,
    // Checkbox,
    CardActions,
    Divider,
    // FormHelperText,
    // Switch,
    MenuItem,
} from '@material-ui/core'
import AnimateButton from 'ui-component/extended/AnimateButton'

import {
    SEX,
    RIF_OPTIONS,
    // DEPARTMENTS,
    NUMBER_CODE,
    // ROLES,
} from 'store/constant'

// project imports
import { gridSpacing } from 'store/constant'
import {
    createEmployeesRequest,
    updateEmployeesRequest,
} from 'store/employee/employeeActions'
// import {
//     createCardsRequest,
//     updateCardsRequest,
// } from 'store/cards/tollsActions'

//Icons
// import { DefaultRootStateProps, TCardsProps } from 'types'

// style constant
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
    searchControl: {
        width: '100%',
        paddingRight: '16px',
        paddingLeft: '16px',
        '& input': {
            background: 'transparent !important',
            paddingLeft: '5px !important',
        },
        '& .Mui-focused input': {
            boxShadow: 'none',
        },
        [theme.breakpoints.down('lg')]: {
            width: '250px',
        },
        [theme.breakpoints.down('md')]: {
            width: '100%',
            marginLeft: '4px',
            background:
                theme.palette.mode === 'dark'
                    ? theme.palette.dark[800]
                    : '#fff',
        },
    },
    ButtonControl: {
        width: '50%',
        '& input': {
            color: ' transparent !important',
            marginLeft: '5px',
        },
        [theme.breakpoints.down('md')]: {
            background:
                theme.palette.mode === 'dark'
                    ? theme.palette.dark[800]
                    : '#ffff',
        },
    },
    borderDebug: {
        border: '1px solid red',
    },
    input: {
        opacity: 0,
        position: 'absolute',
        zIndex: 1,
        padding: 0.5,
        cursor: 'pointer',
        width: '30%',
    },
}))

//types form
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
}
//schema validation
const Schema = yup.object().shape({
    first_name: yup.string().required('Este campo es requerido'),

    middle_name: yup.string().required('Este campo es requerido'),

    last_name: yup.string().required('Este campo es requerido'),
    second_last_name: yup.string().required('Este campo es requerido'),
    identification: yup.string().required('Este campo es requerido'),
    phone_number: yup.string().required('Este campo es requerido'),
    sex: yup.string().required('Este campo es requerido'),
    // department: yup.string().required('Este campo es requerido'),
    personal_id: yup.string().required('Este campo es requerido'),
    role: yup.string().required('Este campo es requerido'),
    document_type: yup.string().required('Este campo es requerido'),
    cellphone_code: yup.string().required('Este campo es requerido'),
})
// ==============================|| COMPANY PROFILE FORM ||============================== //
interface CompanyProfileFormProps {
    tollIdParam?: string
    readOnly?: boolean
    onlyView?: boolean
    tollData?: any
    handleEditEmployee?: () => void
    dataEmployee?: any
    handleTable: () => void
    handleCreateNew: (boo: boolean) => void
}

const EmployeesForm = ({
    tollIdParam,
    readOnly,
    tollData,
    dataEmployee,
    handleEditEmployee,
    handleTable,
    handleCreateNew,
}: CompanyProfileFormProps) => {
    // CUSTOMS HOOKS
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log('data', dataEmployee)
    console.log('data2', tollData)
    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        // getValues,
    } = useForm<Inputs>({
        resolver: yupResolver(Schema),
    })
    // STATES
    const [readOnlyState, setReadOnlyState] = React.useState<
        boolean | undefined
    >(readOnly)
    const [editable, setEditable] = React.useState<boolean>(false)
    React.useState<boolean>(false)

    const onInvalid: SubmitErrorHandler<Inputs> = (data, e) => {
        console.log(data)
    }
    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        console.log(data)
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
        } = data

        if (!editable) {
            dispatch(
                createEmployeesRequest({
                    first_name,
                    middle_name,
                    last_name,
                    second_last_name,
                    mobile: `${cellphone_code}${phone_number}`,
                    sex,
                    toll_site: tollData.id,
                    personal_id,
                    role,
                    company: '6255bfb93ee0c88d0c9142fb',
                })
            )

            navigate(`/peajes/editar/${tollIdParam}&&following`)

            handleCreateNew(false)
        }
        if (editable) {
            const to = dataEmployee.find((fi) => fi.id === tollIdParam)

            if (to !== undefined) {
                let t = to?.filter((fin) => fin.id !== dataEmployee.id)

                to.employers = t
                to.employers.push({
                    id: dataEmployee.id,
                    first_name,
                    middle_name,
                    last_name,
                    second_last_name,
                    mobile: `${cellphone_code}${phone_number}`,
                    sex,
                    toll_site: tollData.id,
                    personal_id,
                    role,
                    company: dataEmployee.company,
                })
            }

            dispatch(updateEmployeesRequest(to))
            // navigate(`/peajes/editar/${tollIdParam}&&following`)
            handleTable()
        }
    }

    const handleAbleToEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
    }

    const handleCancelEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)

        setValue('first_name', dataEmployee?.first_name, {
            shouldValidate: true,
        })
        setValue('middle_name', dataEmployee?.second_name, {
            shouldValidate: true,
        })
        setValue('last_name', dataEmployee?.last_name, {
            shouldValidate: true,
        })
        setValue('second_last_name', dataEmployee?.last_name_2, {
            shouldValidate: true,
        })
        setValue('cellphone_code', dataEmployee?.mobile, {
            shouldValidate: true,
        })
        setValue('phone_number', dataEmployee?.mobile, {
            shouldValidate: true,
        })
        setValue('sex', dataEmployee?.sex, {
            shouldValidate: true,
        })
        // setValue('department', dataEmployee?.department, {
        //     shouldValidate: true,
        // })
        setValue('personal_id', dataEmployee?.personal_id, {
            shouldValidate: true,
        })
        setValue('role', dataEmployee?.role, {
            shouldValidate: true,
        })
    }

    // EFFECTS

    React.useEffect(() => {
        setValue('first_name', dataEmployee?.first_name, {
            shouldValidate: true,
        })
        setValue('middle_name', dataEmployee?.middle_name, {
            shouldValidate: true,
        })
        setValue('last_name', dataEmployee?.last_name, {
            shouldValidate: true,
        })
        setValue('second_last_name', dataEmployee?.second_last_name, {
            shouldValidate: true,
        })
        setValue('cellphone_code', dataEmployee?.mobile, {
            shouldValidate: true,
        })
        setValue('phone_number', dataEmployee?.mobile, {
            shouldValidate: true,
        })
        setValue('sex', dataEmployee?.sex, {
            shouldValidate: true,
        })
        // setValue('department', dataEmployee?.department, {
        //     shouldValidate: true,
        // })
        setValue('personal_id', dataEmployee?.personal_id, {
            shouldValidate: true,
        })
        setValue('role', dataEmployee?.role, {
            shouldValidate: true,
        })
    }, [dataEmployee, setValue])
    // VALIDATE CHECKS BOX

    return (
        <>
            <Grid
                item
                xs={12}
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h4"> Datos de Empleados </Typography>
                {readOnlyState ? (
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

            <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
                <Grid container spacing={gridSpacing} sx={{ marginTop: '5px' }}>
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
                                    label="primer nombre"
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
                                    label="segundo Nombre"
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
                        // defaultValue={dataEmployee?.sexo}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={2}
                                className={classes.searchControl}
                            >
                                <TextField
                                    select
                                    label="Sexo"
                                    fullWidth
                                    size="small"
                                    {...field}
                                    error={!!errors.sex}
                                    helperText={errors.sex?.message}
                                    disabled={readOnlyState}
                                >
                                    {SEX.map((option) => (
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
                        name="document_type"
                        control={control}
                        // defaultValue={dataEmployee?.identification?.charAt(0)}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                lg={2}
                                className={classes.searchControl}
                            >
                                <TextField
                                    select
                                    fullWidth
                                    label="Tipo"
                                    size="small"
                                    {...field}
                                    error={!!errors.document_type}
                                    helperText={errors.document_type?.message}
                                    disabled={readOnlyState}
                                >
                                    {RIF_OPTIONS.map((option) => (
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
                            name="identification"
                            control={control}
                            // defaultValue={
                            //     dataEmployee?.identification.substr(1) || ''
                            // }
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Identificacion"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.identification}
                                    helperText={errors.identification?.message}
                                    disabled={readOnlyState}
                                />
                            )}
                        />
                    </Grid>
                    <Controller
                        name="cellphone_code"
                        control={control}
                        // defaultValue={dataEmployee?.phone.substr(0, 4)}
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
                                    label="Telefono"
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
                    <Typography variant="h4"> Datos de la empresa </Typography>
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
                            name="personal_id"
                            control={control}
                            // defaultValue={dataEmployee?.id_user || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Codigo de usuario"
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
                            // defaultValue={dataEmployee?.rol || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Rol"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.role}
                                    helperText={errors.role?.message}
                                    disabled={readOnlyState}
                                />
                            )}
                        />
                    </Grid>
                </Grid>

                <Divider sx={{ marginTop: '70px' }} />
                <CardActions>
                    <Grid container justifyContent="flex-end" spacing={0}>
                        {editable ? (
                            <Grid item sx={{ display: 'flex' }}>
                                <AnimateButton>
                                    <Button
                                        //variant="contained"
                                        color="error"
                                        size="large"
                                        onClick={handleCancelEdit}
                                        className="mx-4"
                                    >
                                        Cancelar
                                    </Button>
                                </AnimateButton>
                                <AnimateButton>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        type="submit"
                                        // onclick={}
                                    >
                                        Aceptar
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        ) : null}
                        {readOnly ? null : (
                            <Grid item>
                                <AnimateButton>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        type="submit"
                                    >
                                        Crear empleado
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        )}
                    </Grid>
                </CardActions>
            </form>
        </>
    )
}

export default EmployeesForm
