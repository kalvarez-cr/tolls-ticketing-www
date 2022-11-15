import React from 'react'
import * as yup from 'yup'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'

import {
    Grid,
    TextField,
    Theme,
    Typography,
    CardActions,
    Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import { useSelector } from 'react-redux'
import { DefaultRootStateProps, LiquidationConfigProps } from 'types'

import { useDispatch } from 'react-redux'

import { useNavigate } from 'react-router'

import AcceptButton from 'components/buttons/AcceptButton'
import EditButton from 'components/buttons/EditButton'
import CancelEditButton from 'components/buttons/CancelEditButton'
import CancelButton from 'components/buttons/CancelButton'
import AnimateButton from 'ui-component/extended/AnimateButton'
import {
    createLiquidationConfigRequest,
    updateLiquidationConfigRequest,
} from 'store/liquidationConfig/liquidationConfigActions'

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
    settlement_code: string
    description: string
    name: string
    criteria: string
    abbreviation: string
}

const Schema = yup.object().shape({
    settlement_code: yup
        .string()
        .min(4, 'Debe tener 4 caracteres')
        .max(4, 'Debe tener máximo 4 caracteres')
        .required('Este campo es obligatorio'),
    name: yup
        .string()
        .max(25, 'Debe tener máximo 25 caracteres')
        .required('Este campo es obligatorio'),
    description: yup
        .string()
        .max(40, 'Debe tener máximo 40 caracteres')
        .required('Este campo es requerido'),
    criteria: yup
        .string()
        .max(20, 'Debe tener máximo 20 caracteres')
        .required('Este campo es obligatorio'),
    abbreviation: yup
        .string()
        .max(8, 'Debe tener máximo 8 caracteres')
        .required('Este campo es obligatorio'),
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
    } = useForm<Inputs>({
        resolver: yupResolver(Schema),
    })

    const [loading, setLoading] = React.useState(false)

    const [readOnlyState, setReadOnlyState] = React.useState<
        boolean | undefined
    >(readOnly)

    const [editable, setEditable] = React.useState<boolean>(false)

    const liquidations = useSelector(
        (state: DefaultRootStateProps) => state.liquidationConfig
    )
    const [LiquidationConfigData] = React.useState<
        LiquidationConfigProps | undefined
    >(liquidations?.find((liquidation) => liquidation.id === fleetId))

    const handleAbleToEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
    }

    const handleCancelEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
        if (readOnlyState) {
            setValue('settlement_code', LiquidationConfigData?.settlement_code)
            setValue('name', LiquidationConfigData?.name)
            setValue('description', LiquidationConfigData?.description)
            setValue('criteria', LiquidationConfigData?.criteria)
            setValue('abbreviation', LiquidationConfigData?.abbreviation)
        }
        // setActive(CategoryData?.active)
    }

    React.useEffect(() => {
        if (readOnlyState) {
            setValue('settlement_code', LiquidationConfigData?.settlement_code)
            setValue('name', LiquidationConfigData?.name)
            setValue('description', LiquidationConfigData?.description)
            setValue('criteria', LiquidationConfigData?.criteria)
            setValue('abbreviation', LiquidationConfigData?.abbreviation)
        }
    }, [LiquidationConfigData, setValue])

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const { name, description, settlement_code, abbreviation, criteria } =
            data

        const fetchData1 = async () => {
            setLoading(true)
            const responseData1 = await dispatch(
                createLiquidationConfigRequest({
                    settlement_code,
                    description,
                    name,
                    abbreviation,
                    criteria,
                })
            )
            setLoading(false)
            return responseData1
        }
        const fetchData2 = async () => {
            setLoading(true)
            const responseData2 = await dispatch(
                updateLiquidationConfigRequest({
                    id: LiquidationConfigData?.id,
                    settlement_code,
                    description,
                    name,
                    abbreviation,
                    criteria,
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

        navigate(`/liquidaciones`)
    }

    const handleTable = () => {
        navigate(`/liquidaciones`)
    }

    const handleReturnTable = () => {
        navigate(-1)
    }

    return (
        <>
            <Grid item xs={12}>
                <Typography variant="h4">
                    Configuración de liquidaciones
                </Typography>
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
                        name="settlement_code"
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
                                    error={!!errors.settlement_code}
                                    helperText={errors.settlement_code?.message}
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
                    />
                    <Controller
                        name="criteria"
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
                                    label="Criterio"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    disabled={readOnlyState}
                                    error={!!errors.criteria}
                                    helperText={errors.criteria?.message}
                                />
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
