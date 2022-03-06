import React from 'react'

// material-ui
import {
    Box, 
    Chip,
    Grid,
    CardActions,
    // TextField,
    Button,
    Theme,
    useTheme,
    MenuItem,
    Typography,
} from '@material-ui/core'
import AnimateButton from 'ui-component/extended/AnimateButton'
import { SelectChangeEvent } from '@mui/material/Select';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
// import {dayjs} from '' 

// project imports
import { gridSpacing } from 'store/constant'
import { makeStyles } from '@material-ui/styles'

//hook-form
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'
import * as yup from 'yup'
import { DefaultRootStateProps } from 'types'
import { useDispatch, useSelector } from 'react-redux'
// import { getCompaniesRequest } from 'store/operatingCompany/operatingCompanyActions'
// import  { TYPEREPORTS } from '../../../_mockApis/reports/typeReports/TypeReports'
import { RESUMECRITERIA } from '../../../_mockApis/reports/resumeCriteria/resumeCriteria'
import { SUMMARYCRITERIAS } from '../../../_mockApis/summary_criterias/summary_criterias'
import { COMPANY } from '../../../_mockApis/operating_companies/create_company' 
import { CONSOLIDATECRITERIA } from '../../../_mockApis/reports/consolidationCritaria/consolidateCriteria'
// import { getNodeRequest } from 'store/nodes/nodeActions';
// import { getNodeTypeRequest } from 'store/nodeType/nodeTypeAction';
// import { getUsersRequest } from 'store/users/usersActions'
// import { getStopsRequest } from 'store/StopsAndZones/StopsAndZonesActions'
import { getDetailsReportsIncomeRequest } from 'store/reports/reportsIncome/reportsIncomeActions';

// import TagFacesIcon from '@mui/icons-material/TagFaces';


const getStyles = (name: string, companyCode: readonly string[], theme: Theme) => {
    return {
      fontWeight:
      companyCode.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
}
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
        right: "7px"
    },
}))

interface Inputs {
    summary_criterias:string
    date_range: string
    initial_date: string
    final_date: string
    company_code: string
    location_id: string
    operator_id:string
    node_type:string
    node_code:string
    criteria: string
    resume_criteria: string
    // export_format: string 
}

const validateDate = () => {
    const today = new Date()
    let hours  = 24 * 60 * 60 * 100
    const tomorrow = new Date(today.getTime() + hours)
    console.log(tomorrow)
    return tomorrow
}

const Schema = yup.object().shape({
    initial_date: yup
        .date()
        .max(validateDate(),  "Fecha no permitida")
        .nullable()
        .typeError("Debe seleccionar una fecha valida")
        .required('Este campo es requerido'),
        final_date: yup
        .date().default(null)
        .min(yup.ref('initial_date'), 'Debe ser mayor que la fecha inicial')
        .max(validateDate(),  "Fecha no permitida")
        .nullable()
        .typeError("Debe seleccionar una fecha valida")
        .required('Este campo es requerido'),
    summary_criterias: yup
        .string()
        .required('Este campo es requerido'),
    company_code: yup.string().required('Este campo es requerido'),
    node_type: yup
        .string()
        .when('summary_criterias', {
            is:'by_equipment',
            then: (value)=> value.nullable().required('Este campo es requerido'),
        }),
    node_code: yup
        .string()
        .when('summary_criterias',{
            is:'by_equipment',
            then:(value) => value.required('Este campo es requerido')
        }),
    operator_id: yup
        .string()
        .when('summary_criterias', {
            is: 'by_operator',
            then: (value) => value.required('Este campo es requerido'),     
        }),
    location_id: yup
        .string()
        .when('summary_criterias',{
            is: 'by_location',
            then:(value) => value.required('Este campo es requerido'),
        }),
    criteria: yup.string().required('Este campo es requerido'),
    resume_criteria: yup.string().required('Este campo es requerido'),
    // export_format: yup.string().required('Este campo es requerido'),
})

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const DetailsIncomeReportsForm = ( props : {handleView :() => void, handleData:(val: Object )=> void})  => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const theme = useTheme()
    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm<Inputs>({
        resolver: yupResolver(Schema),
    })

    // const operatingCompanies = useSelector(
    //     (state: DefaultRootStateProps) => state.operatingCompanies
    // )
    const operatingCompanies =COMPANY
    const nodeType = useSelector(
        (state: DefaultRootStateProps) => state.nodeType
    )
    const node = useSelector(
        (state: DefaultRootStateProps) => state.node
    )
    const location = useSelector(
        (state: DefaultRootStateProps) => state.stopsAndZones
    )
    const user = useSelector(
        (state: DefaultRootStateProps) => state.users
    )
    // const report_format = useSelector(
    //     (state: DefaultRootStateProps) => state.login?.user?.content?.web_config?.report_format
    // )
    // const time_criteria = useSelector(
    //     (state: DefaultRootStateProps) => state.login?.user?.content?.web_config?.time_criteria
    // )
    const time_criteria = RESUMECRITERIA
    // const consolidate_criteria = useSelector(
    //     (state: DefaultRootStateProps) => state.login?.user?.content?.web_config?.group_criteria
    // )
    const consolidate_criteria = CONSOLIDATECRITERIA
    const readOnly = true
    // const user = useSelector((state: DefaultRootStateProps) => state.users)
    const [companyCode, setCompanyCode] = React.useState<Array<string>>([])
    const [initialDate, setInitialDate] = React.useState<Date | null>( null );
    const [finishDate, setFinishDate ] =React.useState<Date | null >(null)
    const [isSummaryrCiterias, setIsSummaryCriteria] = React.useState<string>('')

    const handleChangeInitialDate = (newValue: Date | null ) => {
        setInitialDate(newValue);
        if(newValue) setValue('initial_date', newValue ,{ shouldValidate: true} )
        if(newValue === null)  setValue('initial_date', null ,{ shouldValidate: true} )
    };

    const handleChangeFinishDate = (newValue: Date | null ) => {
        setFinishDate(newValue )
        if(newValue) setValue('final_date', newValue ,{ shouldValidate: true} )
        if(newValue === null)  setValue('final_date', null ,{ shouldValidate: true} )
    }

    const handleChange = (event: SelectChangeEvent<any>) => {
        const {
          target: { value },
        } = event;
        console.log(value.length)

        setCompanyCode(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        )
        if(value.length > 0 ) setValue('company_code' , value.toString(), { shouldValidate: true})
        if(value.length === 0 ) setValue('company_code' , '', { shouldValidate: true})
        console.log("companyCode", companyCode)
    };
    const handleChangeSummaryCriterias = (event) => {
        const val = event.target.value
        console.log(val)
        setValue('summary_criterias', val, {shouldValidate:true})
        setIsSummaryCriteria(val)
    }
    // const handleRemove = (value: string) =>{
    //     // const com = company.filter((val) => val !== value)
    //     // setCompanyCode
    //     console.log(value)
    //     // return value
    // }

    const handleBox = (Selected) =>{
        return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {/* <Stack direction="row" spacing={1}> */}
                {Selected.map((value) => (
                    // <Chip key={value} label={value} onDelete={() => handleRemove(value)} />
                    <Chip key={value} label={value} />

                ))}
            {/* </Stack> */}
            </Box>
        )
    }
    const onInvalid: SubmitErrorHandler<Inputs> = (data, e) => {
        console.log(data)
         return
     }
    const onSubmit: SubmitHandler<Inputs> = (data) => {

        const {
            initial_date,
            final_date,
            node_type,
            node_code,
            location_id,
            operator_id,
            summary_criterias,
            criteria,
            resume_criteria,
            // export_format,
        } = data
        console.log("initial_date",initial_date)

        const date_initial = new Date(initial_date)
        const date_final = new Date(final_date)
        
        const dia_ini = date_initial.getDate() < 10  ? `0${date_initial.getDate()}` : date_initial.getDate()
        const month_ini = date_initial.getMonth() < 10  ? `0${date_initial.getMonth()+1}` : date_initial.getMonth()
        const dia_fini = date_final.getDate() < 10  ? `0${date_final.getDate()}` :date_final.getDate()
        const month_fini = date_final.getMonth() < 10  ? `0${date_final.getMonth()+1}` : date_final.getMonth()
        // const year_ini = date_initial.getFullYear().toString().slice(2)
        // const year_final = date_final.getFullYear().toString().slice(2)
        // console.log(str)
        const initial = `${dia_ini}-${month_ini}-${date_initial.getFullYear()}`
        const final = `${dia_fini}-${month_fini}-${date_final.getFullYear()}`
        console.log(initial)
        props.handleData({"initial": initial, "final": final })

        const code: any[] = []
        companyCode.map((map) =>{
            operatingCompanies.map((com) => {
                if(map === com.name){
                    code.push(com.company_code)
                }
                return com
                

            })
            return map
        })

        dispatch(getDetailsReportsIncomeRequest(
            {
                location_id,
                operator_id,
                summary_criterias,
                initial_date: `${date_initial.getFullYear()}-${month_ini}-${dia_ini}`,
                final_date: `${date_final.getFullYear()}-${month_fini}-${dia_fini}`,
                company_code: ["1008020200002"],  //  code,
                node_type,
                node_code,
                criteria,
                resume_criteria,
                // export_format: "html",
                // report: "sales",

            }
        ))
        console.log("handleViewTabl form e")
        props.handleView()
    }

    React.useEffect(() => {
        // if(isSummaryrCiterias)
        console.log(isSummaryrCiterias)
            if(isSummaryrCiterias === 'by_location'){
                setValue('operator_id', '', {shouldValidate:true})
                setValue('node_type', '', {shouldValidate:true})
                setValue('node_code', '', {shouldValidate:true})
            }
            if(isSummaryrCiterias === 'by_operator'){
                setValue('location_id', "", {shouldValidate:true})
                setValue('node_type', '', {shouldValidate:true})
                setValue('node_code', '', {shouldValidate:true})
            }
            if(isSummaryrCiterias === 'by_equipment'){
                setValue('location_id', "", {shouldValidate:true})
                setValue('operator_id', '', {shouldValidate:true})
            }
        // }
    }, [isSummaryrCiterias, setValue])

    // React.useEffect(() => {
    //     dispatch(getCompaniesRequest())
    //     dispatch(getNodeRequest())
    //     dispatch(getNodeTypeRequest())
    //     // dispatch(getUsersRequest())
    //     // dispatch(getStopsRequest())
    // }, [])

    return (
        <>
            <Grid item sx={{ height: 60 }} xs={12}>
                <Typography variant="h3">Gestion de detalles por consolidados</Typography>
            </Grid>
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
                                md={6}
                                className={classes.searchControl}
                            >
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Stack spacing={3}>
                                        <DesktopDatePicker
                                        {...field}
                                        label="Fecha de inicio"
                                        inputFormat="yyyy/MM/dd"
                                        value={initialDate}
                                        onChange={handleChangeInitialDate}
                                        renderInput={(params) => <TextField {...params}
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            error={!!errors.initial_date}
                                            helperText={errors.initial_date?.message}
                                            disabled={!!!readOnly} />}
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
                                md={6}
                                className={classes.searchControl}
                            >
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Stack spacing={3}>
                                        <DesktopDatePicker
                                        {...field}
                                        label="Fecha de cierre"
                                        inputFormat="yyyy/MM/dd"
                                        value={finishDate}
                                        onChange={handleChangeFinishDate}
                                        renderInput={(params) => <TextField {...params}
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            error={!!errors.final_date}
                                            helperText={errors.final_date?.message}
                                            disabled={!!!readOnly} />}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                            </Grid>
                        )}
                    />
                     <Controller
                        name="summary_criterias"
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
                                    label="Tipos de consolidados"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.summary_criterias}
                                    helperText={errors.summary_criterias?.message}
                                    disabled={!!!readOnly}
                                    onChange={handleChangeSummaryCriterias}
                                >
                                    {SUMMARYCRITERIAS.map((option) => (
                                        <MenuItem
                                            key={option.criteria}
                                            value={option.criteria}
                                        >
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        )}
                    />

                    <Controller
                        name="company_code"
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
                                    label="Código de compañia"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.company_code}
                                    helperText={errors.company_code?.message}
                                    disabled={!!!readOnly}
                                    SelectProps={{
                                        multiple:true,
                                        value:companyCode,
                                        onChange:handleChange,
                                        MenuProps:MenuProps,
                                        variant: 'standard',
                                        renderValue:(selected) => handleBox(selected),
                                        // className={{classes.icon}}
                                        classes:{
                                            icon: classes.SelectIcon
                                        }
                                    
                                        
                                    }}
                                >
                                    {operatingCompanies.map((option) => (
                                        <MenuItem
                                            key={option.name}
                                            value={option.name}
                                            style={getStyles(option.name, companyCode, theme)}
                                        >
                                            {option.name}
                                        </MenuItem>
                                    ))} 
                                </TextField>
                            </Grid>
                        )}
                    />
                    {isSummaryrCiterias === 'by_equipment' &&
                        <>
                            <Controller
                                name="node_type"
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
                                            label="Tipo de equipos"
                                            size="small"
                                            autoComplete="off"
                                            {...field}
                                            error={!!errors.node_type}
                                            helperText={errors.node_type?.message}
                                            disabled={!!!readOnly}
                                        >
                                            <MenuItem
                                                    key="__all__"
                                                    value="__all__"
                                                >
                                                    {'Todos'}
                                                </MenuItem>
                                            {nodeType.map((option) => (
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
                                name="node_code"
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
                                            label="Equipo"
                                            size="small"
                                            autoComplete="off"
                                            {...field}
                                            error={!!errors.node_code}
                                            helperText={errors.node_code?.message}
                                            disabled={!!!readOnly}
                                        >
                                            <MenuItem
                                                    key="__all__"
                                                    value="__all__"
                                                >
                                                    {'Todos'}
                                                </MenuItem>
                                            {node.map((option) => (
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
                        </>
                    }
                    { isSummaryrCiterias === 'by_location' && 
                        <>
                            <Controller
                                name="location_id"
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
                                            label="Estacion, Parada o Terminal"
                                            size="small"
                                            autoComplete="off"
                                            {...field}
                                            error={!!errors.location_id}
                                            helperText={errors.location_id?.message}
                                            disabled={!!!readOnly}
                                        >
                                            {location.map((option) => (
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
                        </>
                    }
                    {isSummaryrCiterias === 'by_operator' && 
                        <>
                            <Controller
                                name="operator_id"
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
                                            label="Operador de venta"
                                            size="small"
                                            autoComplete="off"
                                            {...field}
                                            error={!!errors.operator_id}
                                            helperText={errors.operator_id?.message}
                                            disabled={!!!readOnly}
                                        >
                                            {user.map((option) => (
                                                <MenuItem
                                                    key={option.operator_card}
                                                    value={option.operator_card}
                                                >
                                                    {`${option.first_name} ${option.last_name}` }
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                )}
                            />
                        </>
                    }
                   
                    <Controller
                        name="criteria"
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
                                    label="Criterio de consolidacion"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.criteria}
                                    helperText={errors.criteria?.message}
                                    disabled={!!!readOnly}
                                >
                                    {consolidate_criteria.map((option) => (
                                        <MenuItem
                                            key={option.criteria}
                                            value={option.criteria }
                                        >
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        )}
                    />
                    <Controller
                        name="resume_criteria"
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
                                    label="Criterio de agrupacion"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.resume_criteria}
                                    helperText={errors.resume_criteria?.message}
                                    disabled={!!!readOnly}
                                >
                                    {time_criteria.map((option) => (
                                        <MenuItem
                                            key={option.criteria}
                                            value={option.criteria}
                                        >
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        )}
                    />
                     {/* <Controller
                        name="export_format"
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
                                    label="Formato de salida"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.export_format}
                                    helperText={errors.export_format?.message}
                                    disabled={!!!readOnly}
                                >
                                    {report_format.map((option) => (
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
                </Grid>
                <CardActions>
                    <Grid
                        container
                        justifyContent="flex-end"
                        spacing={0}
                        sx={{ marginTop: '10px' }}
                    >
                        {readOnly ? <>
                                <Grid item>
                                    <AnimateButton>
                                        <Button
                                            variant="contained"
                                            size="medium"
                                            type="submit"
                                            //disabled={rea}
                                        >
                                            Crear Reporte
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </> : null
                        }
                    </Grid>
                </CardActions>
            </form>
        </>
    )
}

export default DetailsIncomeReportsForm
