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

import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
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

// project imports
import { gridSpacing } from 'store/constant'
import { NODE_TYPES } from '../../../_mockApis/toll/mockToll'
// import { getTollsALLRequest } from 'store/toll/tollActions'
import { DefaultRootStateProps, TEquips } from 'types'
import { onKeyDown } from 'components/utils'
import { createEquipRequest, updateEquipRequest } from 'store/tolls/equip/equipTollAction'

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
    name: string
    node_code: string
    node_type: string
    active: boolean
    monitored: boolean
   
    phone_number: string
}
//schema validation
const Schema = yup.object().shape({
    name: yup.string().required('Este campo es requerido'),
    node_code: yup
        .string()
        .min(5, 'Debe tener mínimo 5 caracteres')
        .max(25, 'Debe tener máximo 25 caracteres')
        .required('Este campo es requerido'),
    node_type: yup.string().required('Este campo es requerido'),
    active: yup.boolean(),
    // company: yup.string().(required'Este campo es requerido'),
    monitored: yup.boolean(),
   
    phone_number: yup
        .string()
        .min(11, 'Mínimo 11 carácteres')
        .max(20, 'Máximo 20 carácteres')
        .required('Este campo es requerido'),
})
// ==============================|| COMPANY PROFILE FORM ||============================== //
interface CompanyProfileFormProps {
    tollIdParam?: string
    readOnly?: boolean
    onlyView?: boolean
    setTabValue?: any
    handleReturn?: () => void
    dataEquip?: any
    equips?: any
    handleTable: () => void
    handleCreateNew: (boo: boolean) => void
    setEditEquip?: any
    setNeww?: any
}

const EquipsForm = ({
    tollIdParam,
    readOnly,
    setTabValue,
    handleReturn,
    dataEquip,
    handleTable,
    handleCreateNew,
    equips,
    setEditEquip,
    setNeww,
}: CompanyProfileFormProps) => {
    // CUSTOMS HOOKS
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const { id } = useParams()
    const company = useSelector(
        (state: DefaultRootStateProps) => state.login.user?.company_info?.id
    )
  
    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,

        // getValues,
    } = useForm<Inputs>({
        resolver: yupResolver(Schema),
        mode: 'onChange',
    })
    // STATES
    const [readOnlyState, setReadOnlyState] = React.useState<
        boolean | undefined
    >(readOnly)
    const [editable, setEditable] = React.useState<boolean>(false)
    const role = useSelector(
        (state: DefaultRootStateProps) => state.login?.user?.role
    )
    const [equipData] = React.useState<TEquips | any>(
        readOnlyState ? dataEquip : []
    )

    const [active, setActive] = React.useState<boolean>(
        readOnly ? !!equipData?.active : true
    )
    const [monitored, setMonitored] = React.useState<boolean>(
        readOnly ? !!equipData?.monitored : true
    )

    const onInvalid: SubmitErrorHandler<Inputs> = (data, e) => {
        console.log('onInvalid', data)
    }
    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        const {
            name,
            node_code,
            node_type,
            active,
            monitored,
           
            phone_number,
        } = data
        if (!editable) {
            dispatch(
                createEquipRequest({
                    name,
                    node_code,
                    node_type,
                    active: active,
                    monitored: monitored,
                    parent_site: equips.id,
                    company: company,
                    phone_1: phone_number,
                    is_deleted: false,
                })
            )
            // dispatch(getTollsALLRequest(id))
            navigate(`/peajes/editar/${tollIdParam}`)
            handleReturnTable()

            handleCreateNew(false)
        }
        if (editable) {
            dispatch(
                updateEquipRequest({
                    id: dataEquip.id,
                    name,
                    node_code,
                    node_type,
                    active: active,
                    monitored: monitored,
                    phone_1: phone_number,
                    parent_site: equips.id,
                    company: company,
                    is_deleted: false,
                })
            )
            // dispatch(getTollsALLRequest(id))
            navigate(`/peajes/editar/${tollIdParam}`)
            handleTable()
            handleReturnTable()
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
        setValue('name', equipData?.name, {})
        setValue('node_code', equipData?.node_code, {})
        setValue('node_type', equipData?.node_type_eng, {})
        setValue('active', equipData?.active, {})
        setValue('monitored', equipData?.monitored, {})
        
        setValue('phone_number', equipData?.phone_1)
    }

    // EFFECTS
    // VALIDATE CHECKS BOX

    React.useEffect(() => {
        if (readOnlyState) {
            setValue('name', equipData?.name, {})

            setValue('node_code', equipData?.node_code, {})
            setValue('node_type', equipData?.node_type_eng, {})
            setValue('active', equipData?.active, {})
            setValue('monitored', equipData?.monitored, {})

            setValue('phone_number', equipData?.phone_1)
        }
    }, [equipData, setValue, readOnlyState])

    const handleReturnTable = () => {
        setEditEquip(false)
        setNeww(false)
    }

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
                <Typography variant="h4"> Datos de nodos </Typography>
                {readOnlyState && role !== 'visualizer' ? (
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
                        name="node_type"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    select
                                    defaultValue={equipData?.node_type_eng}
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
                                    label="Código del equipo"
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
                            name="name"
                            control={control}
                            defaultValue={dataEquip?.node || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Nombre del nodo"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                    disabled={readOnlyState}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={6} md={3}>
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
                    <Grid item xs={6} md={3}>
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
                 
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="phone_number"
                            control={control}
                            // defaultValue={equipData?.phone_1?.slice(5)}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    onKeyDown={onKeyDown}
                                    label="Teléfono"
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
                            <Grid
                                container
                                justifyContent="flex-end"
                                sx={{ marginBottom: '-45px' }}
                            >
                                <Grid item>
                                    <AnimateButton>
                                        <Button
                                            variant="contained"
                                            size="large"
                                            type="submit"
                                        >
                                            Crear equipo
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        )}
                        <Grid
                            container
                            justifyContent="space-between"
                            // spacing={0}
                            // sx={{ marginBottom: '-30px' }}
                        >
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
             
        {readOnly ? <div className="flex ">
          <div className="flex m-4">
            <h4 className="font-extrabold">Creado:</h4>
            <span className="pl-2">{new Date(
              equipData?.created_on
              ).toLocaleDateString('es-VE')}</span>
            
              <span className="pl-3 font-semibold">{equipData?.created_by}</span>
          </div>
          <div className="flex m-4">
            <h4 className="font-extrabold">Actualizado:</h4>
            <span className="pl-2">{new Date(
              equipData?.updated_on
              ).toLocaleDateString('es-VE')}</span>

              <span className="pl-3 font-semibold">{equipData?.updated_by}</span>
          </div>
        </div> : null}
            </form>
        </>
    )
}

export default EquipsForm
