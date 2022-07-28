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
    Autocomplete,
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
import { getFilteredRequest } from 'store/filtered/filteredActions'

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
        watch,
        register,
    } = useForm<Inputs>({
        resolver: yupResolver(Schema),
    })

    const readOnly = true

    const tolls = useSelector((state: DefaultRootStateProps) => state.tolls)
    const category = useSelector(
        (state: DefaultRootStateProps) => state.category
    )
    const employees = useSelector(
        (state: DefaultRootStateProps) => state.employee
    )

    const [initialDate, setInitialDate] = React.useState<Date | null>(null)
    const [finishDate, setFinishDate] = React.useState<Date | null>(null)
    const [loading, setLoading] = React.useState(false)

    const handleEmployeeFiltering = (event, newValue) => {
        const username = newValue.toUpperCase()
        setLoading(true)
        dispatch(
            getFilteredRequest({
                criteria: 'employee',
                param: username,
            })
        )
        setLoading(false)
    }

    const handleEmployeeSelection = (event, newValue) => {
        // @ts-ignore
        setValue('employee', newValue?.id)
    }

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
        setValue('toll', newValue?.id)
    }

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

    // const handleChange = (event: SelectChangeEvent<any>) => {
    //     const {
    //         target: { value },
    //     } = event
    //     console.log(value.length)

    //     setCompanyCode(
    //         // On autofill we get a stringified value.
    //         typeof value === 'string' ? value.split(',') : value
    //     )
    //     if (value.length > 0)
    //         setValue('company_code', value.toString(), { shouldValidate: true })
    //     if (value.length === 0)
    //         setValue('company_code', '', { shouldValidate: true })
    //     console.log('companyCode', companyCode)
    // }
    // const handleChangeSummaryCriterias = (event) => {
    //     const val = event.target.value
    //     console.log(val)
    //     setValue('summary_criterias', val, { shouldValidate: true })
    //     setIsSummaryCriteria(val)
    // }
    // const handleRemove = (value: string) =>{
    //     // const com = company.filter((val) => val !== value)
    //     // setCompanyCode
    //     console.log(value)
    //     // return value
    // }

    const onInvalid: SubmitErrorHandler<Inputs> = (data, e) => {
        console.log(data)
        return
    }
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        navigate('/reportes/operaciones/detallado')
    }

    // React.useEffect(() => {
    //     console.log(isSummaryrCiterias)
    //     if (isSummaryrCiterias === 'by_location') {
    //         setValue('operator_id', '', { shouldValidate: true })
    //         setValue('node_type', '', { shouldValidate: true })
    //         setValue('node_code', '', { shouldValidate: true })
    //     }
    //     if (isSummaryrCiterias === 'by_operator') {
    //         setValue('location_id', '', { shouldValidate: true })
    //         setValue('node_type', '', { shouldValidate: true })
    //         setValue('node_code', '', { shouldValidate: true })
    //     }
    //     if (isSummaryrCiterias === 'by_equipment') {
    //         setValue('location_id', '', { shouldValidate: true })
    //         setValue('operator_id', '', { shouldValidate: true })
    //     }
    // }, [isSummaryrCiterias, setValue])

    return (
        <>
            <Grid item sx={{ height: 20 }} xs={12}>
                <Typography variant="h3">
                    Reporte por operaciones manuales
                </Typography>
            </Grid>
            <CardActions sx={{ justifyContent: 'flex flex-ini space-x-2' }}>
                <Button
                    variant="contained"
                    size="medium"
                    type="submit"
                    disabled={true}
                    onClick={handleDateMonth}
                >
                    Mes en curso
                </Button>
                <Button
                    variant="contained"
                    size="medium"
                    type="submit"
                    disabled={true}
                    onClick={handleLastMonth}
                >
                    Mes anterior
                </Button>
                <Button
                    variant="contained"
                    size="medium"
                    type="submit"
                    disabled={true}
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
                                                    // disabled={!!!readOnly}
                                                    disabled={true}
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
                                                    // disabled={!!!readOnly}
                                                    disabled={true}
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
                                    // disabled={!!!readOnly}
                                    disabled={true}
                                >
                                    <MenuItem key="__all__" value="__all__">
                                        {'Todos'}
                                    </MenuItem>
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

                    {/* <Controller
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
                                    // disabled={!!!readOnly}
                                    disabled={true}
                                >
                                    <MenuItem key="__all__" value="__all__">
                                        {'Todos'}
                                    </MenuItem>
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
                    /> */}

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={6}
                        className={classes.searchControl}
                    >
                        <Autocomplete
                            id="toll"
                            options={[{ name: 'Todos', id: 'all' }, ...tolls]}
                            autoSelect={true}
                            size="small"
                            // @ts-ignore
                            getOptionLabel={(option) => option.name}
                            loading={loading}
                            onChange={handleTollSelection}
                            onInputChange={handleTollFiltering}
                            loadingText="Cargando..."
                            noOptionsText="No existen peajes."
                            disabled={!watch('state')}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    {...register('toll')}
                                    name="toll"
                                    label="Peaje"
                                    helperText={errors.toll?.message}
                                    error={!!errors.toll}
                                />
                            )}
                        />
                    </Grid>

                    {/* <Controller
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
                                    // disabled={!!!readOnly}
                                    disabled={true}
                                >
                                    <MenuItem key="__all__" value="__all__">
                                        {'Todos'}
                                    </MenuItem>
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
                    /> */}

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={6}
                        className={classes.searchControl}
                    >
                        <Autocomplete
                            id="employee"
                            options={[
                                { username: 'Todos', id: 'all' },
                                ...employees,
                            ]}
                            autoSelect={true}
                            size="small"
                            // @ts-ignore
                            getOptionLabel={(option) => option.username}
                            loading={loading}
                            onChange={handleEmployeeSelection}
                            onInputChange={handleEmployeeFiltering}
                            loadingText="Cargando..."
                            noOptionsText="No existen operadores."
                            disabled={!watch('toll')}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    {...register('employee')}
                                    name="employee"
                                    label="Operador"
                                    helperText={errors.employee?.message}
                                    error={!!errors.employee}
                                />
                            )}
                        />
                    </Grid>
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
                                            variant="contained"
                                            size="medium"
                                            type="submit"
                                            disabled={true}
                                        >
                                            Crear Reporte
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
