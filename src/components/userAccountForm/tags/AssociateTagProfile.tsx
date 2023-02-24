import React from 'react'
import * as yup from 'yup'
// import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
// import { DefaultRootStateProps } from 'types'

// material-ui
import {
    Grid,
    // TextField,
    Theme,
    Typography,
    CardActions,
    // MenuItem,
    Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import AnimateButton from 'ui-component/extended/AnimateButton'
import TextField from '@mui/material/TextField'

//REDUX
import { useDispatch } from 'react-redux'

// import { getCategoryRequest } from 'store/Category/CategoryActions'
import { getTagRequest } from 'store/saleTag/saleTagActions'

import { onKeyDown } from 'components/utils'
import { getCategoryRequest } from 'store/Category/CategoryActions'

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
    license_plate: string
    make?: string
    vin?: string
    model: string
    year: string
    color: string
    category: string
    axles: number
    weight: number
    tag_id: string
}

const Schema = yup.object().shape({
    license_plate: yup
        .string()
        .max(8, 'Máximo 8 caracteres')
        .required('Este campo es requerido'),
    make: yup.string().required('Este campo es requerido'),
    vin: yup
        .string()
        .min(17, 'Debe tener 17 caracteres')
        .max(17, 'Debe tener 17 caracteres')
        .required('Este campo es obligatorio'),
    model: yup.string().required('Este campo es requerido'),
    color: yup.string().required('Este campo es requerido'),
    category: yup.string().required('Este campo es requerido'),
    axles: yup
        .number()
        .typeError('Debe ser un número')
        .required('Este campo es requerido'),
    weight: yup
        .number()
        .typeError('Debe ser un número')
        .required('Este campo es requerido'),
    tag_id: yup.string().required('Este campo es requerido'),
})

interface FleetProfileProps {
    fleetId?: string
    readOnly?: boolean
    onlyView?: boolean
    handleEditVehicle?: () => void
    handleCreateNew: (boo: boolean) => void
    dataTag?: any
    selectedVehicleId?: string
    userId?: string
    setEditTag?: any
    setNeww?: any
    isCompany?: boolean
    tagData?: any
    setDataTag?: any
}

const AssociateTagProfile = ({
    fleetId,
    onlyView,
    readOnly,
    handleEditVehicle,
    handleCreateNew,
    dataTag,
    selectedVehicleId,
    userId,
    setEditTag,
    setNeww,
    isCompany,
    tagData,
    setDataTag,
}: FleetProfileProps) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    // const navigate = useNavigate()

    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        // register,
    } = useForm<Inputs>({
        resolver: yupResolver(Schema),
        mode: 'onChange',
    })

    const [readOnlyState, setReadOnlyState] = React.useState<
        boolean | undefined
    >(readOnly)
    // const [loading, setLoading] = React.useState(false)
    const [editable, setEditable] = React.useState<boolean>(false)

    const handleAbleToEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
    }
    // const [isTagDeleted] = React.useState<Boolean>(
    //     tagData?.find((tag) => tag.tag_serial === dataVehicle?.tag_serial)
    //         ?.is_deleted
    // )

    const handleCancelEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
        // if (readOnlyState) {
        //     setValue('tag_id', dataVehicle?.tag_serial, {
        //         shouldValidate: true,
        //         shouldDirty: true,
        //     })
        //     setValue('make', dataVehicle?.make, {})
        //     setValue('model', dataVehicle?.model, {})
        //     setValue('vin', dataVehicle?.vin, {})
        //     setValue('year', dataVehicle?.year, {})
        //     setValue('color', dataVehicle?.color, {})
        //     setValue('category', dataVehicle?.category, {})
        //     setValue('axles', dataVehicle?.axles, {})
        //     setValue('weight', dataVehicle?.weight, {})
        //     setValue('license_plate', dataVehicle?.license_plate, {})
        // }
    }

    React.useEffect(() => {
        // dispatch({ _all_: true }({ _all_: true }))
        dispatch(getTagRequest({ _all_: true, per_page: 50 }))
        dispatch(getCategoryRequest({ _all_: true, per_page: 50 }))
        // if (readOnlyState) {
        //     setValue('tag_id', dataVehicle?.tag_serial, {
        //         shouldValidate: true,
        //         shouldDirty: true,
        //     })
        //     setValue('make', dataVehicle?.make, {})
        //     setValue('model', dataVehicle?.model, {})
        //     setValue('vin', dataVehicle?.vin, {})
        //     setValue('year', dataVehicle?.year, {})
        //     setValue('color', dataVehicle?.color, {})
        //     setValue('category', dataVehicle?.category, {})
        //     setValue('axles', dataVehicle?.axles, {})
        //     setValue('weight', dataVehicle?.weight, {})
        //     setValue('license_plate', dataVehicle?.license_plate, {})
        // }
    }, [dispatch, setValue, readOnlyState])
    const onInvalid = (data) => {
        console.log(data)
    }

    const handleReturnTable = () => {
        setEditTag(false)
        setNeww(false)
        setDataTag({ tag_serial: '', tag_number: '' })
    }

    return (
        <>
            <form onSubmit={handleSubmit(onInvalid)}>
                <Grid
                    item
                    xs={12}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h4">Detalles del Tag</Typography>

                    {
                        //(!onlyView && readOnly) ||
                        // dataVehicle?.tag_deleted ||
                        false ? (
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
                        ) : null
                    }
                    <Grid item>
                        <AnimateButton>
                            <Button
                                variant="contained"
                                size="medium"
                                onClick={handleReturnTable}
                            >
                                Volver
                            </Button>
                        </AnimateButton>
                    </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ marginTop: '5px' }}>
                    <Controller
                        name="license_plate"
                        control={control}
                        defaultValue={dataTag?.tag_serial}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    label="Serial"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.license_plate}
                                    helperText={errors.license_plate?.message}
                                    disabled={true}
                                />
                            </Grid>
                        )}
                    />

                    <Controller
                        name="vin"
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
                                    label="Cuenta"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.vin}
                                    helperText={errors.vin?.message}
                                    disabled={true}
                                />
                            </Grid>
                        )}
                    />

                    <Controller
                        name="make"
                        control={control}
                        // defaultValue={userData?.vehicles?.make}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    label="Fecha de inicialización"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.make}
                                    helperText={errors.make?.message}
                                    disabled={true}
                                />
                            </Grid>
                        )}
                    />
                    <Controller
                        name="model"
                        control={control}
                        // defaultValue={userData?.vehicles?.model}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    label="Agencia"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.model}
                                    helperText={errors.model?.message}
                                    disabled={true}
                                />
                            </Grid>
                        )}
                    />

                    <Controller
                        name="color"
                        control={control}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    label="Peaje"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.color}
                                    helperText={errors.color?.message}
                                    disabled={true}
                                />
                            </Grid>
                        )}
                    />

                    <Controller
                        name="category"
                        control={control}
                        // defaultValue={dataVehicle?.category}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    label="Operador"
                                    fullWidth
                                    select
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.category}
                                    helperText={errors.category?.message}
                                    disabled={true}
                                />
                            </Grid>
                        )}
                    />

                    <Controller
                        name="axles"
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
                                    label="Equipo"
                                    fullWidth
                                    onKeyDown={onKeyDown}
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.axles}
                                    helperText={errors.axles?.message}
                                    disabled={true}
                                />
                            </Grid>
                        )}
                    />

                    <Controller
                        name="weight"
                        control={control}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    label="Matrícula"
                                    fullWidth
                                    type="number"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.weight}
                                    helperText={errors.weight?.message}
                                    disabled={true}
                                />
                            </Grid>
                        )}
                    />
                    <Controller
                        name="weight"
                        control={control}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    label="Modelo"
                                    fullWidth
                                    type="number"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.weight}
                                    helperText={errors.weight?.message}
                                    disabled={true}
                                />
                            </Grid>
                        )}
                    />
                    <Controller
                        name="weight"
                        control={control}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    label="Categoría"
                                    fullWidth
                                    type="number"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.weight}
                                    helperText={errors.weight?.message}
                                    disabled={true}
                                />
                            </Grid>
                        )}
                    />
                </Grid>

                <CardActions>
                    <Grid container justifyContent="flex-end" spacing={0}>
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
                        {!readOnly ? (
                            <>
                                <Grid
                                    container
                                    justifyContent="flex-end"
                                    sx={{ marginBottom: '-45px' }}
                                >
                                    <Grid item>
                                        <AnimateButton>
                                            <Button
                                                variant="contained"
                                                size="medium"
                                                type="submit"
                                            >
                                                Asociar
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                </Grid>
                            </>
                        ) : null}

                        <Grid
                            container
                            className="mr-auto"
                            // spacing={0}
                            // sx={{ marginBottom: '-30px' }}
                        ></Grid>
                    </Grid>
                </CardActions>
            </form>
        </>
    )
}

export default AssociateTagProfile
