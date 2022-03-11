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
    // MenuItem,
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
    plate: string
    active: boolean
}

const SchemaSearch = yup.object().shape({
    search: yup.string().required('Este campo es obligatorio'),
})

const Schema = yup.object().shape({
    plate: yup.string().required('Este campo es obligatorio'),
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

    const searchForm = useForm({
        resolver: yupResolver(SchemaSearch),
    })

    const [readOnlyState, setReadOnlyState] = React.useState<
        boolean | undefined
    >(readOnly)

    const [editable, setEditable] = React.useState<boolean>(false)

    const [usedTitle, setUsedTitle] = React.useState<boolean>(true)
    const [validTag, setValidTag] = React.useState(false)

    // const [dataUser, setDataUser] = React.useState<any>([])

    const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name

        if (name === 'active') {
            setUsedTitle(!usedTitle)
            setValue(name, !usedTitle)
        }
    }

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

    const handleAccept = () => {
        setValidTag(true)
        console.log(validTag)
    }

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data)
    }

    return (
        <>
            <Grid item xs={12}>
                <Typography variant="h4">Vehiculo seleccionado</Typography>
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

            <form onSubmit={searchForm.handleSubmit(onSubmit)}>
                <Grid container spacing={2} sx={{ marginTop: '5px' }}>
                    <Controller
                        name="search"
                        control={searchForm.control}
                        // defaultValue={cardsData?.description || ''}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Tag a asociar"
                                    size="small"
                                    autoComplete="off"
                                    error={!!searchForm.formState.errors.search}
                                    helperText={
                                        searchForm.formState.errors?.message
                                    }
                                    // disabled={readOnlyState}
                                />
                            </Grid>
                        )}
                    />
                    <Grid item>
                        <Button
                            // variant="contained"

                            size="small"
                            onSubmit={handleSubmit(handleAccept)}
                        >
                            Buscar
                        </Button>
                    </Grid>
                </Grid>
            </form>

            {validTag ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2} sx={{ marginTop: '5px' }}>
                        <Controller
                            name="plate"
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
                                        label="Placa del vehiculo"
                                        fullWidth
                                        size="small"
                                        autoComplete="off"
                                        {...field}
                                        error={!!errors.plate}
                                        helperText={errors.plate?.message}
                                        disabled={readOnlyState}
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
                                    sx={{
                                        marginTop: '10px',
                                        marginLeft: '25px',
                                    }}
                                    control={
                                        <Switch
                                            color="primary"
                                            onChange={handleSwitch}
                                            value={usedTitle}
                                            checked={usedTitle}
                                            disabled={readOnlyState}
                                        />
                                    }
                                    label="Activa"
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
            ) : null}
        </>
    )
}

export default FareProfile
