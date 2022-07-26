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
    // Link,
    // Box,
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
// import { useNavigate } from 'react-router'

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
    password: yup.string().max(255).required('Contraseña es requerida'),
})

const isProd = process.env.NODE_ENV === 'production'

const initialValues = {
    username: isProd ? '' : 'fontur',
    password: isProd ? '' : '+Fon2022tur+',
}

// ==============================|| login PROFILE FORM ||============================== //

const LoginForm = (props: { login?: number }, { ...others }) => {
    // CUSTOMS HOOKS
    const classes = useStyles()
    const dispatch = useDispatch()
    // const navigate = useNavigate()
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
    const [loading, setLoading] = React.useState(false)

    // const handleRegister = () => {
    //     navigate('/register')
    // }
    // const handleRecover = () => {
    //     navigate('/recover')
    // }

    const handleMouseDownPassword = (event: React.SyntheticEvent) => {
        event.preventDefault()
    }

    const onInvalid: SubmitErrorHandler<Inputs> = (data, e) => {
        if (!data.username || !data.password) return
        return data
    }
    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
        const { username, password } = data

        const fetchData = async () => {
            setLoading(true)
            const responseData2 = await dispatch(
                getLoginRequest({
                    username,
                    password,
                })
            )

            setLoading(false)
            return responseData2
        }

        const responseData1 = await fetchData()
        if (responseData1) {
            console.log(responseData1)
        }
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

                    {/* <Box component="span" className="w-full text-center mt-4">
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
                    {/* 
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
                    </Box>  */}
                    <Grid item xs={12} sx={{ marginTop: '35px' }}>
                        <AnimateButton>
                            <Button
                                disableElevation
                                className="w-full"
                                variant="contained"
                                size="large"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <svg
                                            role="status"
                                            className="inline w-4 h-4 mr-3 text-white animate-spin"
                                            viewBox="0 0 100 101"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                fill="#E5E7EB"
                                            />
                                            <path
                                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                        Cargando...
                                    </>
                                ) : (
                                    <>Iniciar sesión</>
                                )}
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
