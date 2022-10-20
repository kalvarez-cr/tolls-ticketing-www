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
    TextField,
    Theme,
    Typography,
    CardActions,
    Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
// import ErrorTwoToneIcon from '@material-ui/icons/ErrorTwoTone'
// import UploadTwoToneIcon from '@material-ui/icons/UploadTwoTone'
// import Avatar from 'ui-component/extended/Avatar'
// import { gridSpacing } from 'store/constant'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps, category } from 'types'
import { getVehicleTypeRequest } from 'store/vehicleType/VehicleActions'
import { useDispatch } from 'react-redux'
import {
    createCategoryRequest,
    updateCategoryRequest,
} from 'store/Category/CategoryActions'
import { useNavigate } from 'react-router'
import { onKeyDown } from 'components/utils'
import AcceptButton from 'components/buttons/AcceptButton'
import EditButton from 'components/buttons/EditButton'
import CancelEditButton from 'components/buttons/CancelEditButton'
import CancelButton from 'components/buttons/CancelButton'
import AnimateButton from 'ui-component/extended/AnimateButton'

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
    title: string
    description: string
    axles: number
    weight_kg: number
    proofOfPaymentType: string
    uploadFile: any
}

const Schema = yup.object().shape({
    axles: yup
        .number()
        .typeError('Debe ser un número')
        .required('Este campo es obligatorio'),
    weight_kg: yup
        .number()
        .typeError('Debe ser un número')
        .required('Este campo es obligatorio'),
    title: yup.string().required('Este campo es obligatorio'),
    description: yup.string().required('Este campo es requerido'),
    proofOfPaymentType: yup.string(),
    uploadFile: yup.mixed().when('proofOfPaymentType', {
        is: (val) => val !== 'sin comprobante',
        then: yup
            .mixed()
            .test('name', 'Debes subir un icono', (value) => {
                return value[0] && value[0].name !== ''
            })
            .test('fileSize', 'Supera el tamaño máximo', (value) => {
                return value[0] && value[0].size <= 1000000
            })
            .test('type', 'Solo soporta .png ', (value) => {
                if (
                    value[0]?.type.includes(
                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    )
                ) {
                    return true
                }

                return false
            }),
    }),
})

interface FleetProfileProps {
    fleetId?: string
    readOnly?: boolean
    onlyView?: boolean
}

const FareProfile = ({ fleetId, onlyView, readOnly }: FleetProfileProps) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [selectedFile, setSelectedFile] = React.useState(null)

    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        getValues,
        register,
    } = useForm<Inputs>({
        resolver: yupResolver(Schema),
    })

    const [loading, setLoading] = React.useState(false)

    const [readOnlyState, setReadOnlyState] = React.useState<
        boolean | undefined
    >(readOnly)

    const [editable, setEditable] = React.useState<boolean>(false)

    const categories = useSelector(
        (state: DefaultRootStateProps) => state.category
    )
    const [CategoryData] = React.useState<category | undefined>(
        categories?.find((category) => category.id === fleetId)
    )

    const handleAbleToEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
    }

    const uploadPhoto = async (e) => {
        const file = e.target?.files[0]
        setSelectedFile(file)
        setValue('uploadFile', e.target.files, { shouldValidate: true })
    }

    const handleCancelEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
        if (readOnlyState) {
            setValue('axles', CategoryData?.axles)
            setValue('weight_kg', CategoryData?.weight_kg)
            setValue('title', CategoryData?.title)
            setValue('description', CategoryData?.description)
        }
        // setActive(CategoryData?.active)
    }

    React.useEffect(() => {
        if (readOnlyState) {
            setValue('axles', CategoryData?.axles)
            setValue('weight_kg', CategoryData?.weight_kg)
            setValue('title', CategoryData?.title)
            setValue('description', CategoryData?.description)
        }
    }, [CategoryData, setValue])

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const { axles, weight_kg, description, title } = data

        const file = getValues('uploadFile')[0]

        const formData = new FormData()

        Object.entries({ file }).forEach(([key, value]) => {
            //@ts-ignore
            formData.append(key, value)
        })
        const url = `${process.env.REACT_APP_BASE_API_URL}/registered-tag/upload/?file`

        const upload = await fetch(url, {
            method: 'POST',
            body: formData,
            credentials: 'include',
        })
        console.log(upload)

        const fetchData1 = async () => {
            setLoading(true)
            const responseData1 = await dispatch(
                createCategoryRequest({
                    axles,
                    weight_kg,
                    description,
                    title,
                })
            )
            setLoading(false)
            return responseData1
        }
        const fetchData2 = async () => {
            setLoading(true)
            const responseData2 = await dispatch(
                updateCategoryRequest({
                    id: CategoryData?.id,
                    axles,
                    weight_kg,
                    description,
                    title,
                })
            )
            setLoading(false)
            return responseData2
        }
        if (!editable) {
            fetchData1()
        }

        if (editable) {
            fetchData2()
        }

        navigate(`/servicios`)
    }

    const handleTable = () => {
        navigate(`/servicios`)
    }

    React.useEffect(() => {
        dispatch(getVehicleTypeRequest())
    }, [dispatch])

    const handleReturnTable = () => {
        navigate(-1)
    }

    return (
        <>
            <Grid item xs={12}>
                <Typography variant="h4">Servicios</Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item sm zeroMinWidth></Grid>
                    {!onlyView && readOnly ? (
                        <Grid item>
                            <EditButton
                                loading={loading}
                                handleAbleToEdit={handleAbleToEdit}
                            />
                        </Grid>
                    ) : null}
                </Grid>
            </Grid>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2} sx={{ marginTop: '5px' }}>
                    <Controller
                        name="title"
                        control={control}
                        defaultValue={CategoryData?.title}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    fullWidth
                                    label="Código"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    disabled={readOnlyState}
                                    error={!!errors.title}
                                    helperText={errors.title?.message}
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
                                    label="Nombre"
                                    fullWidth
                                    size="small"
                                    onKeyDown={onKeyDown}
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.axles}
                                    helperText={errors.axles?.message}
                                    disabled={readOnlyState}
                                />
                            </Grid>
                        )}
                    />
                    <Controller
                        name="weight_kg"
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
                                    label="Descripción"
                                    size="small"
                                    onKeyDown={onKeyDown}
                                    autoComplete="off"
                                    {...field}
                                    disabled={readOnlyState}
                                    error={!!errors.weight_kg}
                                    helperText={errors.weight_kg?.message}
                                />
                            </Grid>
                        )}
                    />

                    <Controller
                        name="weight_kg"
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
                                    label="Costo"
                                    size="small"
                                    onKeyDown={onKeyDown}
                                    autoComplete="off"
                                    {...field}
                                    disabled={readOnlyState}
                                    error={!!errors.weight_kg}
                                    helperText={errors.weight_kg?.message}
                                />
                            </Grid>
                        )}
                    />

                    <div className="w-full md:w-1/2 px-4 my-3">
                        <label className="font-bold">
                            Icono{' '}
                            {errors.uploadFile?.message ? (
                                <span className="text-red-600">
                                    ({errors.uploadFile?.message})
                                </span>
                            ) : null}
                        </label>
                        <label
                            className={`flex mt-1 justify-center h-10 items-center text-white hover:text-black rounded-lg hover:border-logo border-2 cursor-pointer ${
                                selectedFile && !errors.uploadFile
                                    ? 'bg-materialdarkgreen'
                                    : 'bg-materialgreen'
                            }`}
                        >
                            <>
                                <svg
                                    className="w-8 h-8 mx-2 "
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                </svg>
                                <span className=" text-base leading-normal mx-2 font-bold">
                                    Subir Archivo
                                </span>
                            </>

                            <input
                                type="file"
                                className="hidden"
                                {...register('uploadFile')}
                                name="uploadFile"
                                onChange={uploadPhoto}
                            />
                        </label>
                        {selectedFile && !errors.uploadFile ? (
                            <div className="flex justify-between">
                                <p className="text-green-900 font-bold">
                                    Cargado correctamente
                                </p>
                                <p className="text-green-900 font-bold">
                                    {
                                        // @ts-ignore
                                        selectedFile?.name
                                    }
                                </p>
                            </div>
                        ) : null}
                    </div>

                    {/* <Controller
                        name="name_category"
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
                                    label="Nombre de categoría"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    disabled={readOnlyState}
                                    error={!!errors.name_category}
                                    helperText={errors.name_category?.message}
                                />
                            </Grid>
                        )}
                    />
                    <Controller
                        name="abbreviation"
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
                                    label="Abreviatura"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    disabled={readOnlyState}
                                    error={!!errors.abbreviation}
                                    helperText={errors.abbreviation?.message}
                                />
                            </Grid>
                        )}
                    /> */}
                    {/* <Controller
                        name="description"
                        control={control}
                        // defaultValue={fleetData?.transportation_mean}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={12}
                                className={classes.searchControl}
                            >
                                <TextField
                                    select
                                    fullWidth
                                    label="Servicios obligatorios"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    disabled={readOnlyState}
                                    error={!!errors.description}
                                    helperText={errors.description?.message}
                                />
                            </Grid>
                        )}
                    /> */}
                </Grid>
                <CardActions>
                    <Grid container justifyContent="flex-end" spacing={0}>
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
                            <>
                                <Grid item sx={{ display: 'flex' }}>
                                    <CancelButton
                                        loading={loading}
                                        handleTable={handleTable}
                                    />
                                    <AcceptButton loading={loading} />
                                </Grid>
                            </>
                        )}
                        <Grid container className="mr-auto">
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
                    </Grid>
                </CardActions>
            </form>
        </>
    )
}

export default FareProfile
