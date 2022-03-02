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
    FormControlLabel,
    Checkbox,
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
}))

//types form
interface Inputs {
    username: string
    password: string
}
//schema validation
const Schema = yup.object().shape({
    username: yup.string().max(255).required('Usuario es requerido'),
    password: yup.string().max(255).required('Password is required'),
})
const initialValues = {
    username: 'user4',
    password: 'user4',
}

// ==============================|| login PROFILE FORM ||============================== //

const LoginForm = (props: { login?: number }, { ...others }) => {
    // CUSTOMS HOOKS
    const classes = useStyles()
    const dispatch = useDispatch()
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
    const [checked, setChecked] = React.useState(true)
    const [items] = React.useState(initialValues)
    const [showPassword, setShowPassword] = React.useState(false)
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
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

                    <Grid item xs={12} md={12}>
                        <FormControlLabel
                            // sx={{marginTop: '10px', }}
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
                        />
                    </Grid>
                    <Grid item md={12}>
                        <AnimateButton>
                            <Button
                                variant="contained"
                                size="large"
                                type="submit"
                                className="w-full"
                            >
                                Iniciar sesión
                            </Button>
                        </AnimateButton>
                    </Grid>
                </Grid>
            </form>
        </>
    )
}
export default LoginForm
