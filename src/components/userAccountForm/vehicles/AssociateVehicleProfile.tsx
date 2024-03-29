import React from 'react'
import * as yup from 'yup'
// import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
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
    Autocomplete,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import AnimateButton from 'ui-component/extended/AnimateButton'
import TextField from '@mui/material/TextField'
import { MenuItem } from '@mui/material'
//REDUX
import { useSelector, useDispatch } from 'react-redux'
import { DefaultRootStateProps } from 'types'

// import { getCategoryRequest } from 'store/Category/CategoryActions'
import { getTagRequest } from 'store/saleTag/saleTagActions'

import {
    createCarRequest,
    updateCarRequest,
} from 'store/accountHolder/AccountHolderActions'
import { onKeyDown } from 'components/utils'
import { getCategoryRequest } from 'store/Category/CategoryActions'
import { getFilteredRequest } from 'store/filtered/filteredActions'
import MovementsVehicle from './MovementsVehicle'
import Collapse from 'ui-component/extended/Collapse'

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
    dataVehicle?: any
    selectedVehicleId?: string
    userId?: string
    setEditVehicle?: any
    setNeww?: any
    isCompany?: boolean
    tagData?: any
    setDataVehicle?: any
}

const AssociateVehicleProfile = ({
    fleetId,
    onlyView,
    readOnly,
    handleEditVehicle,
    handleCreateNew,
    dataVehicle,
    selectedVehicleId,
    userId,
    setEditVehicle,
    setNeww,
    isCompany,
    tagData,
    setDataVehicle,
}: FleetProfileProps) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    // const navigate = useNavigate()

    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        register,
    } = useForm<Inputs>({
        resolver: yupResolver(Schema),
        mode: 'onChange',
    })

    const [readOnlyState, setReadOnlyState] = React.useState<
        boolean | undefined
    >(readOnly)
    const [loading, setLoading] = React.useState(false)
    const [editable, setEditable] = React.useState<boolean>(false)

    const category = useSelector(
        (state: DefaultRootStateProps) => state.category
    )
    const tag = useSelector((state: DefaultRootStateProps) => state.saleTag)

    const handleAbleToEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
    }
    // const [isTagDeleted] = React.useState<Boolean>(
    //     tagData?.find((tag) => tag.tag_serial === dataVehicle?.tag_serial)
    //         ?.is_deleted
    // )

    const handleTagFiltering = async (event, newValue) => {
        const id = newValue.toUpperCase()
        setLoading(true)
        await dispatch(
            getFilteredRequest({
                criteria: 'tag',
                param: id,
            })
        )
        setLoading(false)
    }

    const handleTagSelection = (event, newValue) => {
        // @ts-ignore
        setValue('tag_id', newValue?.tag_serial, {
            shouldValidate: true,
            shouldDirty: true,
        })
    }
    const handleCancelEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
        if (readOnlyState) {
            setValue('tag_id', dataVehicle?.tag_serial, {
                shouldValidate: true,
                shouldDirty: true,
            })
            setValue('make', dataVehicle?.make, {})
            setValue('model', dataVehicle?.model, {})
            setValue('vin', dataVehicle?.vin, {})
            setValue('year', dataVehicle?.year, {})
            setValue('color', dataVehicle?.color, {})
            setValue('category', dataVehicle?.category, {})
            setValue('axles', dataVehicle?.axles, {})
            setValue('weight', dataVehicle?.weight, {})
            setValue('license_plate', dataVehicle?.license_plate, {})
        }
    }
    React.useEffect(() => {
        // dispatch({ _all_: true }({ _all_: true }))
        dispatch(getTagRequest({ _all_: true, per_page: 50 }))
        dispatch(getCategoryRequest({ _all_: true, per_page: 50 }))
        if (readOnlyState) {
            setValue('tag_id', dataVehicle?.tag_serial, {
                shouldValidate: true,
                shouldDirty: true,
            })
            setValue('make', dataVehicle?.make, {})
            setValue('model', dataVehicle?.model, {})
            setValue('vin', dataVehicle?.vin, {})
            setValue('year', dataVehicle?.year, {})
            setValue('color', dataVehicle?.color, {})
            setValue('category', dataVehicle?.category, {})
            setValue('axles', dataVehicle?.axles, {})
            setValue('weight', dataVehicle?.weight, {})
            setValue('license_plate', dataVehicle?.license_plate, {})
        }
    }, [dispatch, setValue, readOnlyState])
    const onInvalid = (data) => {
        console.log(data)
    }

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const {
            tag_id,
            model,
            year,
            color,
            category,
            axles,
            weight,
            license_plate,
            make,
            vin,
        } = data
        if (!editable && !dataVehicle?.tag_deleted) {
            dispatch(
                createCarRequest(
                    {
                        holder_id: userId,
                        tag_serial: tag_id,
                        model,
                        year,
                        color,
                        category,
                        axles,
                        weight,
                        license_plate,
                        make,
                        vin,
                        is_deleted: false,
                    },
                    userId
                )
            )
            //getAccountHolderRequest()
        }

        if (editable || dataVehicle?.tag_deleted) {
            dispatch(
                updateCarRequest(
                    {
                        holder_id: userId,
                        id: dataVehicle?.id,
                        tag_serial: tag_id,
                        make,
                        model,
                        year,
                        color,
                        category,
                        axles,
                        weight,
                        license_plate,
                        vin,
                        is_deleted: false,
                    },
                    userId
                )
            )
            // getAccountHolderRequest()
        }

        handleReturnTable()
    }

    const handleReturnTable = () => {
        setEditVehicle(false)
        setNeww(false)
        setDataVehicle({ tag_serial: '', tag_number: '' })
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
                <Grid item xs={12} className="flex justify-start">
                    <Typography variant="h4">Datos del vehículo</Typography>
                </Grid>

                {!dataVehicle?.tag_deleted ? (
                    <Grid item className="flex space-x-2 justify-end">
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
                ) : null}

                {
                    //(!onlyView && readOnly) ||
                    // dataVehicle?.tag_deleted ||
                    false ? (
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
                    ) : null
                }

                {dataVehicle?.tag_deleted ? (
                    <p className="text-red-500">Debe colocar un tag nuevo</p>
                ) : null}
                <Grid container spacing={2} sx={{ marginTop: '5px' }}>
                    <Grid item xs={12} md={6} className={classes.searchControl}>
                        <Autocomplete
                            id="tag_id"
                            options={tag}
                            defaultValue={
                                !dataVehicle?.tag_deleted
                                    ? dataVehicle
                                    : { tag_serial: '', tag_number: '' }
                            }
                            autoSelect={true}
                            size="small"
                            // @ts-ignore
                            getOptionLabel={(option) => option.tag_number}
                            loading={loading}
                            onChange={handleTagSelection}
                            onInputChange={handleTagFiltering}
                            loadingText="Cargando..."
                            noOptionsText="No existe el tag."
                            disabled={
                                readOnlyState && !dataVehicle?.tag_deleted
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    {...register('tag_id')}
                                    name="tag_id"
                                    label="Tag"
                                    helperText={errors.tag_id?.message}
                                    error={!!errors.tag_id}
                                    disabled={!dataVehicle?.tag_deleted}
                                />
                            )}
                        />
                    </Grid>
                    <Controller
                        name="license_plate"
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
                                    label="Placa del vehículo"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.license_plate}
                                    helperText={errors.license_plate?.message}
                                    disabled={readOnly}
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
                                    label="Vin"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.vin}
                                    helperText={errors.vin?.message}
                                    disabled={readOnly}
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
                                    label="Marca del vehículo"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.make}
                                    helperText={errors.make?.message}
                                    disabled={readOnly}
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
                                    label="Modelo del vehículo"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.model}
                                    helperText={errors.model?.message}
                                    disabled={readOnly}
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
                                    label="Color del vehículo"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.color}
                                    helperText={errors.color?.message}
                                    disabled={readOnly}
                                />
                            </Grid>
                        )}
                    />

                    <Controller
                        name="category"
                        control={control}
                        defaultValue={dataVehicle?.category}
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
                                    select
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.category}
                                    helperText={errors.category?.message}
                                    disabled={readOnly}
                                >
                                    {category.map((option) => (
                                        <MenuItem
                                            key={option.id}
                                            value={option.id}
                                        >
                                            {option.title}
                                        </MenuItem>
                                    ))}
                                </TextField>
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
                                    label="Configuración de ejes"
                                    fullWidth
                                    onKeyDown={onKeyDown}
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.axles}
                                    helperText={errors.axles?.message}
                                    disabled={readOnly}
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
                                    label="Peso del vehículo"
                                    fullWidth
                                    type="number"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.weight}
                                    helperText={errors.weight?.message}
                                    disabled={readOnly}
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
                        {dataVehicle?.tag_deleted || !readOnly ? (
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
                    </Grid>
                </CardActions>
            </form>

            {readOnly ? (
                <Collapse title="Detalles de movimientos">
                    <MovementsVehicle />
                </Collapse>
            ) : null}
        </>
    )
}

export default AssociateVehicleProfile
