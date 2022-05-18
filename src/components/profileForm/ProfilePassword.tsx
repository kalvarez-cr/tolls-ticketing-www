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
import { updateEmployeesRequest } from 'store/employee/employeeActions'

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

        dispatch(
            updateEmployeesRequest({
                id: id,
                password,
            })
        )
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
                    <Typography variant="h4">Cambio de contraseña</Typography>
                    {!onlyView && readOnlyState ? (
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
                                    <AnimateButton>
                                        <Button
                                            // variant="contained"
                                            size="medium"
                                            onClick={handleCancelEdit}
                                            className="mx-4"
                                            color="error"
                                        >
                                            Cancelar
                                        </Button>
                                    </AnimateButton>
                                    <AnimateButton>
                                        <Button
                                            variant="contained"
                                            size="medium"
                                            type="submit"
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
                                            size="medium"
                                            type="submit"
                                            className="mt-2"
                                        >
                                            Cambiar contraseña
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
