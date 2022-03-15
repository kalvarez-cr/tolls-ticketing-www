import React from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
// import { v4 as uuidv4 } from 'uuid'
import {
    useForm,
    SubmitHandler,
    Controller,
    SubmitErrorHandler,
} from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'
import {useDispatch,  useSelector } from 'react-redux'
// material-ui
import { makeStyles } from '@material-ui/styles'
import {
    Grid,
    Button,
    TextField,
    Theme,
    Typography,
    FormControlLabel,
    // Checkbox,
    CardActions,
    Divider,
    // FormHelperText,
    Switch,
    MenuItem,
} from '@material-ui/core'
import AnimateButton from 'ui-component/extended/AnimateButton'
import { DefaultRootStateProps } from 'types'

// project imports
import { gridSpacing } from 'store/constant'
import { addTolls, updateTolls } from 'store/tolls/tollsActions'
import {COMPANY} from '../../../_mockApis/operating_companies/create_company'
import {NODE_TYPES} from '../../../_mockApis/toll/mockToll'

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
    node: string
    company: string
    node_code: string
    node_type: string
    abbreviation:string 
    active: boolean
    location: string
    monitored: boolean
}
//schema validation
const Schema = yup.object().shape({
    node: yup.string().required('Este campo es requerido'),
    company: yup.string().required('Este campo es requerido'),
    node_code: yup.string().required('Este campo es requerido'),
    node_type: yup.string().required('Este campo es requerido'),
    abbreviation: yup.string().required('Este campo es requerido'),
    active: yup.boolean(),
    location: yup.string().required('Este campo es requerido'),
    monitored: yup.boolean()
})
// ==============================|| COMPANY PROFILE FORM ||============================== //
interface CompanyProfileFormProps {
    tollIdParam?: string
    readOnly?: boolean
    onlyView?: boolean
    setTabValue?: any
    handleReturn?: () => void
    dataEquip?:any
    handleTable: () => void
    handleCreateNew:(boo:boolean)=> void
}

const EquipsForm = ({
    tollIdParam,
    readOnly,
    setTabValue,
    handleReturn,
    dataEquip,
    handleTable,
    handleCreateNew,
}: CompanyProfileFormProps) => {
    // CUSTOMS HOOKS
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const toll = useSelector((state: DefaultRootStateProps) =>  state.tolls)

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
    const [active, setActive] = React.useState<boolean>(false)
    const [monitored, setMonitored] = React.useState<boolean>(false)

    // FUNCTIONS
    // const optionsCompanies = companies.map((company) => {
    //     return {
    //         label: company.name,
    //         value: company.company_code,
    //     }
    // })

    const onInvalid: SubmitErrorHandler<Inputs> = (data, e) => {
        console.log("onInvalid",data)
    }
    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        const { 
            node,
            company,
            node_code,
            node_type,
            abbreviation,
            location,
            active,
            monitored
        
        } = data
        if(!editable) {

            const _id = uuidv4()

            const to = toll.find((fi)=> fi._id === tollIdParam)
            const len = to?.lanes.length 
            console.log("adentro")
            to?.equips.push({
                _id,
                node,
                company,
                node_code,
                node_type,
                abbreviation,
                active,
                location,
                monitored,
                
            })
            dispatch(
                addTolls(to)
            )
            navigate(`/peajes/editar/${tollIdParam}&&following`)
            if(len && len > 0 ){

                handleCreateNew(false)
            }
        }
        if (editable) {
            console.log(tollIdParam)
            const to = toll.find((fi)=> fi._id === tollIdParam)
            console.log("edit to ",to)
            if( to !== undefined ) {
                let t = to?.equips.filter((fin) => fin._id !== dataEquip._id)
                console.log("datEquip", dataEquip)
                console.log("edit",t) 
                to.equips = t 
                to.equips.push({
                    _id:dataEquip._id,
                    node,
                    company,
                    node_code,
                    node_type,
                    abbreviation,
                    active: active ? active :dataEquip.active,
                    location,
                    monitored: monitored ? monitored : dataEquip.monitored,

                })
            }
            console.log(to)
            
            // to?.lanes.find()
            console.log("new")
            dispatch(
                updateTolls(to)
            )
            navigate(`/peajes/editar/${tollIdParam}`)
            handleTable()
        }
    }

    const handleAbleToEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
    }
    const handleActive = () => {
        setValue('active', !active, {
            shouldValidate: true,
        })
        setActive(!active)
    }
    const handleMonitored = () => {
        setValue('monitored', !monitored, {
            shouldValidate: true,
        })
        setMonitored(!monitored)
    }

    const handleCancelEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)

        setValue('node', dataEquip?.node, {
            shouldValidate: true,
        })
        setValue('company', dataEquip?.company, {
            shouldValidate: true,
        })
        setValue('node_code', dataEquip?.node_code, {
            shouldValidate: true,
        })
        setValue('node_type', dataEquip?.node_type, {
            shouldValidate: true,
        })
        setValue('active', dataEquip?.active, {
            shouldValidate: true,
        })
        setValue('location', dataEquip?.location, {
            shouldValidate: true,
        })
        setValue('monitored', dataEquip?.monitored, {
            shouldValidate: true,
        })
        setValue('abbreviation', dataEquip?.abbreviation, {
            shouldValidate: true,
        })
    }

    // EFFECTS
    // VALIDATE CHECKS BOX

    React.useEffect(()=>{
        if(dataEquip){
            setActive(dataEquip.active)
            setMonitored(dataEquip.monitored)
        }

    },[dataEquip])

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
                <Typography variant="h4"> Datos de canales </Typography>
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
                <Controller
                    name="company"
                    control={control}
                    rules={{ required: true }}
                    defaultValue={dataEquip?.company || ""}
                    render={({ field }) => (
                        <Grid
                            item
                            xs={12}
                            md={6}
                            className={classes.searchControl}
                        >
                            <TextField
                                select
                                label="Compañia"
                                fullWidth
                                size="small"
                                {...field}
                                error={!!errors.company}
                                helperText={errors.company?.message}
                                disabled={readOnlyState}
                            >
                                {COMPANY.map((option) => (
                                    <MenuItem
                                        key={option.company_code}
                                        value={option.company_code}
                                    >
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    )}
                />
                <Controller
                    name="node_type"
                    control={control}
                    rules={{ required: true }}
                    defaultValue={dataEquip?.node_type || ""}
                    render={({ field }) => (
                        <Grid
                            item
                            xs={12}
                            md={6}
                            className={classes.searchControl}
                        >
                            <TextField
                                select
                                label="Tipo de equipo"
                                fullWidth
                                size="small"
                                {...field}
                                error={!!errors.node_type}
                                helperText={errors.node_type?.message}
                                disabled={readOnlyState}
                            >
                                {NODE_TYPES.map((option) => (
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
                        md={6}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="node_code"
                            control={control}
                            defaultValue={dataEquip?.node_code || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Codeigo del equipo"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.node_code}
                                    helperText={errors.node_code?.message}
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
                            name="node"
                            control={control}
                            defaultValue={dataEquip?.node || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Nombre del nodo"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.node}
                                    helperText={errors.node?.message}
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
                            defaultValue={dataEquip?.abbreviation || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Abreviatura"
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
                            name="location"
                            control={control}
                            defaultValue={dataEquip?.location || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Ubicacion"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.location}
                                    helperText={errors.location?.message}
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
                                    label="Estatus"
                                    labelPlacement="start"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <Controller
                            name="monitored"
                            control={control}
                            render={({ field }) => (
                                <FormControlLabel
                                    {...field}
                                    value="top"
                                    name="monitored"
                                    control={
                                        <Switch
                                            color="primary"
                                            onChange={handleMonitored}
                                            checked={monitored}
                                            disabled={readOnlyState}
                                        />
                                    }
                                    label="Monitorizable"
                                    labelPlacement="start"
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
                                        Siguiente
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

export default EquipsForm
