import React from 'react'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
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
import { v4 as uuidv4 } from 'uuid'
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
import { DefaultRootStateProps } from 'types'
import {
    SEX,
    RIF_OPTIONS,
    // DEPARTMENTS,
    NUMBER_CODE,
    // ROLES,
} from 'store/constant'

// project imports
import { gridSpacing } from 'store/constant'
import { addTolls, updateTolls } from 'store/tolls/tollsActions'
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
    second_name: string
    last_name: string
    last_name_2: string
    identification: string
    phone: string
    sexo: string
    department: string
    id_user: string
    rol: string
    document_type: string
    cellphone_code: string
}
//schema validation
const Schema = yup.object().shape({
    first_name: yup.string().required('Este campo es requerido'),

    second_name: yup.string().required('Este campo es requerido'),

    last_name: yup.string().required('Este campo es requerido'),
    last_name_2: yup.string().required('Este campo es requerido'),
    identification: yup.string().required('Este campo es requerido'),
    phone: yup.string().required('Este campo es requerido'),
    sexo: yup.string().required('Este campo es requerido'),
    department: yup.string().required('Este campo es requerido'),
    id_user: yup.string().required('Este campo es requerido'),
    rol: yup.string().required('Este campo es requerido'),
    document_type: yup.string().required('Este campo es requerido'),
    cellphone_code: yup.string().required('Este campo es requerido'),
})
// ==============================|| COMPANY PROFILE FORM ||============================== //
interface CompanyProfileFormProps {
    tollIdParam?: string
    readOnly?: boolean
    onlyView?: boolean
    tollsData?: any
    handleEditEmployee?: () => void
    dataEmployee?: any
    handleTable: () => void
    handleCreateNew: (boo: boolean) => void
}

const EmployeesForm = ({
    tollIdParam,
    readOnly,
    tollsData,
    dataEmployee,
    handleEditEmployee,
    handleTable,
    handleCreateNew,
}: CompanyProfileFormProps) => {
    // CUSTOMS HOOKS
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const toll = useSelector((state: DefaultRootStateProps) => state.tolls)
    // const cards = useSelector((state: DefaultRootStateProps) => state.cards)
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
    // const [cardsData] = React.useState<TCardsProps | any>(
    //     readOnlyState
    //         ? cards?.find((cardsItems) => cardsItems?.id === tollIdParam)
    //         : []
    // )

    // FUNCTIONS
    // const optionsCompanies = companies.map((company) => {
    //     return {
    //         label: company.name,
    //         value: company.company_code,
    //     }
    // })

    const onInvalid: SubmitErrorHandler<Inputs> = (data, e) => {
        // if (checksDataMedia.length < 1 || checksDataActions.length < 1) {
        //     if (checksDataMedia.length < 1) setCheckErrorMedia(true)
        //     if (checksDataActions.length < 1) setCheckErrorAction(true)
        //     return
        // }
        // return
    }
    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        // if (checkErrorMedia || checkErrorAction) {
        //     return
        // }
        const {
            first_name,
            second_name,
            last_name,
            last_name_2,
            identification,
            phone,
            sexo,
            department,
            id_user,
            rol,
            document_type,
            cellphone_code,
        } = data
        // const currency = 'USD'

        if (!editable) {
            const _id = uuidv4()

            const to = toll.find((fi) => fi.id === tollIdParam)
            const len = to?.employers.length
            to?.employers.push({
                _id,
                first_name,
                second_name,
                last_name,
                last_name_2,
                identification: `${document_type}${identification}`,
                phone: `${cellphone_code}${phone}`,
                sexo,
                department,
                id_user,
                rol,
            })
            dispatch(addTolls(to))
            navigate(`/peajes/editar/${tollIdParam}&&following`)
            if (len && len > 0) {
                handleCreateNew(false)
            }
        }
        if (editable) {
            const to = toll.find((fi) => fi.id === tollIdParam)
            console.log('edit to ', to)
            if (to !== undefined) {
                let t = to?.employers.filter(
                    (fin) => fin._id !== dataEmployee._id
                )
                console.log('edit', t)
                to.employers = t
                to.employers.push({
                    _id: dataEmployee._id,
                    first_name,
                    second_name,
                    last_name,
                    last_name_2,
                    identification: `${document_type}${identification}`,
                    phone: `${cellphone_code}${phone}`,
                    sexo,
                    department,
                    id_user,
                    rol,
                })
            }
            console.log(to)

            // to?.lanes.find()
            console.log('new')
            dispatch(updateTolls(to))
            navigate(`/peajes/editar/${tollIdParam}`)
            handleTable()
        }
    }

    // const onChangeFilialCompany = (e) => {
    //     e.preventDefault()
    //     setValue('filialCompany', e.target.value, {
    //         shouldValidate: true,
    //     })
    //     setFilialCompanyId(e.target.value)
    // }

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
        setValue('second_name', dataEmployee?.second_name, {
            shouldValidate: true,
        })
        setValue('last_name', dataEmployee?.last_name, {
            shouldValidate: true,
        })
        setValue('last_name_2', dataEmployee?.last_name_2, {
            shouldValidate: true,
        })
        setValue('phone', dataEmployee?.phone, {
            shouldValidate: true,
        })
        setValue('sexo', dataEmployee?.sexo, {
            shouldValidate: true,
        })
        setValue('department', dataEmployee?.department, {
            shouldValidate: true,
        })
        setValue('id_user', dataEmployee?.id_user, {
            shouldValidate: true,
        })
        setValue('rol', dataEmployee?.rol, {
            shouldValidate: true,
        })
        // setChecksDataMedia(cardsData?.allowed_media)
        // setChecksDataActions(cardsData?.allowed_actions)
        // setWebRechargable(cardsData?.web_rechargable)
        // setIsTicketAllowed(cardsData?.is_ticket_allowed)
    }

    // EFFECTS
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
                            defaultValue={dataEmployee?.first_name || ''}
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
                            name="second_name"
                            control={control}
                            defaultValue={dataEmployee?.second_name || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="segundo Nombre"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.second_name}
                                    helperText={errors.second_name?.message}
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
                            defaultValue={dataEmployee?.last_name || ''}
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
                            name="last_name_2"
                            control={control}
                            defaultValue={dataEmployee?.last_name_2 || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Segundo apellido"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.last_name_2}
                                    helperText={errors.last_name_2?.message}
                                    disabled={readOnlyState}
                                />
                            )}
                        />
                    </Grid>

                    <Controller
                        name="sexo"
                        control={control}
                        defaultValue={dataEmployee?.sexo}
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
                                    error={!!errors.sexo}
                                    helperText={errors.sexo?.message}
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
                        defaultValue={dataEmployee?.identification?.charAt(0)}
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
                            defaultValue={
                                dataEmployee?.identification.substr(1) || ''
                            }
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
                        defaultValue={dataEmployee?.phone.substr(0, 4)}
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
                            name="phone"
                            control={control}
                            defaultValue={dataEmployee?.phone.substr(4) || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Telefono"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.phone}
                                    helperText={errors.phone?.message}
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
                            name="department"
                            control={control}
                            defaultValue={dataEmployee?.department || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Departamento"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.department}
                                    helperText={errors.department?.message}
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
                            name="id_user"
                            control={control}
                            defaultValue={dataEmployee?.id_user || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Codigo de usuario"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.id_user}
                                    helperText={errors.id_user?.message}
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
                            name="rol"
                            control={control}
                            defaultValue={dataEmployee?.rol || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Rol"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.rol}
                                    helperText={errors.rol?.message}
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
                                        Crear Tarjeta
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
