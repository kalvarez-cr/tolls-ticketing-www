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
    MenuItem,
    Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import AnimateButton from 'ui-component/extended/AnimateButton'
// import ErrorTwoToneIcon from '@material-ui/icons/ErrorTwoTone'
// import UploadTwoToneIcon from '@material-ui/icons/UploadTwoTone'
// import Avatar from 'ui-component/extended/Avatar'
// import { gridSpacing } from 'store/constant'

import TextField from '@mui/material/TextField'
// import { useDispatch, useSelector } from 'react-redux'

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
    input: {
        opacity: 0,
        position: 'absolute',
        zIndex: 1,
        padding: 0.5,
        cursor: 'pointer',
        width: '30%',
    },
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
    name: string
    last_name: string
    email: string
    number_phone: string
    type_document: string
    number_document: number
    used_title: boolean
    balance_title: boolean
}

const Schema = yup.object().shape({
    name: yup.string().required('Este campo es obligatorio'),
    last_name: yup.string().required('Este campo es obligatorio'),
    email: yup.string().required('Este campo es obligatorio'),
    number_phone: yup.string().required('Este campo es obligatorio'),
    type_document: yup.string().required('Este campo es obligatorio'),
    number_document: yup.string().required('Este campo es obligatorio'),
    used_title: yup.boolean(),
    balance_title: yup.boolean(),
})

interface FleetProfileProps {
    fleetId?: string
    readOnly?: boolean
    onlyView?: boolean
}

const ProfileUser = ({ fleetId, onlyView, readOnly }: FleetProfileProps) => {
    const classes = useStyles()
    // const dispatch = useDispatch()

    const {
        handleSubmit,
        control,
        formState: { errors },
        // setValue,
    } = useForm<Inputs>({
        resolver: yupResolver(Schema),
        mode: 'onChange',
    })

    const [readOnlyState, setReadOnlyState] = React.useState<
        boolean | undefined
    >(readOnly)

    const [editable, setEditable] = React.useState<boolean>(false)

    const typesDocument = [
        {
            label: 'J',
            value: 'J',
        },
        {
            label: 'V',
            value: 'V',
        },
        {
            label: 'G',
            value: 'G',
        },
        {
            label: 'E',
            value: 'E',
        },
    ]

    const handleAbleToEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
    }

    const handleCancelEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
        //     setValue('transportation_mean', fleetData?.transportation_mean, {
        //         shouldValidate: true,
    }

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data)
    }

    return (
        <>
            <Grid item xs={12}>
                <Typography variant="h4">Datos de usuario</Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    sx={{ marginTop: '5px' }}
                >
                    {/* <Grid item>
                        <Avatar
                            alt="logo de la empresa"
                            className={classes.userAvatar}
                        />
                    </Grid> */}
                    <Grid item sm zeroMinWidth>
                        {/* <Grid item xs={12}>
                            <label htmlFor="containedButtonFile">
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="containedButtonFile"
                                    multiple
                                    type="file"
                                />

                                <Button
                                    variant="outlined"
                                    size="small"
                                    startIcon={<UploadTwoToneIcon />}
                                >
                                    Cargar Imagen
                                </Button>
                            </label>
                        </Grid> */}

                        {/* <Grid item xs={12} sx={{ marginLeft: '17px' }}>
                            <Typography variant="caption">
                                <ErrorTwoToneIcon
                                    className={classes.alertIcon}
                                />
                                El tamaño de la imagen no debe pesar mas de
                                125kb max.
                            </Typography>
                        </Grid> */}
                    </Grid>
                    {!onlyView && readOnly ? (
                        <Grid item>
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
            </Grid>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2} sx={{ marginTop: '5px' }}>
                    <Controller
                        name="name"
                        control={control}
                        // defaultValue={fleetData?.unit_id}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    label="Nombres"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                    disabled={readOnlyState}
                                />
                            </Grid>
                        )}
                    />
                    <Controller
                        name="last_name"
                        control={control}
                        // defaultValue={fleetData?.transportation_mean}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    fullWidth
                                    label="Apellidos"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    disabled={readOnlyState}
                                    error={!!errors.last_name}
                                    helperText={errors.last_name?.message}
                                />
                            </Grid>
                        )}
                    />

                    <Controller
                        name="email"
                        control={control}
                        // defaultValue={fleetData?.make}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    fullWidth
                                    label="Correo electrónico"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    disabled={readOnlyState}
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />
                            </Grid>
                        )}
                    />

                    <Controller
                        name="number_phone"
                        control={control}
                        // defaultValue={fleetData?.model}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                lg={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    fullWidth
                                    label="Número de contacto"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    disabled={readOnlyState}
                                    error={!!errors.number_phone}
                                    helperText={errors.number_phone?.message}
                                />
                            </Grid>
                        )}
                    />

                    <Controller
                        name="type_document"
                        control={control}
                        // defaultValue={fleetData?.plate}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={2}
                                className={classes.searchControl}
                            >
                                <TextField
                                    select
                                    fullWidth
                                    label="V-"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    disabled={readOnlyState}
                                    error={!!errors.type_document}
                                    helperText={errors.type_document?.message}
                                >
                                    {typesDocument.map((option) => (
                                        <MenuItem
                                            key={option.label}
                                            value={option.label}
                                        >
                                            {option.value}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        )}
                    />

                    <Controller
                        name="number_document"
                        control={control}
                        // defaultValue={fleetData?.vin}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={4}
                                className={classes.searchControl}
                            >
                                <TextField
                                    label="Documento de identidad"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    disabled={readOnlyState}
                                    error={!!errors.number_document}
                                    helperText={errors.number_document?.message}
                                ></TextField>
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
                                        >
                                            Actualizar
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

export default ProfileUser
