import React from 'react'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
// import { v4 as uuidv4 } from 'uuid'
import {
    useForm,
    SubmitHandler,
    Controller,
    SubmitErrorHandler,
} from 'react-hook-form'

// Redux
// import { useDispatch } from 'react-redux'

// material-ui
import { makeStyles } from '@material-ui/styles'
import {
    Grid,
    Button,
    TextField,
    Theme,
    IconButton,
    // Typography,
    // FormControlLabel,
    // Checkbox,
    // CardActions,
    // Divider,
    // FormHelperText,
    // Switch,
    // MenuItem,
} from '@material-ui/core'
import AnimateButton from 'ui-component/extended/AnimateButton'

// project imports
import { gridSpacing } from 'store/constant'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

//Icons
// import { DefaultRootStateProps, TCardsProps } from 'types'
// import { getLoginRequest } from 'store/login/loginActions'

// CONSTANTS

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
        '& input': {
            background: 'transparent !important',
        },
        '& .Mui-focused input': {
            boxShadow: 'none',
        },
        [theme.breakpoints.down('lg')]: {
            width: '100%',
        },
        [theme.breakpoints.down('md')]: {
            width: '100%',
            // marginLeft: '4px',
        },
    },
    ButtonControl: {
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
    },
    send: {
        '&.css-tq50a2-MuiButtonBase-root-MuiButton-root:hover': {
            color: '#5d299f',
        },
    },
}))

//types form
interface Inputs {
    email: string
    name: string
    last_name: string
    identification: number
    passwordR: string
    config_password: string
}
//schema validation
const Schema = yup.object().shape({
    email: yup.string().max(255).required('Email es requerido'),
    name: yup.string().required('Este campo es requerido'),
    last_name: yup.string().required('Este campo es requerido'),
    identification: yup.string().required('Este campo es requerido'),
    passwordR: yup.string().required('Este campo es requerido'),
})

// ==============================|| login PROFILE FORM ||============================== //

const UserRegisterForm = (props: { login?: number }, { ...others }) => {
    // CUSTOMS HOOKS
    const classes = useStyles()
    const navigate = useNavigate()
    // const dispatch = useDispatch()
    const {
        handleSubmit,
        control,
        formState: { errors },
        // setValue,
        // getValues,
    } = useForm<Inputs>({
        resolver: yupResolver(Schema),

        mode: 'onChange',
    })

    // STATES
    const [showPassword, setShowPassword] = React.useState(false)
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = (event: React.SyntheticEvent) => {
        event.preventDefault()
    }
    const handleLogin = () => {
        navigate('/login')
    }

    const onInvalid: SubmitErrorHandler<Inputs> = (data, e) => {
        console.log('onInvalied', data)
        // if (!data.username || !data.password) return
        return data
    }
    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
        // const { email, name, last_name, identification, passwordR } = data
        console.log(data)
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
                <Grid container spacing={gridSpacing}>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="email"
                            control={control}
                            // defaultValue={''}
                            // defaultValue= {''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Correo"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    disabled={false}
                                />
                            )}
                        />
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        // sx={{ padding: '1%'}}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="name"
                            control={control}
                            // defaultValue= {''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Nombre"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                    disabled={false}
                                />
                            )}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        // sx={{ padding: '1%'}}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="last_name"
                            control={control}
                            // defaultValue= {''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Apellido"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.last_name}
                                    helperText={errors.last_name?.message}
                                    disabled={false}
                                />
                            )}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        // sx={{ padding: '1%'}}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="identification"
                            control={control}
                            // defaultValue= {''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Cedula de identidad"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.identification}
                                    helperText={errors.identification?.message}
                                    disabled={false}
                                />
                            )}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        // sx={{ padding: '1%'}}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="passwordR"
                            control={control}
                            // defaultValue={items.password || ''}
                            // defaultValue={''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Contraseña"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.passwordR}
                                    helperText={errors.passwordR?.message}
                                    disabled={false}
                                    type={showPassword ? 'text' : 'password'}
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                    handleClickShowPassword
                                                }
                                                onMouseDown={
                                                    handleMouseDownPassword
                                                }
                                                edge="end"
                                            >
                                                {showPassword ? (
                                                    <Visibility />
                                                ) : (
                                                    <VisibilityOff />
                                                )}
                                            </IconButton>
                                        ),
                                    }}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item md={12}>
                        <AnimateButton>
                            <Button
                                className="w-full my-2"
                                variant="contained"
                                size="large"
                                type="submit"
                            >
                                Enviar
                            </Button>
                        </AnimateButton>

                        <Grid item md={12}>
                            <Button
                                onClick={handleLogin}
                                className="w-full my-2"
                                size="large"
                                // type="submit"
                            >
                                Ya tengo cuenta
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </>
    )
}
export default UserRegisterForm
