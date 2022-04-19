import React from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
// import { useSelector } from 'react-redux'
// import { v4 as uuidv4 } from 'uuid'
import {
    useForm,
    SubmitHandler,
    Controller,
    SubmitErrorHandler,
} from 'react-hook-form'
// import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'
// material-ui
import { makeStyles } from '@material-ui/styles'
import {
    Grid,
    Button,
    TextField,
    Theme,
    Typography,
    // FormControlLabel,
    // Checkbox,
    CardActions,
    Divider,
    // FormHelperText,
    // Switch,
    // MenuItem,
} from '@material-ui/core'
import AnimateButton from 'ui-component/extended/AnimateButton'

import { useDispatch } from 'react-redux'
// project imports
import { gridSpacing } from 'store/constant'
import { createTollsRequest, updateTollRequest } from 'store/tolls/tollsActions'
// import { DefaultRootStateProps } from 'types'

// style constant
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
    searchControl: {
        width: '100%',
        paddingRight: '16px',
        paddingLeft: '16px',
        '& input': {
            background: 'transparent !important',
            paddingLeft: '5px !important',
        },
        '& .Mui-focused input': {
            boxShadow: 'none',
        },
        [theme.breakpoints.down('lg')]: {
            width: '250px',
        },
        [theme.breakpoints.down('md')]: {
            width: '100%',
            marginLeft: '4px',
            background:
                theme.palette.mode === 'dark'
                    ? theme.palette.dark[800]
                    : '#fff',
        },
    },
    ButtonControl: {
        width: '50%',
        '& input': {
            color: ' transparent !important',
            marginLeft: '5px',
        },
        [theme.breakpoints.down('md')]: {
            background:
                theme.palette.mode === 'dark'
                    ? theme.palette.dark[800]
                    : '#ffff',
        },
    },
    borderDebug: {
        border: '1px solid red',
    },
    input: {
        opacity: 0,
        position: 'absolute',
        zIndex: 1,
        padding: 0.5,
        cursor: 'pointer',
        width: '30%',
    },
}))

//types form
interface Inputs {
    name: string
    site_code: string
    city: string
    state: string
    road: string
    start_point: string
    end_point: string
}
//schema validation
const Schema = yup.object().shape({
    name: yup
        .string()
        .required('Este campo es requerido')
        .min(5, 'Mínimo 5 caracteres')
        .max(50, 'Máximo 50 caracteres'),
    state: yup
        .string()
        .required('Este campo es requerido')
        .min(5, 'Mínimo 5 caracteres')
        .max(50, 'Máximo 50 caracteres'),
    road: yup
        .string()
        .required('Este campo es requerido')
        .min(10, 'Mínimo 10 caracteres')
        .max(100, 'Máximo 100 caracteres'),
    site_code: yup
        .string()
        .required('Este campo es requerido')
        .min(5, 'Mínimo 5 caracteres')
        .max(100, 'Máximo 100 caracteres'),
    city: yup
        .string()
        .required('Este campo es requerido')
        .min(5, 'Mínimo 5 caracteres')
        .max(100, 'Máximo 100 caracteres'),
    start_point: yup.string().required('Este campo es requerido'),
    end_point: yup.string().required('Este campo es requerido'),
})
// ==============================|| COMPANY PROFILE FORM ||============================== //
interface CompanyProfileFormProps {
    tollIdParam?: string
    readOnly?: boolean
    onlyView?: boolean
    setTabValue?: any
    tollData?: any
    handleFollowing: (num: number) => void
    following?: boolean
}

const LineForm = ({
    tollIdParam,
    readOnly,
    setTabValue,
    tollData,
    handleFollowing,
    following,
}: CompanyProfileFormProps) => {
    // CUSTOMS HOOKS
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const tolls = useSelector((state: DefaultRootStateProps) => state.tolls)
    console.log(tollData)
    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        // getValues,
    } = useForm<Inputs>({
        resolver: yupResolver(Schema),
    })
    // STATES
    const [readOnlyState, setReadOnlyState] = React.useState<
        boolean | undefined
    >(readOnly)
    const [editable, setEditable] = React.useState<boolean>(false)

    // FUNCTIONS
    // const optionsCompanies = companies.map((company) => {
    //     return {
    //         label: company.name,
    //         value: company.company_code,
    //     }
    // })

    const onInvalid: SubmitErrorHandler<Inputs> = (data, e) => {}
    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        const { name, site_code, city, state, road, start_point, end_point } =
            data
        if (!editable) {
            dispatch(
                createTollsRequest({
                    name,
                    site_code,
                    city,
                    state,
                    road,
                    start_point,
                    end_point,
                    location: { coordinates: [] },
                    lanes: [],
                    equips: [],
                    employers: [],
                    fares: [],
                })
            )
            navigate(`/peajes/editar/${tollIdParam}&&following`)
        }
        if (editable) {
            const to = tollData.find((fi) => fi.id === tollIdParam)
            let tol
            if (to !== undefined) {
                tol = {
                    id: tollIdParam,
                    name,
                    site_code,
                    city,
                    state,
                    road,
                    start_point,
                    end_point,
                    lanes: to.lanes,
                    equips: to.equips,
                    employers: to.employers,
                    fares: to.fares,
                }
            }
            dispatch(updateTollRequest(tol))
            handleAbleToEdit()

            navigate(`/peajes/editar/${tollIdParam}`)
        }
    }

    const handleAbleToEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
    }

    const handleCancelEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)

        setValue('name', tollData?.name)
        setValue('state', tollData?.state)
        setValue('site_code', tollData?.site_code)
        setValue('city', tollData?.city)
        setValue('road', tollData?.road)
        setValue('start_point', tollData?.start_point)
        setValue('end_point', tollData?.end_point)
    }

    React.useEffect(() => {
        setValue('name', tollData?.name)
        setValue('state', tollData?.state)
        setValue('site_code', tollData?.site_code)
        setValue('city', tollData?.city)
        setValue('road', tollData?.road)
        setValue('start_point', tollData?.start_point)
        setValue('end_point', tollData?.end_point)
    }, [tollData])

    const handleEditCoordinates = () => {
        // setReadOnlyState(!readOnlyState)
        // setEditable(!editable)
        navigate(`/peajes/${tollData.id}`)

    }

    return (
        <>
            <Grid
                item
                xs={12}
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h4"> Datos del peaje </Typography>
                {readOnlyState ? (
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
                ) : null}
            </Grid>

            <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
                <Grid container spacing={gridSpacing} sx={{ marginTop: '5px' }}>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="name"
                            control={control}
                            // defaultValue={tollData?.name || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Nombre"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                    disabled={readOnlyState}
                                />
                            )}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="site_code"
                            control={control}
                            // defaultValue={tollData?.toll_id || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Código del peaje"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.site_code}
                                    helperText={errors.site_code?.message}
                                    disabled={readOnlyState}
                                />
                            )}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="city"
                            control={control}
                            // defaultValue={tollData?.toll_id || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Ciudad"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.city}
                                    helperText={errors.city?.message}
                                    disabled={readOnlyState}
                                />
                            )}
                        />
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="state"
                            control={control}
                            // defaultValue={tollData?.state || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Estado"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.state}
                                    helperText={errors.state?.message}
                                    disabled={readOnlyState}
                                />
                            )}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="road"
                            control={control}
                            // defaultValue={tollData?.road || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Autopista"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.road}
                                    helperText={errors.road?.message}
                                    disabled={readOnlyState}
                                />
                            )}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="start_point"
                            control={control}
                            // defaultValue={tollData?.start_point || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Progresiva de inicio"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.start_point}
                                    helperText={errors.start_point?.message}
                                    disabled={readOnlyState}
                                />
                            )}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="end_point"
                            control={control}
                            // defaultValue={tollData?.end_point || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Progresiva final"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.end_point}
                                    helperText={errors.end_point?.message}
                                    disabled={readOnlyState}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item>
                        <AnimateButton>
                            <Button
                                className="w-full"
                                variant="contained"
                                size="large"
                                type="button"
                                onClick={handleEditCoordinates}
                            >
                                Editar Ubicación
                            </Button>
                        </AnimateButton>
                    </Grid>
                </Grid>

                <Divider sx={{ marginTop: '70px' }} />
                <CardActions>
                    <Grid container justifyContent="flex-end" spacing={0}>
                        {editable ? (
                            <Grid item sx={{ display: 'flex' }}>
                                <AnimateButton>
                                    <Button
                                        //variant="contained"
                                        color="error"
                                        size="large"
                                        onClick={handleCancelEdit}
                                        className="mx-4"
                                    >
                                        Cancelar
                                    </Button>
                                </AnimateButton>
                                <AnimateButton>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        type="submit"
                                        // onclick={}
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
                                        size="large"
                                        type="submit"
                                    >
                                        Siguiente
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        )}
                        {/* <Grid item>
                                <AnimateButton>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        onClick={() => {handleFollowing(1)}}
                                    >
                                        Crear canal
                                    </Button>
                                </AnimateButton>
                            </Grid> */}
                    </Grid>
                </CardActions>
            </form>
        </>
    )
}

export default LineForm