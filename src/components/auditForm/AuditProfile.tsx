import React from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    useForm,
    Controller,
    SubmitHandler,
    SubmitErrorHandler,
} from 'react-hook-form'

import { Button, Grid, TextField, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useDispatch, useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'
import { useNavigate } from 'react-router'
import { updateAuditsRequest } from 'store/audit/auditActions'
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
    id: string
    site_code: string
    node_code: string
    lane_code: string
    company_code: string
    collected_amount: number
    collected_iso_code: string
    reported_fare_category: string
    reported_axles: number
    reported_weight: number
    reported_on: string
    operator: string
    status: string
    vehicle_plate: string
    plate_img: string
    transaction: string
    registered_fare_category: string
    registered_axles: string
    registered_weight: string
    notes: string
    audit_result: string
}

const Schema = yup.object().shape({
    site_code: yup.string().required('Este campo es requerido'),
    node_code: yup.string().required('Este campo es requerido'),
    lane_code: yup.string().required('Este campo es requerido'),
    company_code: yup.string().required('Este campo es requerido'),
    collected_amount: yup.string().required('Este campo es requerido'),
    collected_iso_code: yup.string().required('Este campo es requerido'),
    reported_fare_category: yup.string().required('Este campo es requerido'),
    reported_axles: yup.string().required('Este campo es requerido'),
    reported_weight: yup.string().required('Este campo es requerido'),
    reported_on: yup.string().required('Este campo es requerido'),
    operator: yup.string().required('Este campo es requerido'),
    status: yup.string().required('Este campo es requerido'),
    vehicle_plate: yup.string().required('Este campo es requerido'),
    plate_img: yup.string().required('Este campo es requerido'),
    transaction: yup.string().required('Este campo es requerido'),
    registered_fare_category: yup.string().required('Este campo es requerido'),
    registered_axles: yup.string().required('Este campo es requerido'),
    registered_weight: yup.string().required('Este campo es requerido'),
    notes: yup.string().required('Este campo es requerido'),
    audit_result: yup.string().required('Este campo es requerido'),
})

interface AuditProps {
    auditId?: string
    readOnly?: boolean
    onlyView?: boolean
}

const FareProfile = ({ auditId, onlyView, readOnly }: AuditProps) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        // getValues,
        // watch,
    } = useForm<Inputs>({
        resolver: yupResolver(Schema),
        mode: 'onChange',
    })
    const [readOnlyState] = React.useState<boolean | undefined>(readOnly)

    // Loading was set to true by default
    const [loading, setLoading] = React.useState(false)

    const audits = useSelector((state: DefaultRootStateProps) =>
        state.audit.find((a) => a.id === auditId)
    )

    React.useEffect(() => {
        setValue('reported_on', audits?.reported_on)
        setValue('operator', audits?.operator)
        setValue('site_code', audits?.site_code)
        setValue('node_code', audits?.node_code)
        setValue('lane_code', audits?.lane_code)
        setValue('company_code', audits?.company_code)
        setValue('collected_amount', audits?.collected_amount)
        setValue('collected_iso_code', audits?.collected_iso_code)
        setValue('reported_fare_category', audits?.reported_fare_category)
        setValue('reported_axles', audits?.reported_axles)
        setValue('reported_weight', audits?.reported_weight)
        setValue('status', audits?.status)
        setValue('vehicle_plate', audits?.vehicle_plate)
        setValue('plate_img', audits?.plate_img)
    }, [audits, setValue])

    const onInvalid: SubmitErrorHandler<Inputs> = (data, e) => {
        console.log(data)
    }

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const {
            id,
            collected_amount,
            collected_iso_code,
            company_code,
            lane_code,
            node_code,
            operator,
            plate_img,
            reported_axles,
            reported_fare_category,
            reported_on,
            reported_weight,
            site_code,
            status,
            transaction,
            vehicle_plate,
            audit_result,
            notes,
            registered_axles,
            registered_fare_category,
            registered_weight,
        } = data

        const fetchData1 = async () => {
            setLoading(true)
            const responseData1 = await dispatch(
                updateAuditsRequest([
                    {
                        id,
                        collected_amount,
                        collected_iso_code,
                        company_code,
                        lane_code,
                        node_code,
                        operator,
                        plate_img,
                        reported_axles,
                        reported_fare_category,
                        reported_on,
                        reported_weight,
                        site_code,
                        status,
                        transaction,
                        vehicle_plate,
                        audit_result,
                        notes,
                        registered_axles,
                        registered_fare_category,
                        registered_weight,
                    },
                ])
            )
            setLoading(false)
            return responseData1
        }
        await fetchData1()
        navigate(`/audit`)
    }

    const handleReturnTable = () => {
        navigate(-1)
    }
    return (
        <>
            <Grid item xs={12}>
                <Typography variant="h4">Datos del transito</Typography>
            </Grid>
            {loading ? 'loading...' : null}
            <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
                <Grid container spacing={2} sx={{ marginTop: '5px' }}>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="reported_on"
                            control={control}
                            // defaultValue={dataEmployee?.second_name || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Fecha"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.reported_on}
                                    helperText={errors.reported_on?.message}
                                    disabled={readOnlyState}
                                />
                            )}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="reported_on"
                            control={control}
                            // defaultValue={dataEmployee?.second_name || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Hora"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.reported_on}
                                    helperText={errors.reported_on?.message}
                                    disabled={readOnlyState}
                                />
                            )}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="operator"
                            control={control}
                            // defaultValue={dataEmployee?.second_name || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Operador"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.reported_on}
                                    helperText={errors.reported_on?.message}
                                    disabled={readOnlyState}
                                />
                            )}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ marginTop: '5px' }}>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="company_code"
                            control={control}
                            // defaultValue={dataEmployee?.second_name || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Compañia"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.reported_on}
                                    helperText={errors.reported_on?.message}
                                    disabled={readOnlyState}
                                />
                            )}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="site_code"
                            control={control}
                            // defaultValue={dataEmployee?.second_name || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Peaje"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.reported_on}
                                    helperText={errors.reported_on?.message}
                                    disabled={readOnlyState}
                                />
                            )}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="lane_code"
                            control={control}
                            // defaultValue={dataEmployee?.second_name || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Canal"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.reported_on}
                                    helperText={errors.reported_on?.message}
                                    disabled={readOnlyState}
                                />
                            )}
                        />
                    </Grid>
                </Grid>
            </form>
            <Grid container className="mr-auto ">
                <Grid item>
                    <AnimateButton>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={handleReturnTable}
                        >
                            Volver
                        </Button>
                    </AnimateButton>
                </Grid>
            </Grid>
        </>
    )
}

export default FareProfile
