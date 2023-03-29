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
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
// import AdapterDateFns from '@mui/lab/AdapterDateFns'
// import LocalizationProvider from '@mui/lab/LocalizationProvider'
// import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'

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
import { getTransitReportRequest } from 'store/transitReport/TransitAction'
import { getTollsRequest } from 'store/tolls/tollsActions'
import { getLaneStateRequest } from 'store/lane/laneActions'
import { getFareByTollId } from 'store/fare/FareActions'
import { getCategoryRequest } from 'store/Category/CategoryActions'
import CreateReportButton from 'components/buttons/CreateReportButton'
import { getStatesReportRequest } from 'store/stateReport/stateReportAction'
import { getFilteredRequest } from 'store/filtered/filteredActions'
import ModalSimple from 'components/removeForms/ModalSimple'

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
    lane: string
    category: string
    tool: string
    dates: string
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
    lane: yup.string().required('Este campo es requerido'),
    category: yup.string().required('Este campo es requerido'),
    // tool: yup.string().required('Este campo es requerido'),
    dates: yup.string().required('Este campo es requerido'),
})

const ReportTransit = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState<boolean>(false)

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

    const readOnly = true

    const tolls = useSelector((state: DefaultRootStateProps) => state.tolls)
    const states = useSelector(
        (state: DefaultRootStateProps) => state.ReportState
    )

    const lanes = useSelector((state: DefaultRootStateProps) => state.lanes)
    const category = useSelector(
        (state: DefaultRootStateProps) => state.category
    )

    const [initialDate, setInitialDate] = React.useState<Date | any>(null)
    const [finishDate, setFinishDate] = React.useState<Date | any>(null)
    const [loading, setLoading] = React.useState<boolean>(false)

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

    const handleCategoryFiltering = (event, newValue) => {
        const title = newValue.toUpperCase()
        setLoading(true)
        dispatch(
            getFilteredRequest({
                criteria: 'category',
                param: title,
            })
        )
        setLoading(false)
    }

    const handleCategorySelection = (event, newValue) => {
        // @ts-ignore
        setValue('category', newValue?.id)
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
        const year = date.getFullYear()
        const final = new Date(
            date.getMonth() === 0 ? year - 1 : year,
            initial.getMonth() + 1,
            0
        )
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

    const onInvalid: SubmitErrorHandler<Inputs> = (data, e) => {
        return
    }
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const { dates, toll, state, lane, category } = data
        const initDate = initialDate.getFullYear()
        const finalDate = finishDate.getFullYear()

         const diferentYear =  finalDate - initDate

        const fetchData = async () => {
            setLoading(true)
            const responseData2 = await dispatch(
                getTransitReportRequest({
                    report_type: 'transit',
                    initial_date: initialDate.toLocaleDateString('es-VE'),
                    final_date: finishDate.toLocaleDateString('es-VE'),
                    group_criteria: dates,
                    site: toll === 'all' ? null : toll,
                    state: state === 'all' ? null : state,
                    node: lane === 'all' ? null : lane,
                    category: category === 'all' ? null : category,
                })
            )
            setLoading(false)
            return responseData2
        }
        
        if (diferentYear === 0 ) {

            const responseData1 = await fetchData()

        if (responseData1) {
            console.log(responseData1)
            navigate('/reportes/transito/detallado')
        }
        } else if (!open) {
            setOpen(true)
        } else if( open) {
            const responseData1 = await fetchData()

            if (responseData1) {
                console.log(responseData1)
                navigate('/reportes/transito/detallado')
            } 
            setOpen(false)
        }

        
    }

    React.useEffect(() => {
        dispatch(getStatesReportRequest())
        dispatch(getCategoryRequest({ _all_: true, per_page: 50 }))
    }, [dispatch])
    React.useEffect(() => {
        dispatch(getTollsRequest({ state: getValues('state'), per_page: 50 }))
    }, [watch('state')])

    React.useEffect(() => {
        dispatch(getLaneStateRequest({ site_id: getValues('toll') }))
    }, [watch('toll')])

    React.useEffect(() => {
        dispatch(getFareByTollId({ site_id: getValues('toll') }))
    }, [watch('toll')])
    return (
        <>

<ModalSimple
                    open={open}
                    setOpen={setOpen}
                    handleAccept={handleSubmit(onSubmit)}
                    title={'Información'}
                

                    
                >

                <p>Este reporte tardará más de un minuto, ¿Desea  esperar? </p>


                    </ModalSimple>



            <Grid item sx={{ height: 20 }} xs={12}>
                <Typography variant="h3">
                    Reporte de tránsito por canales
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
                                            format="dd/MM/yyyy"
                                            value={initialDate}
                                            onChange={handleChangeInitialDate}
                                            slotProps={{
                                                textField: {
                                                    helperText:
                                                        errors.initial_date
                                                            ?.message,
                                                    error: !!errors.initial_date,
                                                    size:'small',
                                                    autoComplete:'off',
                                                    
                                                },
                                            }}
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
                                            format="dd/MM/yyyy"
                                            value={finishDate}
                                            onChange={handleChangeFinishDate}
                                            slotProps={{
                                                textField: {
                                                    helperText:
                                                        errors.final_date
                                                            ?.message,
                                                    error: !!errors.final_date,
                                                    size:'small',
                                                    autoComplete:'off',
                                                    
                                                },
                                            }}

                                          
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
                                    <MenuItem key={'all'} value={'all'}>
                                        {'Todos'}
                                    </MenuItem>
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
                                    disabled={!watch('state')}
                                >
                                    <MenuItem key={'all'} value={'all'}>
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

                    <Controller
                        name="lane"
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
                                    label="Canal"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.lane}
                                    helperText={errors.lane?.message}
                                    disabled={!watch('toll')}
                                >
                                    <MenuItem key={'all'} value={'all'}>
                                        {'Todos'}
                                    </MenuItem>
                                    {lanes.map((option) => (
                                        <MenuItem
                                            key={option.parent_node}
                                            value={option.parent_node}
                                        >
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        )}
                    />
                    {/* <Controller
                        name="category"
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
                                    label="Tarifa"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.category}
                                    helperText={errors.category?.message}
                                    disabled={!!!readOnly}
                                >
                                    <MenuItem key={'all'} value={'all'}>
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
                            id="category"
                            options={[
                                { title: 'Todos', id: 'all' },
                                ...category,
                            ]}
                            autoSelect={true}
                            size="small"
                            // @ts-ignore
                            getOptionLabel={(option) => option.title}
                            loading={loading}
                            onChange={handleCategorySelection}
                            onInputChange={handleCategoryFiltering}
                            loadingText="Cargando..."
                            noOptionsText="No existen categorías."
                            disabled={!!!readOnly}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    {...register('category')}
                                    name="category"
                                    label="Categoría"
                                    helperText={errors.category?.message}
                                    error={!!errors.category}
                                />
                            )}
                        />
                    </Grid>

                    {/* <Controller
                        name="tool"
                        control={control}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    select
                                    fullWidth
                                    label="Instrumento"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.tool}
                                    helperText={errors.tool?.message}
                                    disabled={!!!readOnly}
                                >
                                    <MenuItem key="null" value="null">
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
                    /> */}

                    <Controller
                        name="dates"
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
                                    label="Agrupación"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.dates}
                                    helperText={errors.dates?.message}
                                    disabled={!!!readOnly}
                                >
                                    <MenuItem key="daily" value="daily">
                                        {'Día'}
                                    </MenuItem>
                                    <MenuItem key="monthly" value="monthly">
                                        {'Mes'}
                                    </MenuItem>
                                    <MenuItem key="yearly" value="yearly">
                                        {'Año'}
                                    </MenuItem>
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
                                    <CreateReportButton loading={loading} />
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
