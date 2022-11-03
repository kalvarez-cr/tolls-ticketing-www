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
    MenuItem,
    Autocomplete,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
// import ErrorTwoToneIcon from '@material-ui/icons/ErrorTwoTone'
// import UploadTwoToneIcon from '@material-ui/icons/UploadTwoTone'
// import Avatar from 'ui-component/extended/Avatar'
// import { gridSpacing } from 'store/constant'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps, liquidationConceptRecept } from 'types'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import AcceptButton from 'components/buttons/AcceptButton'
import EditButton from 'components/buttons/EditButton'
import CancelEditButton from 'components/buttons/CancelEditButton'
import CancelButton from 'components/buttons/CancelButton'
import AnimateButton from 'ui-component/extended/AnimateButton'
import {
    createLiquidationConceptRequest,
    updateLiquidationConceptRequest,
} from 'store/liquidationConceptInSite/liquidationConceptInSiteActions'
import { getCompaniesRequest } from 'store/company/companyActions'
import { getLiquidationConfigRequest } from 'store/liquidationConfig/liquidationConfigActions'

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
    companies: string
    percentaje: number
    criteria: string
    day: any
}

const Schema = yup.object().shape({
    companies: yup.string().required('Este campo es obligatorio'),
    percentaje: yup
        .number()
        .max(1, 'No debe ser mayor a 1')
        .typeError('Debe ser un número')
        .required('Este campo es obligatorio'),
    criteria: yup.string().required('Este campo es requerido'),
    day: yup.array().required('Este campo es requerido'),
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

    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        register,
    } = useForm<Inputs>({
        resolver: yupResolver(Schema),
    })

    const [loading, setLoading] = React.useState(false)

    const [readOnlyState, setReadOnlyState] = React.useState<
        boolean | undefined
    >(readOnly)

    const [editable, setEditable] = React.useState<boolean>(false)

    const liquidationConcept = useSelector(
        (state: DefaultRootStateProps) => state.liquidationConceptRecept
    )

    const LiquidationConfigProps = useSelector(
        (state: DefaultRootStateProps) => state.liquidationConfig
    )
    const company = useSelector((state: DefaultRootStateProps) => state.company)
    const days = useSelector(
        (state: DefaultRootStateProps) => state.login?.user?.days
    )

    const [liquidationConceptData] = React.useState<
        liquidationConceptRecept | undefined
    >(liquidationConcept?.find((liquidation) => liquidation.id === fleetId))

    const handleAbleToEdit = () => {
        setValue('day', liquidationConceptData?.settlement_days)
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
    }

    const handleCancelEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
        if (readOnlyState) {
            setValue('companies', liquidationConceptData?.company?.id)
            setValue(
                'percentaje',
                liquidationConceptData?.settlement_percentage
            )

            setValue(
                'criteria',
                liquidationConceptData?.settlement_criteria?.id
            )
        }
        // setActive(CategoryData?.active)
    }

    const handleTollSelection = (event, newValue) => {
        // @ts-ignore
        const daysIds: any[] = []
        newValue.forEach((element) => daysIds.push(element.value))
        setValue('day', daysIds)
    }

    React.useEffect(() => {
        dispatch(getCompaniesRequest({ _all_: true, per_page: 200 }))
        dispatch(getLiquidationConfigRequest({ _all_: true, per_page: 200 }))
        if (readOnlyState) {
            setValue('companies', liquidationConceptData?.company?.id)
            setValue(
                'percentaje',
                liquidationConceptData?.settlement_percentage
            )
            setValue(
                'criteria',
                liquidationConceptData?.settlement_criteria?.id
            )
        }
    }, [liquidationConceptData, setValue])

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const { companies, day, percentaje, criteria } = data

        const fetchData1 = async () => {
            setLoading(true)
            const responseData1 = await dispatch(
                createLiquidationConceptRequest({
                    company: companies,
                    settlement_days: day,
                    settlement_percentage: percentaje,
                    settlement_criteria: criteria,
                })
            )
            setLoading(false)
            return responseData1
        }
        const fetchData2 = async () => {
            setLoading(true)
            const responseData2 = await dispatch(
                updateLiquidationConceptRequest({
                    id: liquidationConceptData?.id,
                    company: companies,
                    settlement_days: day,
                    settlement_percentage: percentaje,
                    settlement_criteria: criteria,
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

        navigate(`/liquidacion`)
    }

    const handleTable = () => {
        navigate(`/liquidacion`)
    }

    const handleReturnTable = () => {
        navigate(-1)
    }

    return (
        <>
            <Grid item xs={12}>
                <Typography variant="h4">Liquidaciones</Typography>
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
                        name="companies"
                        control={control}
                        defaultValue={liquidationConceptData?.company?.id}
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
                                    label="Compañia"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    disabled={readOnlyState}
                                    error={!!errors.companies}
                                    helperText={errors.companies?.message}
                                >
                                    {company.map((option) => (
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

                    <Controller
                        name="criteria"
                        control={control}
                        defaultValue={
                            liquidationConceptData?.settlement_criteria?.id
                        }
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    select
                                    label="Criterio"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.criteria}
                                    helperText={errors.criteria?.message}
                                    disabled={readOnlyState}
                                >
                                    {LiquidationConfigProps.map((option) => (
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
                    <Controller
                        name="percentaje"
                        control={control}
                        defaultValue={
                            liquidationConceptData?.settlement_percentage
                        }
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    fullWidth
                                    label="Porcentaje"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    disabled={readOnlyState}
                                    error={!!errors.percentaje}
                                    helperText={errors.percentaje?.message}
                                />
                            </Grid>
                        )}
                    />

                    {!loading ? (
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={6}
                            className={classes.searchControl}
                        >
                            <Autocomplete
                                id="day"
                                multiple
                                options={days}
                                //@ts-ignore
                                defaultValue={liquidationConceptData?.settlement_days?.map(
                                    (day) => {
                                        const findDays = days.find(
                                            (day2) => day2.value == day
                                        ).name

                                        return {
                                            name: findDays,
                                            value: Number(day),
                                        }
                                    }
                                )}
                                autoSelect={true}
                                size="small"
                                // @ts-ignore
                                getOptionLabel={(option) => option.name}
                                loading={loading}
                                onChange={handleTollSelection}
                                loadingText="Cargando..."
                                // noOptionsText="No existen peajes."
                                disabled={readOnlyState}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        {...register('day')}
                                        name="day"
                                        label="Periodicidad"
                                        helperText={errors.day?.message}
                                        error={!!errors.day}
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
                                label="Periodicidad"
                                size="small"
                                autoComplete="off"
                                disabled={true}
                            />
                        </Grid>
                    )}
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
