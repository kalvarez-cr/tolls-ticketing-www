import React from 'react'
import * as yup from 'yup'
// import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
// import { DefaultRootStateProps } from 'types'

//REDUX
// import { useSelector } from 'react-redux'
// import {
//     createFleetRequest,
//     updateFleetRequest,
// } from 'store/fleetCompany/FleetCompanyActions'
// material-ui
import {
    Grid,
    // TextField,
    Theme,
    Typography,
    CardActions,
    IconButton,
    Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import AnimateButton from 'ui-component/extended/AnimateButton'
// import { gridSpacing } from 'store/constant'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import TextField from '@mui/material/TextField'
import { useDispatch, useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'
import { updateAllEmployeesRequest } from 'store/employee/employeeActions'
import EditButton from 'components/buttons/EditButton'
import CancelEditButton from 'components/buttons/CancelEditButton'
import AcceptButton from 'components/buttons/AcceptButton'

const useStyles = makeStyles((theme: Theme) => ({
    searchControl: {
        width: '100%',
        '& input': {
            background: 'transparent !important',
        },
        '& .Mui-focused input': {
            boxShadow: 'none',
        },
        ' & .css-1xu5ovs-MuiInputBase-input-MuiOutlinedInput-input': {
            color: '#6473a8',
        },

        [theme.breakpoints.down('lg')]: {
            width: '250px',
        },
        [theme.breakpoints.down('md')]: {
            width: '100%',
            marginLeft: '4px',
        },
    },
}))

// ==============================|| PROFILE 1 - PROFILE ACCOUNT ||============================== //
interface Inputs {
    password: string
    password_confirm: string
}

const Schema = yup.object().shape({
    password: yup
        .string()
        .min(4, 'Mínimo 4 caracteres')
        .max(20, 'Máximo 20 caracteres')
        .required('Este campo es requerido'),
    password_confirm: yup
        .string()
        .required('Este campo es requerido')
        .oneOf([yup.ref('password')], 'Las contraseñas no coinciden'),
})

interface FleetProfileProps {
    fleetId?: string
    readOnly?: boolean
    onlyView?: boolean
}

const ProfilePassword = ({
    fleetId,
    onlyView,
    readOnly,
}: FleetProfileProps) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const {
        handleSubmit,
        control,
        formState: { errors },
        // setValue,
    } = useForm<Inputs>({
        resolver: yupResolver(Schema),
    })

    const company = useSelector(
        (state: DefaultRootStateProps) => state.login.user?.company_info?.name
    )
    const role = useSelector(
        (state: DefaultRootStateProps) => state.login.user?.role
    )
    const id = useSelector(
        (state: DefaultRootStateProps) => state.login.user?.employee_info?.id
    )

    const [readOnlyState, setReadOnlyState] = React.useState<
        boolean | undefined
    >(readOnly)

    const [editable, setEditable] = React.useState<boolean>(false)
    const [loading, setLoading] = React.useState<boolean>(false)

    const [showPassword, setShowPassword] = React.useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] =
        React.useState<boolean>(false)

    const handleAbleToEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
    }

    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const handleMouseDownPassword = (event: React.SyntheticEvent) => {
        event.preventDefault()
    }

    const handleCancelEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
        //     setValue('transportation_mean', fleetData?.transportation_mean, {
        //         shouldValidate: true,
        //     })
        //     setValue('unit_id', fleetData?.unit_id, {
        //         shouldValidate: true,
        //     })
        //     setValue('capacity', fleetData?.capacity, {
        //         shouldValidate: true,
        //     })
        //     setValue('make', fleetData?.make, {
        //         shouldValidate: true,
        //     })
        //     setValue('model', fleetData?.model, {
        //         shouldValidate: true,
        //     })
        //     setValue('plate', fleetData?.plate, {
        //         shouldValidate: true,
        //     })
        //     setValue('vin', fleetData?.vin, {
        //         shouldValidate: true,
        //     })
        //     setValue('manfucture_date', fleetData?.manfucture_date, {
        //         shouldValidate: true,
        //     })
        //     setValue('fuel_type', fleetData?.fuel_type, {
        //         shouldValidate: true,
        //     })
        //     setValue('tank_capacity', fleetData?.tank_capacity, {
        //         shouldValidate: true,
        //     })
    }

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const { password } = data
        const fetchData = async () => {
            setLoading(true)
            const responseData = await dispatch(
                updateAllEmployeesRequest({
                    id: id,
                    password,
                })
            )
            setLoading(false)
            return responseData
        }
        fetchData()
        //     const {
        //         unit_id,
        //         transportation_mean,
        //         plate,
        //         // vin,
        //         make,
        //         model,
        //         capacity,
        //         fuel_type,
        //         tank_capacity,
        //         company_code,
        //         // manfucture_date,
        //     } = data
        //     if (!editable) {
        //         dispatch(
        //             createFleetRequest({
        //                 unit_id,
        //                 transportation_mean,
        //                 plate,
        //                 make,
        //                 model,
        //                 capacity,
        //                 fuel_type,
        //                 tank_capacity,
        //                 company_code,
        //             })
        //         )
        //         navigate(`/gestion-flota/listar`)
        //     }
        //     if (editable) {
        //         dispatch(
        //             updateFleetRequest({
        //                 id: fleetId,
        //                 unit_id,
        //                 transportation_mean,
        //                 plate,
        //                 make,
        //                 model,
        //                 capacity,
        //                 fuel_type,
        //                 tank_capacity,
        //                 company_code,
        //             })
        //         )
        //         navigate('/gestion-flota/listar')
        //     }
        // }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid
                    item
                    xs={12}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h4">Detalles de usuarios</Typography>
                    {!onlyView && readOnlyState ? (
                        <Grid item sx={{ marginRight: '16px' }}>
                            <EditButton
                                loading={loading}
                                handleAbleToEdit={handleAbleToEdit}
                            />
                        </Grid>
                    ) : null}
                </Grid>

                <Grid container spacing={2} sx={{ marginTop: '5px' }}>
                    <Grid item xs={12} md={6} className={classes.searchControl}>
                        <TextField
                            fullWidth
                            disabled={true}
                            label="Empresa"
                            size="small"
                            defaultValue={company}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.searchControl}>
                        <TextField
                            fullWidth
                            label="Rol"
                            size="small"
                            disabled={true}
                            defaultValue={role}
                        />
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '25px',
                    }}
                >
                    <Typography variant="h4"> Cambio de contraseña </Typography>
                </Grid>
                <Grid container spacing={2} sx={{ marginTop: '5px' }}>
                    <Controller
                        name={'password'}
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
                                    type={showPassword ? 'text' : 'password'}
                                    fullWidth
                                    label="Contraseña"
                                    size="small"
                                    {...field}
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleShowPassword}
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
                            </Grid>
                        )}
                    />

                    <Controller
                        name={'password_confirm'}
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
                                    type={
                                        showConfirmPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    fullWidth
                                    id="outlined-basic"
                                    label="Confirmar contraseña"
                                    size="small"
                                    {...field}
                                    error={!!errors.password_confirm}
                                    helperText={
                                        errors.password_confirm?.message
                                    }
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                    handleShowConfirmPassword
                                                }
                                                onMouseDown={
                                                    handleMouseDownPassword
                                                }
                                                edge="end"
                                            >
                                                {showConfirmPassword ? (
                                                    <Visibility />
                                                ) : (
                                                    <VisibilityOff />
                                                )}
                                            </IconButton>
                                        ),
                                    }}
                                />
                            </Grid>
                        )}
                    />
                </Grid>
                <CardActions>
                    <Grid container justifyContent="flex-end" spacing={0}>
                        <Grid item>
                            {editable ? (
                                <Grid item sx={{ display: 'flex' }}>
                                    <CancelEditButton
                                        loading={loading}
                                        handleCancelEdit={handleCancelEdit}
                                    />
                                    <AcceptButton loading={loading} />
                                </Grid>
                            ) : null}
                            {readOnly ? null : (
                                <Grid item>
                                    <AnimateButton>
                                        <Button
                                            variant="contained"
                                            size="medium"
                                            type="submit"
                                            className="mt-2"
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
                                                <>Cambiar contraseña</>
                                            )}
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </CardActions>
            </form>
        </>
    )
}

export default ProfilePassword
