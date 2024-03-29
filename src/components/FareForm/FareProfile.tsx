import React from 'react'
import * as yup from 'yup'
// import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    useForm,
    Controller,
    SubmitHandler,
    SubmitErrorHandler,
} from 'react-hook-form'

//REDUX
// import { useSelector } from 'react-redux'
// import {
//     createFleetRequest,
//     updateFleetRequest,
// } from 'store/fleetCompany/FleetCompanyActions'
// material-ui
import {
    Grid,
    Theme,
    Typography,
    CardActions,
    MenuItem,
    TextField,
    Button,
    
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useDispatch, useSelector } from 'react-redux'
import { DefaultRootStateProps, fare } from 'types'
import { useNavigate } from 'react-router'
import { createFareRequest, updateFareRequest } from 'store/fare/FareActions'
import { getCategoryRequest } from 'store/Category/CategoryActions'
import { getTollsRequest } from 'store/tolls/tollsActions'
import CancelEditButton from 'components/buttons/CancelEditButton'
import AcceptButton from 'components/buttons/AcceptButton'
import CancelButton from 'components/buttons/CancelButton'
import EditButton from 'components/buttons/EditButton'
import AnimateButton from 'ui-component/extended/AnimateButton'

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
    title: string
    fare_name: string
    nominal_amount: number
    weight_factor: number
    nominal_iso_code: string
    toll: any
    factor: boolean
    createMode: boolean
}

const Schema = yup.object().shape({
    title: yup.string().required('Este campo es requerido'),
    fare_name: yup.string().required('Este campo es requerido').max(49, 'Debe tener máximo 49 carácteres'),
    nominal_amount: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .positive('Debe ser un número positivo')
        .moreThan(-0.01, 'Debe ser un número positivo')
        .typeError('Debe ser un número')
        .required('Este campo es requerido'),
    weight_factor: yup
        .number()
        // .transform((value) => (isNaN(value) ? undefined : value))
        // .positive('Debe ser un número positivo')
        .typeError('Debe ser un número')
        .when('factor', {
            is: (factor) => factor,
            then: (value) =>
                value
                    .transform((value) => (isNaN(value) ? undefined : value))
                    .positive('Debe ser un número positivo')
                    .required('Este campo es requerido'),
        }),
    nominal_iso_code: yup.string().required('Este campo es requerido'),
    toll: yup.string().required('Este campo es requerido') .typeError('Este campo es requerido'),
})

interface FleetProfileProps {
    fleetId?: string
    readOnly?: boolean
    onlyView?: boolean
    createMode?: boolean
}

const FareProfile = ({
    fleetId,
    onlyView,
    readOnly,
    createMode,
}: FleetProfileProps) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
      
    } = useForm<Inputs>({
        resolver: yupResolver(Schema),
        mode: 'onChange',
    })

    const [readOnlyState, setReadOnlyState] = React.useState<
        boolean | undefined
    >(readOnly)

    const [editable, setEditable] = React.useState<boolean>(false)
    const [loading, setLoading] = React.useState<boolean>(false)
    const role = useSelector(
        (state: DefaultRootStateProps) => state.login?.user?.role
    )
    const vehicle = useSelector(
        (state: DefaultRootStateProps) => state.category
    )
    const tolls = useSelector((state: DefaultRootStateProps) => state.tolls)
    const fares = useSelector((state: DefaultRootStateProps) => state.fare)

    const [fareData] = React.useState<fare | any>(
        readOnlyState ? fares?.find((fare) => fare.id === fleetId) : []
    )

     const companyCode = useSelector(( state: DefaultRootStateProps) => state?.login?.user?.company_info?.company_code)  

    const referToll = useSelector(( state: DefaultRootStateProps) => state?.login?.user?.employee_info?.toll_sites)

    const awsAragua = companyCode === '5002' && referToll.length > 0   
 

    const awsPao = companyCode === '5003' && referToll.length > 0  

    // const roleNotAllowed = ['visualizer', 'crm_user', 'monitor_viewer', 'report_viewer', 'gate_device', 'operator']
   

    // const [factor, setFactor] = React.useState<boolean>(false)
    const [weightFactor, setWeightFactor] = React.useState<any>('')

    const handleAbleToEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
    }

    const handleFactor = (e) => {
        e.preventDefault()
        setValue('weight_factor', e.target.value, {
            shouldValidate: true,
        })
        setWeightFactor(e.target.value)
    }

    // const handleChangeFactor = () => {
    //     setFactor(!factor)
    // }

    const handleCancelEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
        setValue('title', fareData?.id_category, {})
        setValue('fare_name', fareData?.fare_name, {})
        setValue('nominal_amount', fareData?.nominal_amount?.slice(3), {})
        setValue('weight_factor', fareData?.weight_factor, {})
        setValue('nominal_iso_code', fareData?.nominal_iso_code, {})
        setValue(
            'toll',
            fareData?.site_id,
            {  }
        )
    }

    React.useEffect(() => {
        dispatch(getCategoryRequest({ _all_: true, per_page: 50 }))
        dispatch(getTollsRequest({ _all_: true, per_page: 50 }))
        setValue('title', fareData?.id_category, {})
        setValue('fare_name', fareData?.fare_name, {})
        setValue('nominal_amount', fareData?.nominal_amount?.slice(3), {})
        setValue('weight_factor', fareData?.weight_factor, {})
        setValue('nominal_iso_code', fareData?.nominal_iso_code, {})
        setValue(
            'toll',
            fareData?.site_id,
            {  }
        )
        // setValue(
        //     'toll',
        //     fareData?.sites?.map((site) => site.site_id),
        //     {}
        // )
    }, [fareData])

    const onInvalid: SubmitErrorHandler<Inputs> = (data, e) => {
        console.log(data)
    }

    // const handleFiltering = (event, newValue) => {
    //     const name = newValue.toUpperCase()
    //     setLoading(true)
    //     dispatch(
    //         getFilteredRequest({
    //             criteria: 'site',
    //             param: name,
    //         })
    //     )
    //     setLoading(false)
    // }
    // const handleTollSelection = (event, newValue) => {
    //     // @ts-ignore
    //     const tollsIds: any[] = []
    //     newValue.forEach((element) => tollsIds.push(element.id))
    //     setValue('toll', tollsIds)
    // }

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data)

        const { title, fare_name, nominal_amount, nominal_iso_code, toll } =
            data

        const fetchData1 = async () => {
            setLoading(true)
            const responseData1 = await dispatch(
                createFareRequest({
                    category: title,
                    fare_name,
                    nominal_amount,
                    weight_factor: weightFactor,
                    nominal_iso_code,
                    site_id: [toll],
                })
            )
            setLoading(false)
            return responseData1
        }
        const fetchData2 = async () => {
            setLoading(true)
            const responseData2 = await dispatch(
                updateFareRequest({
                    id: fareData?.id,
                    category: title,
                    fare_name,
                    nominal_amount,
                    weight_factor: weightFactor,
                    nominal_iso_code,
                    site_id: [toll],
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
        navigate(`/tarifas`)
    }

    const handleReturnTable = () => {
        navigate(-1)
    }

    return (
        <>
            <Grid item xs={12}>
                <Typography variant="h4">Nueva tarifa</Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item sm zeroMinWidth></Grid>
                    {!onlyView && readOnly && role === 'general_administrator'  && !awsAragua  && !awsPao ? (
                        <Grid item>
                            <EditButton
                                loading={loading}
                                handleAbleToEdit={handleAbleToEdit}
                            />
                        </Grid>
                    ) : null}
                </Grid>
            </Grid>
            
            <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
                <Grid container spacing={2} sx={{ marginTop: '5px' }}>
                    <Controller
                        name="title"
                        control={control}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    defaultValue={fareData?.id_category}
                                    select
                                    fullWidth
                                    label="Categoría de vehículo"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    disabled={!createMode}
                                    error={!!errors.title}
                                    helperText={errors.title?.message}
                                >
                                    {vehicle &&
                                        vehicle.map((option) => (
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
                        name="toll"
                        control={control}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    defaultValue={fareData?.site_id}
                                    select
                                    fullWidth
                                    label="Peaje "
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    disabled={!createMode}
                                    error={!!errors.toll}
                                    helperText={errors.toll?.message}
                                >
                                    {tolls &&
                                        tolls.map((option) => (
                                            <MenuItem
                                                key={option.id}
                                                value={option.id}
                                            >
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                </TextField>
                            </Grid>
                        )}
                    />
                    {/* {!loading ? (
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={6}
                            className={classes.searchControl}
                        >
                            <Autocomplete
                                id="toll"
                                multiple
                                options={tolls}
                                defaultValue={fareData?.toll}
                                autoSelect={true}
                                size="small"
                                // @ts-ignore
                                getOptionLabel={(option) => option.name}
                                loading={loading}
                                onChange={handleTollSelection}
                                onInputChange={handleFiltering}
                                loadingText="Cargando..."
                                noOptionsText="No existen peajes."
                                disabled={readOnlyState || !createMode}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        {...register('toll')}
                                        name="toll"
                                        label="Peaje"
                                        helperText={errors.toll?.message}
                                        error={!!errors.toll}
                                    />
                                )}
                            />
                        </Grid>
                    ) : (
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={6}
                            className={classes.searchControl}
                        >
                            <TextField
                                fullWidth
                                label="Peajes"
                                size="small"
                                autoComplete="off"
                                disabled={true}
                            />
                        </Grid>
                    )} */}
                </Grid>
                <Grid container spacing={2} sx={{ marginTop: '5px' }}>
                    <Controller
                        name="fare_name"
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
                                    label="Nombre de la tarifa"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.fare_name}
                                    helperText={errors.fare_name?.message}
                                    disabled={readOnlyState}
                                />
                            </Grid>
                        )}
                    />
                    <Controller
                        name="nominal_amount"
                        control={control}
                        // defaultValue={fareData?.nominal_amount.slice(3)}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Monto"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    disabled={readOnlyState}
                                    error={!!errors.nominal_amount}
                                    helperText={errors.nominal_amount?.message}
                                />
                            </Grid>
                        )}
                    />

                    {fareData?.weight_factor || !readOnly ? (
                        <Controller
                            name="weight_factor"
                            control={control}
                            defaultValue={fareData?.weight_factor}
                            render={({ field }) => (
                                <Grid
                                    item
                                    xs={12}
                                    md={6}
                                    className={classes.searchControl}
                                >
                                    <TextField
                                        fullWidth
                                        label="Factor por peso(Bs)"
                                        size="small"
                                        type="number"
                                        inputProps={{ step: '0.000001' }}
                                        autoComplete="off"
                                        {...field}
                                        disabled={readOnlyState}
                                        onChange={handleFactor}
                                        error={!!errors.weight_factor}
                                        helperText={
                                            errors.weight_factor?.message
                                        }
                                    />
                                </Grid>
                            )}
                        />
                    ) : (
                        <></>
                    )}

                    <Controller
                        name="nominal_iso_code"
                        control={control}
                        defaultValue={fareData?.nominal_iso_code}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    fullWidth
                                    select
                                    label="Nominal"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    disabled={readOnlyState}
                                    error={!!errors.nominal_iso_code}
                                    helperText={
                                        errors.nominal_iso_code?.message
                                    }
                                >
                                    {
                                        <MenuItem key={928} value={928}>
                                            {'BsD'}
                                        </MenuItem>
                                    }
                                </TextField>
                            </Grid>
                        )}
                    />
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
                            <Grid item sx={{ display: 'flex' }}>
                                <CancelButton
                                    loading={loading}
                                    handleTable={handleReturnTable}
                                />
                                <AcceptButton loading={loading} />
                            </Grid>
                        )}
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
                    </Grid>
                </CardActions>
                {readOnly ? <div className="flex ">
          <div className="flex m-4">
            <h4 className="font-extrabold">Creado:</h4>
            <span className="pl-2">{new Date(
              fareData?.created_on
              ).toLocaleDateString('es-VE')}</span>
            
              <span className="pl-3 font-semibold">{fareData?.created_by}</span>
          </div>
          <div className="flex m-4">
            <h4 className="font-extrabold">Actualizado:</h4>
            <span className="pl-2">{new Date(
              fareData?.updated_on
              ).toLocaleDateString('es-VE')}</span>

              <span className="pl-3 font-semibold">{fareData?.updated_by}</span>
          </div>
        </div> : null}
            </form>
        </>
    )
}

export default FareProfile
