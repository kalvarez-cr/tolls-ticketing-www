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
    // FormControlLabel,
    // Checkbox,
    CardActions,
    Divider,
    // FormHelperText,
    // Switch,
    // MenuItem,
} from '@material-ui/core'
import AnimateButton from 'ui-component/extended/AnimateButton'

import { useDispatch } from 'react-redux'
// project imports
import { gridSpacing } from 'store/constant'
import { addTolls, updateTolls } from 'store/tolls/tollsActions'

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
    category: string
    name: string
    description: string
    abbreviation: string
    allowed_media: Array<string>
    is_ticket_allowed: boolean
    web_rechargable: boolean
    allowed_actions: Array<string>
}
//schema validation
const Schema = yup.object().shape({
    category: yup
        .string()
        .required('Este campo es requerido')
        .min(1, 'Minimo 2 caracterers')
        .max(2, 'Maximo 2 caracteres'),

    name: yup
        .string()
        .required('Este campo es requerido')
        .min(3, 'Mínimo 3 caracteres')
        .max(50, 'Máximo 50 caracteres'),

    description: yup.string().required('Este campo es requerido'),

    // allowed_media: yup
    //     .array()
    //     .required('Debe seleccionar al menos un soporte'),

    is_ticket_allowed: yup.boolean(),
    //.required('Este campo es requerido'),

    web_rechargable: yup.boolean(),
    //.required('Este campo es requerido'),

    // allowed_actions: yup
    //     .array()
    //     .required('Debes seleccionar al menos una accion'),

    abbreviation: yup.string().required('Este campo es requerido'),
    // .min(4)
    // .max(6),
})
// ==============================|| COMPANY PROFILE FORM ||============================== //
interface CompanyProfileFormProps {
    tollIdParam?: string
    readOnly?: boolean
    onlyView?: boolean
    setTabValue?: any
    tollData?: any
}

const LineForm = ({
    tollIdParam,
    readOnly,
    setTabValue,
    tollData,
}: CompanyProfileFormProps) => {
    // CUSTOMS HOOKS
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()

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

    // FUNCTIONS
    // const optionsCompanies = companies.map((company) => {
    //     return {
    //         label: company.name,
    //         value: company.company_code,
    //     }
    // })

    const onInvalid: SubmitErrorHandler<Inputs> = (data, e) => {}
    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        const { name } = data
        if (!editable) {
            const _id = uuidv4()
            dispatch(
                addTolls({
                    _id,
                    name,
                })
            )
            navigate(`/peajes/editar/${_id}`)
        }
        if (editable) {
            dispatch(
                updateTolls({
                    id: tollIdParam,
                    name,
                })
            )
        }
    }

    const handleAbleToEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
    }

    const handleCancelEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)

        setValue('category', tollData?.category, {
            shouldValidate: true,
        })
        setValue('name', tollData?.name, {
            shouldValidate: true,
        })
        setValue('description', tollData?.description, {
            shouldValidate: true,
        })
        setValue('is_ticket_allowed', tollData?.is_ticket_allowed, {
            shouldValidate: true,
        })
        setValue('web_rechargable', tollData?.web_rechargable, {
            shouldValidate: true,
        })
        setValue('allowed_media', tollData?.allowed_media, {
            shouldValidate: true,
        })
        setValue('allowed_actions', tollData?.allowed_actions, {
            shouldValidate: true,
        })
        setValue('abbreviation', tollData?.abbreviation, {
            shouldValidate: true,
        })
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
                            name="category"
                            control={control}
                            defaultValue={tollData?.category || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Código"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.category}
                                    helperText={errors.category?.message}
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
                            defaultValue={tollData?.name || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Tipo de Tarjeta"
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
                            name="description"
                            control={control}
                            defaultValue={tollData?.description || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Descripción"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.description}
                                    helperText={errors.description?.message}
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
                            defaultValue={tollData?.abbreviation || ''}
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
                            name="category"
                            control={control}
                            defaultValue={tollData?.category || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Código"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.category}
                                    helperText={errors.category?.message}
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
                            defaultValue={tollData?.name || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Tipo de Tarjeta"
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
                            name="description"
                            control={control}
                            defaultValue={tollData?.description || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Descripción"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.description}
                                    helperText={errors.description?.message}
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
                            defaultValue={tollData?.abbreviation || ''}
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
