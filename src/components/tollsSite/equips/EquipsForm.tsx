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

import { useNavigate, useParams } from 'react-router-dom'
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
import {
    createEquipRequest,
    updateEquipRequest,
} from 'store/equip/EquipActions'
import { getTollsALLRequest } from 'store/toll/tollActions'
import { DefaultRootStateProps } from 'types'

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
}
//schema validation
const Schema = yup.object().shape({
    name: yup.string().required('Este campo es requerido'),
    node_code: yup.string().required('Este campo es requerido'),
    node_type: yup.string().required('Este campo es requerido'),
    active: yup.boolean(),
    // company: yup.string().(required'Este campo es requerido'),
    monitored: yup.boolean(),
})
// ==============================|| COMPANY PROFILE FORM ||============================== //
interface CompanyProfileFormProps {
    tollIdParam?: string
    readOnly?: boolean
    onlyView?: boolean
    setTabValue?: any
    handleReturn?: () => void
    dataEquip?: any
    tollData?: any
    handleTable: () => void
    handleCreateNew: (boo: boolean) => void
}

const EquipsForm = ({
    tollIdParam,
    readOnly,
    setTabValue,
    handleReturn,
    dataEquip,
    handleTable,
    handleCreateNew,
    tollData,
}: CompanyProfileFormProps) => {
    // CUSTOMS HOOKS
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const company = useSelector(
        (state: DefaultRootStateProps) => state.login.user?.company_info?.id
    )
    const toll = useSelector((state: DefaultRootStateProps) => state.toll)
    console.log(toll)
    console.log(tollData)
    console.log(dataEquip)

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

    const onInvalid: SubmitErrorHandler<Inputs> = (data, e) => {
        console.log('onInvalid', data)
    }
    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        const { name, node_code, node_type, active, monitored } = data
        if (!editable) {
            dispatch(
                createEquipRequest({
                    name,
                    node_code,
                    node_type,
                    active: active,
                    monitored: monitored,
                    parent_site: '626aa0bd8bcf29d8460b27c5',
                    company: company,
                })
            )
            dispatch(getTollsALLRequest(id))
            navigate(`/peajes/editar/${tollIdParam}`)

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
                    // parent_site: '626aa0bd8bcf29d8460b27c5',
                    // company: company,
                })
            )
            dispatch(getTollsALLRequest(id))
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
        setValue('name', dataEquip?.node, {})
        setValue('node_code', dataEquip?.lane_code, {})
        setValue('node_type', dataEquip?.node_type, {})
        setValue('active', dataEquip?.active, {})
        setValue('monitored', dataEquip?.monitored, {})
    }

    // EFFECTS
    // VALIDATE CHECKS BOX

    React.useEffect(() => {
        setValue('name', dataEquip?.node, {})

        setValue('node_code', dataEquip?.lane_code, {})
        setValue('node_type', dataEquip?.node_type, {})
        setValue('active', dataEquip?.active, {})
        setValue('monitored', dataEquip?.monitored, {})
    }, [dataEquip, setValue])

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
                        name="node_type"
                        control={control}
                        rules={{ required: true }}
                        // defaultValue={dataEquip?.node_type || ''}
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
                                    label="Estatus"
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
                                        Crear equipo
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
