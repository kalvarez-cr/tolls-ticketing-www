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
    FormControlLabel,
    Switch,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import AnimateButton from 'ui-component/extended/AnimateButton'
// import ErrorTwoToneIcon from '@material-ui/icons/ErrorTwoTone'
// import UploadTwoToneIcon from '@material-ui/icons/UploadTwoTone'
// import Avatar from 'ui-component/extended/Avatar'
// import { gridSpacing } from 'store/constant'

import TextField from '@mui/material/TextField'
// import { useDispatch, useSelector } from 'react-redux'
// import { DefaultRootStateProps } from 'types'

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
    number_ejes: string
    weight: string
    type_vehicle: string
    number_document: number
    active: boolean
}

const Schema = yup.object().shape({
    number_ejes: yup.string().required('Este campo es obligatorio'),
    weight: yup.number().required('Este campo es obligatorio'),
    type_vehicle: yup.string().required('Este campo es obligatorio'),
    number_document: yup.string().required('Este campo es obligatorio'),
    active: yup.boolean(),
})

interface FleetProfileProps {
    fleetId?: string
    readOnly?: boolean
    onlyView?: boolean
}

const FareProfile = ({ fleetId, onlyView, readOnly }: FleetProfileProps) => {
    const classes = useStyles()
    // const dispatch = useDispatch()

    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm<Inputs>({
        resolver: yupResolver(Schema),
    })

    const [readOnlyState, setReadOnlyState] = React.useState<
        boolean | undefined
    >(readOnly)

    const [editable, setEditable] = React.useState<boolean>(false)

    const [usedTitle, setUsedTitle] = React.useState<boolean>(true)

    // const [dataUser, setDataUser] = React.useState<any>([])

    const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name

        if (name === 'active') {
            setUsedTitle(!usedTitle)
            setValue(name, !usedTitle)
        }
    }

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

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data)
    }

    return (
        <>
            <Grid item xs={12}>
                <Typography variant="h4">Nueva categoría</Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2} alignItems="center">
                    {/* <Grid item>
                        <Avatar
                            alt="logo de la empresa"
                            className={classes.userAvatar}
                        />
                    </Grid> */}
                    <Grid item sm zeroMinWidth></Grid>
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
                        name="type_vehicle"
                        control={control}
                        // defaultValue={fleetData?.plate}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    select
                                    fullWidth
                                    label="Tipo de vehiculo"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    disabled={readOnlyState}
                                    error={!!errors.type_vehicle}
                                    helperText={errors.type_vehicle?.message}
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
                        name="number_ejes"
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
                                    label="cantidad de ejes asociados"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.number_ejes}
                                    helperText={errors.number_ejes?.message}
                                    disabled={readOnlyState}
                                />
                            </Grid>
                        )}
                    />
                    <Controller
                        name="weight"
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
                                    label="Peso del vehiculo"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    disabled={readOnlyState}
                                    error={!!errors.weight}
                                    helperText={errors.weight?.message}
                                />
                            </Grid>
                        )}
                    />

                    <Controller
                        name="active"
                        control={control}
                        render={({ field }) => (
                            <FormControlLabel
                                {...field}
                                value={usedTitle || ''}
                                name="active"
                                control={
                                    <Switch
                                        color="primary"
                                        onChange={handleSwitch}
                                        value={usedTitle}
                                        checked={usedTitle}
                                        disabled={readOnlyState}
                                    />
                                }
                                label="Activo"
                                labelPlacement="start"
                            />
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
                                            Aceptar
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

export default FareProfile
