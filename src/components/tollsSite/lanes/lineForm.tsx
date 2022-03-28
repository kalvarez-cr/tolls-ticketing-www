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
} from '@material-ui/core'
import AnimateButton from 'ui-component/extended/AnimateButton'

import { useDispatch, useSelector } from 'react-redux'
// project imports
import { gridSpacing } from 'store/constant'
import { addTolls, updateTolls } from 'store/tolls/tollsActions'
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
    address: string
    state: string
    active: boolean
}
//schema validation
const Schema = yup.object().shape({
    name: yup
        .string()
        .required('Este campo es requerido')
        .min(3, 'Mínimo 3 caracteres')
        .max(50, 'Máximo 50 caracteres'),
    state: yup.string().required('Este campo es requerido'),
    address: yup.string().required('Este campo es requerido'),
    active: yup.boolean(),
})
// ==============================|| COMPANY PROFILE FORM ||============================== //
interface CompanyProfileFormProps {
    tollIdParam?: string
    readOnly?: boolean
    onlyView?: boolean
    setTabValue?: any
    tollData?: any
    handleEditLanes?: () => void
    dataLane?: any
    handleTable: () => void
    add?: number
    handleCreateNew: (boo: boolean) => void
}

const LineForm = ({
    tollIdParam,
    readOnly,
    setTabValue,
    tollData,
    handleEditLanes,
    dataLane,
    handleTable,
    add,
    handleCreateNew,
}: CompanyProfileFormProps) => {
    // CUSTOMS HOOKS
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const toll = useSelector((state: DefaultRootStateProps) => state.tolls)

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

    // FUNCTIONS
    // const optionsCompanies = companies.map((company) => {
    //     return {
    //         label: company.name,
    //         value: company.company_code,
    //     }
    // })

    const onInvalid: SubmitErrorHandler<Inputs> = (data, e) => {}
    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        const { name, address, state, active } = data

        if (!editable) {
            console.log('new')
            const _id = uuidv4()
            const to = toll.find((fi) => fi._id === tollIdParam)
            const len = to?.lanes.length
            to?.lanes.push({
                _id,
                name,
                address,
                state,
                active,
            })
            dispatch(addTolls(to))
            navigate(`/peajes/editar/${tollIdParam}&&following`)
            if (len && len > 0) {
                handleCreateNew(false)
            }
        }
        if (editable) {
            const to = toll.find((fi) => fi._id === tollIdParam)
            console.log('edit to ', to)
            if (to !== undefined) {
                let t = to?.lanes.filter((fin) => fin._id !== dataLane._id)
                console.log('edit', t)
                to.lanes = t
                to.lanes.push({
                    _id: dataLane._id,
                    name,
                    address,
                    state,
                    active,
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

    const handleAbleToEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
    }
    const handleActive = () => {
        setValue('active', !active, {
            shouldValidate: true,
        })
        setActive(!active)
        // setEqualBankInfo(false)
    }

    const handleCancelEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
        setValue('name', tollData?.name, {
            shouldValidate: true,
        })
        setValue('state', tollData?.state, {
            shouldValidate: true,
        })
        setValue('address', tollData?.address, {
            shouldValidate: true,
        })
        setValue('active', tollData?.active, {
            shouldValidate: true,
        })
    }
    React.useEffect(() => {
        if (dataLane) {
            setActive(dataLane.active)
        }
    }, [dataLane])

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
                            defaultValue={dataLane?.name || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Id del canal"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
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
                            defaultValue={dataLane?.name || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="nombre"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
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
                            name="address"
                            control={control}
                            defaultValue={dataLane?.address || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Direccion"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.address}
                                    helperText={errors.address?.message}
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
                            name="state"
                            control={control}
                            defaultValue={dataLane?.state || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Ancho"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.state}
                                    helperText={errors.state?.message}
                                    disabled={readOnlyState}
                                    // onChange={(event) => handleState(event)}
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
                            name="state"
                            control={control}
                            defaultValue={dataLane?.state || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Alto"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.state}
                                    helperText={errors.state?.message}
                                    disabled={readOnlyState}
                                    // onChange={(event) => handleState(event)}
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
                                    label="Habilitado"
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

export default LineForm
