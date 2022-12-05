// import React from 'react'
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
    // IconButton,
    Typography,
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
            width: '250px',
        },
        [theme.breakpoints.down('md')]: {
            width: '100%',
            marginLeft: '4px',
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
    // send: {
    //     '&.css-tq50a2-MuiButtonBase-root-MuiButton-root:hover': {
    //         color: 'none',
    //     },
    // },
}))

//types form
interface Inputs {
    email: string
}
//schema validation
const Schema = yup.object().shape({
    email: yup.string().max(255).required('Email es requerido'),
})
// const initialValues = {
//     username: 'user4',
//     password: 'user4',
// }

// ==============================|| login PROFILE FORM ||============================== //

const RecoverForm = (props: { login?: number }, { ...others }) => {
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
    // const scriptedRef = useScriptRef();
    // const [items] = React.useState(initialValues)

    const onInvalid: SubmitErrorHandler<Inputs> = (data, e) => {
        console.log('onInvalied', data)
        // if (!data.username || !data.password) return
        return data
    }
    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        const { email } = data
        console.log(email)
        window.location.reload()
    }

    const handleLogin = () => {
        navigate('/login')
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
                            // defaultValue={}
                            // defaultValue= {''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Correo   "
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    disabled={false}
                                />
                            )}
                        />
                    </Grid>
                    <Grid style={{ marginTop: 20, alignItems: 'center' }}>
                        <Typography
                            style={{ marginLeft: 120 }}
                            color="textPrimary"
                            gutterBottom
                            variant="h5"
                        >
                            Por favor ingrese su correo
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <AnimateButton>
                            <Button
                                className="w-full"
                                variant="contained"
                                size="large"
                                type="submit"
                                // className="send"
                                onClick={handleLogin}
                            >
                                Enviar
                            </Button>
                        </AnimateButton>
                    </Grid>
                </Grid>
            </form>
        </>
    )
}
export default RecoverForm
