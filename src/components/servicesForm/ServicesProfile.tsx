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
import { DefaultRootStateProps, ServicesProps } from 'types'

import { useDispatch } from 'react-redux'

import { useNavigate } from 'react-router'
import { onKeyDown } from 'components/utils'
import AcceptButton from 'components/buttons/AcceptButton'
import EditButton from 'components/buttons/EditButton'
import CancelEditButton from 'components/buttons/CancelEditButton'
import CancelButton from 'components/buttons/CancelButton'
import AnimateButton from 'ui-component/extended/AnimateButton'
import {
    createServicesRequest,
    updateServicesRequest,
} from 'store/services/servicesActions'

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
    description: string
    service_code: string
    price: number
    // proofOfPaymentType: string
    // uploadFile: any
}

interface FleetProfileProps {
    fleetId?: string
    readOnly?: boolean
    onlyView?: boolean
}

const Schema = yup.object().shape({
    price: yup
        .number()
        .typeError('Debe ser un número')
        .required('Este campo es obligatorio'),

    name: yup
        .string()
        .max(20, 'Debe teber máximo 20 caracteres')
        .required('Este campo es obligatorio'),
    description: yup
        .string()
        .max(50, 'Debe teber máximo 50 caracteres')
        .required('Este campo es requerido'),
    service_code: yup
        .string()
        .min(4, 'Debe tener 4 caracteres')
        .max(4, 'Debe teber máximo 4 caracteres')
        .required('Este campo es requerido'),
    // proofOfPaymentType: yup.boolean().default(!(!onlyView && readOnly)),
    // uploadFile: yup.mixed().when('proofOfPaymentType', {
    //     is: (val) => {
    //         return val
    //     },
    //     then: yup
    //         .mixed()
    //         .test('name', 'Debes subir un icono', (value) => {
    //             return value[0] && value[0].name !== ''
    //         })
    //         .test('fileSize', 'Supera el tamaño máximo', (value) => {
    //             return value[0] && value[0].size <= 1000000
    //         })
    //         .test('type', 'Solo soporta .png ', (value) => {
    //             if (value[0]?.type.includes('image/png')) {
    //                 return true
    //             }

    //             return false
    //         }),
    // }),
})
const FareProfile = ({ fleetId, onlyView, readOnly }: FleetProfileProps) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const [selectedFile, setSelectedFile] = React.useState(null)

    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        // getValues,
        // register,
    } = useForm<Inputs>({
        resolver: yupResolver(Schema),
        mode: 'onChange',
    })

    const [loading, setLoading] = React.useState(false)

    const [readOnlyState, setReadOnlyState] = React.useState<
        boolean | undefined
    >(readOnly)

    const [editable, setEditable] = React.useState<boolean>(false)

    const role = useSelector(
        (state: DefaultRootStateProps) => state.login?.user?.role
    )

    const services = useSelector(
        (state: DefaultRootStateProps) => state.services
    )
    const [ServicesData] = React.useState<ServicesProps | any>(
        services?.find((services) => services.id === fleetId)
    )

    const handleAbleToEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
    }

    // const uploadPhoto = async (e) => {
    //     const file = e.target?.files[0]
    //     setSelectedFile(file)
    //     setValue('uploadFile', e.target.files, { shouldValidate: true })
    // }

    const handleCancelEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
        if (readOnlyState) {
            setValue('name', ServicesData?.name)
            setValue('description', ServicesData?.description)
            setValue('service_code', ServicesData?.service_code)
            setValue('price', ServicesData?.price)
        }
    }

    React.useEffect(() => {
        // setValue('proofOfPaymentType', false)
        if (readOnlyState) {
            setValue('name', ServicesData?.name)
            setValue('description', ServicesData?.description)
            setValue('service_code', ServicesData?.service_code)
            setValue('price', ServicesData?.price)
        }
    }, [ServicesData, setValue])

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const { service_code, price, description, name } = data

        // const icon = btoa(getValues('uploadFile')[0])

        const fetchData1 = async () => {
            setLoading(true)
            const responseData1 = await dispatch(
                createServicesRequest({
                    name,
                    price,
                    service_code,
                    description,
                    icon: null,
                })
            )
            return responseData1
        }
        const fetchData2 = async () => {
            setLoading(true)
            const responseData2 = await dispatch(
                updateServicesRequest({
                    id: ServicesData?.id,
                    name,
                    price,
                    service_code,
                    description,
                    icon: null,
                })
            )
            return responseData2
        }
        if (!editable) {
            await fetchData1()
        }

        if (editable) {
            await fetchData2()
        }
        setLoading(false)
        navigate(`/servicios`)
    }

    const handleTable = () => {
        navigate(`/servicios`)
    }

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
                    {!onlyView && readOnly && role !== 'visualizer' ? (
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
                        name="service_code"
                        control={control}
                        // defaultValue={CategoryData?.title}
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
                                    error={!!errors.service_code}
                                    helperText={errors.service_code?.message}
                                />
                            </Grid>
                        )}
                    />

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
                                    label="Nombre"
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
                        name="description"
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
                                    autoComplete="off"
                                    {...field}
                                    disabled={readOnlyState}
                                    error={!!errors.description}
                                    helperText={errors.description?.message}
                                />
                            </Grid>
                        )}
                    />

                    <Controller
                        name="price"
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
                                    error={!!errors.price}
                                    helperText={errors.price?.message}
                                />
                            </Grid>
                        )}
                    />

                    {/* <div className="w-full md:w-1/2 px-4 my-3">
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
                    </div> */}
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
