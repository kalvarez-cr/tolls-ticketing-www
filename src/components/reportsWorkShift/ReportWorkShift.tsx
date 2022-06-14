import React from 'react'

// material-ui
import {
    Grid,
    CardActions,
    // TextField,
    Button,
    Theme,
    Typography,
    MenuItem,
} from '@material-ui/core'
import AnimateButton from 'ui-component/extended/AnimateButton'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
// import {dayjs} from ''

// project imports
import { gridSpacing } from 'store/constant'
import { makeStyles } from '@material-ui/styles'

//hook-form
import { yupResolver } from '@hookform/resolvers/yup'
import {
    useForm,
    Controller,
    SubmitHandler,
    SubmitErrorHandler,
} from 'react-hook-form'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'
import { useNavigate } from 'react-router'
import { getStatesRequest } from 'store/states/stateAction'
import { getEmployeesRequest } from 'store/employee/employeeActions'
import { getWorkReportRequest } from 'store/workShift/WorkAction'
import { getTollsRequest } from 'store/tolls/tollsActions'

// import { getCompaniesRequest } from 'store/operatingCompany/operatingCompanyActions'
// import  { TYPEREPORTS } from '../../../_mockApis/reports/typeReports/TypeReports'

// import { getNodeRequest } from 'store/nodes/nodeActions';
// import { getNodeTypeRequest } from 'store/nodeType/nodeTypeAction';
// import { getUsersRequest } from 'store/users/usersActions'
// import { getStopsRequest } from 'store/StopsAndZones/StopsAndZonesActions'

// import TagFacesIcon from '@mui/icons-material/TagFaces';

const useStyles = makeStyles((theme: Theme) => ({
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
        ' & .css-1xu5ovs-MuiInputBase-input-MuiOutlinedInput-input': {
            color: '#6473a8',
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
    SelectIcon: {
        right: '7px',
    },
}))

interface Inputs {
    initial_date: string
    final_date: string
    state: string
    toll: string
    employee: string
}

const validateDate = () => {
    const today = new Date()
    let hours = 24 * 60 * 60 * 100
    const tomorrow = new Date(today.getTime() + hours)
    return tomorrow
}

const Schema = yup.object().shape({
    initial_date: yup
        .date()
        .max(validateDate(), 'Fecha no permitida')
        .nullable()
        .typeError('Debe seleccionar una fecha válida')
        .required('Este campo es requerido'),
    final_date: yup
        .date()
        .default(null)
        .min(yup.ref('initial_date'), 'Debe ser mayor que la fecha inicial')
        .max(validateDate(), 'Fecha no permitida')
        .nullable()
        .typeError('Debe seleccionar una fecha válida')
        .required('Este campo es requerido'),
    state: yup.string().required('Este campo es requerido'),
    toll: yup.string().required('Este campo es requerido'),
    employee: yup.string().required('Este campo es requerido'),
})

const ReportTransit = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const theme = useTheme()
    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        getValues,
        watch,
    } = useForm<Inputs>({
        resolver: yupResolver(Schema),
    })

    const readOnly = true

    const tolls = useSelector((state: DefaultRootStateProps) => state.tolls)
    const states = useSelector((state: DefaultRootStateProps) => state.states)

    const employees = useSelector(
        (state: DefaultRootStateProps) => state.employee
    )

    const [initialDate, setInitialDate] = React.useState<Date | any>(null)
    const [finishDate, setFinishDate] = React.useState<Date | any>(null)
    const [loading, setLoading] = React.useState(false)

    const handleDateMonth = () => {
        const date = new Date()
        const initial = new Date(date.getFullYear(), date.getMonth(), 1)
        setInitialDate(initial)
        setFinishDate(date)
        setValue('initial_date', initial, { shouldValidate: true })
        setValue('final_date', date, { shouldValidate: true })
    }

    const handleLastMonth = () => {
        const date = new Date()
        const initial = new Date(date.getFullYear(), date.getMonth() - 1)
        const ini = new Date(initial.getFullYear(), initial.getMonth(), 1)
        const final = new Date(date.getFullYear(), initial.getMonth() + 1, 0)
        setInitialDate(ini)
        setFinishDate(final)
        setValue('initial_date', ini, { shouldValidate: true })
        setValue('final_date', final, { shouldValidate: true })
    }

    const handleYear = () => {
        const date = new Date()
        const ini = new Date(date.getFullYear(), 0, 1)
        setInitialDate(ini)
        setFinishDate(date)
        setValue('initial_date', ini, { shouldValidate: true })
        setValue('final_date', date, { shouldValidate: true })
    }

    const handleChangeInitialDate = (newValue: Date | null) => {
        setInitialDate(newValue)
        if (newValue)
            setValue('initial_date', newValue, { shouldValidate: true })
        if (newValue === null)
            setValue('initial_date', null, { shouldValidate: true })
    }

    const handleChangeFinishDate = (newValue: Date | null) => {
        setFinishDate(newValue)
        if (newValue) setValue('final_date', newValue, { shouldValidate: true })
        if (newValue === null)
            setValue('final_date', null, { shouldValidate: true })
    }

    React.useEffect(() => {
        dispatch(getStatesRequest())
    }, [dispatch])
    React.useEffect(() => {
        dispatch(getTollsRequest({ state: getValues('state') }))
    }, [watch('state')])

    React.useEffect(() => {
        dispatch(getEmployeesRequest({ toll_sites: getValues('toll') }))
    }, [watch('toll')])

    const onInvalid: SubmitErrorHandler<Inputs> = (data, e) => {
        console.log(data)
        return
    }
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const { employee } = data

        const fetchData = async () => {
            setLoading(true)
            const responseData2 = await dispatch(
                getWorkReportRequest({
                    initial_date: initialDate.toLocaleDateString('es-VE'),
                    final_date: finishDate.toLocaleDateString('es-VE'),
                    report_type: 'work_shift',
                    employee_username: employee,
                })
            )
            setLoading(false)
            return responseData2
        }

        const responseData1 = await fetchData()

        if (responseData1) {
            console.log(responseData1)
            navigate('/reportes/trabajo/detallado')
        }
    }

    return (
        <>
            <Grid item sx={{ height: 20 }} xs={12}>
                <Typography variant="h3">
                    Reporte por recaudación de turnos de trabajo
                </Typography>
            </Grid>
            <CardActions sx={{ justifyContent: 'flex flex-ini space-x-2' }}>
                <Button
                    variant="contained"
                    size="medium"
                    type="submit"
                    //disabled={rea}
                    onClick={handleDateMonth}
                >
                    Mes en curso
                </Button>
                <Button
                    variant="contained"
                    size="medium"
                    type="submit"
                    //disabled={rea}
                    onClick={handleLastMonth}
                >
                    Mes anterior
                </Button>
                <Button
                    variant="contained"
                    size="medium"
                    type="submit"
                    //disabled={rea}
                    onClick={handleYear}
                >
                    Año en curso
                </Button>
            </CardActions>
            <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
                <Grid
                    container
                    spacing={gridSpacing}
                    className={classes.searchControl}
                    // md={12}
                >
                    <Controller
                        name="initial_date"
                        control={control}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={6}
                                className={classes.searchControl}
                            >
                                <LocalizationProvider
                                    dateAdapter={AdapterDateFns}
                                >
                                    <Stack spacing={3}>
                                        <DesktopDatePicker
                                            {...field}
                                            label="Fecha de inicio"
                                            inputFormat="dd/MM/yyyy"
                                            value={initialDate}
                                            onChange={handleChangeInitialDate}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    fullWidth
                                                    size="small"
                                                    autoComplete="off"
                                                    error={
                                                        !!errors.initial_date
                                                    }
                                                    helperText={
                                                        errors.initial_date
                                                            ?.message
                                                    }
                                                    disabled={!!!readOnly}
                                                />
                                            )}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                            </Grid>
                        )}
                    />
                    <Controller
                        name="final_date"
                        control={control}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={6}
                                className={classes.searchControl}
                            >
                                <LocalizationProvider
                                    dateAdapter={AdapterDateFns}
                                >
                                    <Stack spacing={3}>
                                        <DesktopDatePicker
                                            {...field}
                                            label="Fecha de cierre"
                                            inputFormat="dd/MM/yyyy"
                                            value={finishDate}
                                            onChange={handleChangeFinishDate}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    fullWidth
                                                    size="small"
                                                    autoComplete="off"
                                                    error={!!errors.final_date}
                                                    helperText={
                                                        errors.final_date
                                                            ?.message
                                                    }
                                                    disabled={!!!readOnly}
                                                />
                                            )}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                            </Grid>
                        )}
                    />

                    <Controller
                        name="state"
                        control={control}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    select
                                    fullWidth
                                    label="Estado"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.state}
                                    helperText={errors.state?.message}
                                    disabled={!!!readOnly}
                                >
                                    {/* <MenuItem key="null" value="null">
                                        {'Todos'}
                                    </MenuItem> */}
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
                        name="toll"
                        control={control}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    select
                                    fullWidth
                                    label="Peaje"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.toll}
                                    helperText={errors.toll?.message}
                                    disabled={!watch('state')}
                                >
                                    {/* <MenuItem key="null" value="null">
                                        {'Todos'}
                                    </MenuItem> */}
                                    {tolls.map((option) => (
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
                        name="employee"
                        control={control}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    select
                                    fullWidth
                                    label="Operador"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.employee}
                                    helperText={errors.employee?.message}
                                    disabled={!watch('toll')}
                                >
                                    {/* <MenuItem key={'all'} value={'all'}>
                                        {'Todos'}
                                    </MenuItem> */}
                                    {employees.map((option) => (
                                        <MenuItem
                                            key={option.username}
                                            value={option.username}
                                        >
                                            {option.username}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        )}
                    />
                </Grid>
                <CardActions>
                    <Grid
                        container
                        justifyContent="flex-end"
                        spacing={0}
                        sx={{ marginTop: '10px' }}
                    >
                        {readOnly ? (
                            <>
                                <Grid item>
                                    <AnimateButton>
                                        <Button
                                            disableElevation
                                            variant="contained"
                                            size="medium"
                                            type="submit"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <svg
                                                        role="status"
                                                        className="inline w-4 h-4 mr-3 text-white animate-spin"
                                                        viewBox="0 0 100 101"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                            fill="#E5E7EB"
                                                        />
                                                        <path
                                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                            fill="currentColor"
                                                        />
                                                    </svg>
                                                    Cargando...
                                                </>
                                            ) : (
                                                <>Crear Reporte</>
                                            )}
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </>
                        ) : null}
                    </Grid>
                </CardActions>
            </form>
        </>
    )
}

export default ReportTransit
