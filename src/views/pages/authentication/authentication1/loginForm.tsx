import React from 'react'
import * as yup from 'yup'
// import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
// import { v4 as uuidv4 } from 'uuid'
import {
    useForm,
    SubmitHandler,
    Controller,
    SubmitErrorHandler,
} from 'react-hook-form'

// Redux
import { useDispatch } from 'react-redux'

// material-ui
import { makeStyles } from '@material-ui/styles'
import {
    Grid,
    Button,
    TextField,
    Theme,
    IconButton,
    // Typography,
    Link,
    Box,
    // CardActions,
    // Divider,
    // FormHelperText,
    // Switch,
    // MenuItem,
} from '@material-ui/core'
import AnimateButton from 'ui-component/extended/AnimateButton'

// project imports
import { gridSpacing } from 'store/constant'

//Icons
// import { DefaultRootStateProps, TCardsProps } from 'types'
import { getLoginRequest } from 'store/login/loginActions'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Visibility from '@material-ui/icons/Visibility'
import { useNavigate } from 'react-router'

// CONSTANTS

// style constant
const useStyles = makeStyles((theme: Theme) => ({
    alertIcon: {
        height: '16px',
        width: '16px',
        verticalAlign: 'text-bottom',
        marginTop: '15px',
    },
    userAvatar: {
        height: '80px',
        width: '80px',
    },
    searchControl: {
        '& input': {
            background: 'transparent !important',
        },
        '& .Mui-focused input': {
            boxShadow: 'none',
        },
    },
    ButtonControl: {
        width: '100%',
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
    show: {
        display: 'none',
    },
}))

//types form
interface Inputs {
    username: string
    password: string
    company_code: string
    node_type: string
    node_code: string
}
//schema validation
const Schema = yup.object().shape({
    username: yup.string().max(255).required('Usuario es requerido'),
    password: yup.string().max(255).required('Password is required'),
})

const isProd = process.env.NODE_ENV === 'production'

const initialValues = {
    username: isProd ? '' : 'rse_user',
    password: isProd ? '' : 'rse_user',
}

// ==============================|| login PROFILE FORM ||============================== //

const LoginForm = (props: { login?: number }, { ...others }) => {
    // CUSTOMS HOOKS
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {
        handleSubmit,
        control,
        formState: { errors },
        // setValue,
        // getValues,
    } = useForm<Inputs>({
        resolver: yupResolver(Schema),
    })

    // STATES
    // const scriptedRef = useScriptRef();
    const [items] = React.useState(initialValues)
    const [showPassword, setShowPassword] = React.useState(false)
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    // const handleRegister = () => {
    //     navigate('/register')
    // }
    const handleRecover = () => {
        navigate('/recover')
    }

    const handleMouseDownPassword = (event: React.SyntheticEvent) => {
        event.preventDefault()
    }

    const onInvalid: SubmitErrorHandler<Inputs> = (data, e) => {
        console.log('onInvalied', data)
        if (!data.username || !data.password) return
        return data
    }
    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        const { username, password } = data
        dispatch(
            getLoginRequest({
                username,
                password,
            })
        )
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
                            name="username"
                            control={control}
                            defaultValue={items.username || ''}
                            // defaultValue= {''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Usuario"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.username}
                                    helperText={errors.username?.message}
                                    disabled={false}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} className={classes.show}>
                        <Controller
                            name="company_code"
                            control={control}
                            // defaultValue={items.username || ''}
                            // defaultValue= {''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Usuario"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.company_code}
                                    helperText={errors.company_code?.message}
                                    disabled={true}
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
                        className={classes.show}
                    >
                        <Controller
                            name="node_type"
                            control={control}
                            // defaultValue={items.username || ''}
                            // defaultValue= {''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Usuario"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.node_type}
                                    helperText={errors.node_type?.message}
                                    disabled={true}
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
                        className={classes.show}
                    >
                        <Controller
                            name="node_code"
                            control={control}
                            // defaultValue={items.username || ''}
                            // defaultValue= {''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Usuario"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.node_code}
                                    helperText={errors.node_code?.message}
                                    disabled={true}
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
                            name="password"
                            control={control}
                            defaultValue={items.password || ''}
                            // defaultValue={''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Contraseña"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
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

                    <Box component="span" className="w-full text-center mt-4">
                        {/* <FormControlLabel
                            sx={{ marginTop: '10px' }}
                            style={{ marginRight: 100 }}
                            control={
                                <Checkbox
                                    checked={checked}
                                    onChange={(event) =>
                                        setChecked(event.target.checked)
                                    }
                                    name="allowed_media"
                                    color="primary"
                                    value={checked}
                                    disabled={false}
                                />
                            }
                            label={'Remember me'}
                        /> */}

                        <Link
                            style={{
                                marginTop: 10,
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}
                            underline="none"
                            onClick={handleRecover}
                            variant="body2"
                        >
                            <Button
                                className=""
                                // variant="contained"
                                size="small"
                                // type="submit"
                                sx={{
                                    textTransform: 'none',
                                }}
                            >
                                ¿Olvidaste tu contraseña?
                            </Button>
                        </Link>
                    </Box>
                    <Grid item xs={12}>
                        <AnimateButton>
                            <Button
                                className="w-full"
                                variant="contained"
                                size="large"
                                type="submit"
                            >
                                Iniciar sesión
                            </Button>
                        </AnimateButton>
                    </Grid>
                    {/* <Grid item xs={12}>
                        <Button
                            onClick={handleRegister}
                            className="w-full"
                            // variant="contained"
                            size="large"
                            // type="submit"
                        >
                            Crear usuario
                        </Button>
                    </Grid> */}
                </Grid>
            </form>
        </>
    )
}
export default LoginForm
