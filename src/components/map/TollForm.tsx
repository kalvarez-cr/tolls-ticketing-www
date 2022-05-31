// import React from 'react'

//react-hook-form
import {
    useForm,
    Controller,
    SubmitHandler,
    SubmitErrorHandler,
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// material-ui
import {
    Grid,
    TextField,
    Theme,
    // MenuItem,
    Button,
    Typography,
    // FormControlLabel,
    // Switch,
    // Divider,
    CardActions,
    MenuItem,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import AnimateButton from 'ui-component/extended/AnimateButton'
// import AlertDialog from 'components/AlertDialog'
// import MainCard from 'ui-component/cards/MainCard'
import { gridSpacing } from 'store/constant'
import { createTollsRequest } from 'store/tolls/tollsActions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import MainCard from 'ui-component/cards/MainCard'
// import { useNavigate } from 'react-router'
import SubCard from 'ui-component/cards/SubCard'
import { DefaultRootStateProps, TTollsSite } from 'types'
// import { getStatesRequest } from 'store/states/stateAction'
import { onKeyDown } from 'components/utils'

// import {
//     createStops,
//     deleteStops,
//     updateStops,
// } from 'store/StopsAndZones/StopsAndZonesActions'
// import { getCompaniesRequest } from 'store/operatingCompany/operatingCompanyActions'

const useStyles = makeStyles((theme: Theme) => ({
    searchControl: {
        width: '100%',
        // paddingRight: '10px',
        // paddingLeft: '10px',

        '& input': {
            background: 'transparent !important',
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
    visibility: {
        display: 'none',
    },
}))

interface Inputs {
    name: string
    site_code: string
    city: string
    state: string
    road: string
    start_point: string
    end_point: string
}
const Schema = yup.object().shape({
    name: yup
        .string()
        .required('Este campo es requerido')
        .min(4, 'Mínimo 4 caracteres')
        .max(100, 'Máximo 100 caracteres'),
    state: yup
        .string()
        .required('Este campo es requerido')
        .min(5, 'Mínimo 5 caracteres')
        .max(50, 'Máximo 50 caracteres'),
    road: yup
        .string()
        .required('Este campo es requerido')
        .min(4, 'Mínimo 4 caracteres')
        .max(60, 'Máximo 60 caracteres'),
    site_code: yup
        .string()
        .matches(/^\D{3}\d{3}$/, 'Debe tener 3 letras y 3 números ')
        .required('Este campo es requerido')
        .required('Este campo es requerido')
        .min(6, 'Mínimo 6 caracteres')
        .max(6, 'Máximo 6 caracteres'),
    city: yup
        .string()
        .required('Este campo es requerido')
        .min(4, 'Mínimo 4 caracteres')
        .max(100, 'Máximo 100 caracteres'),
    start_point: yup
        .number()
        .min(0, 'Mínimo km 0')
        .required('Este campo es requerido'),
    end_point: yup
        .number()
        .min(0, 'Mínimo km 0')
        .required('Este campo es requerido'),
})

interface TollFormProps {
    tollIdParam?: string
    readOnly?: boolean
    onlyView?: boolean
    setTabValue?: any
    tollData?: TTollsSite
    following?: boolean
    location: Array<string>
    setOpen: any
    setCreateMarker: any
    createMode: boolean
}
const TollForm = ({
    tollIdParam,
    readOnly,
    setTabValue,
    tollData,
    following,
    location,
    setOpen,
    setCreateMarker,
    createMode,
}: TollFormProps) => {
    // CUSTOMS HOOKS
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const states = useSelector((state: DefaultRootStateProps) => state.login.user.states)
    const {
        handleSubmit,
        control,
        formState: { errors },
        // getValues,
    } = useForm<Inputs>({
        resolver: yupResolver(Schema),
    })
    // STATES

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
        dispatch(
            createTollsRequest({
                name,
                site_code,
                city,
                state,
                road,
                start_point,
                end_point,
                location,
                lanes: [],
                equips: [],
                employers: [],
                fares: [],
            })
        )
        setOpen(false)
        setCreateMarker([])
        // navigate(`/peajes/editar/${tollIdParam}`)
    }

    const handleAbleToEdit = () => {
        // setReadOnlyState(!readOnlyState)
        // setEditable(!editable)
        navigate(`/peajes/editar/${tollData?.id}`)
    }

    // EFFECTS

    // React.useEffect(() => {
    //     dispatch(getStatesRequest())
    // }, [dispatch])

    return (
        <>
            <MainCard>
                <Grid
                    item
                    xs={12}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                ></Grid>
                {createMode ? (
                    <form
                        onSubmit={handleSubmit(onSubmit, onInvalid)}
                        className="m-2"
                    >
                        <Typography variant="h4"> Datos del peaje </Typography>
                        <Grid
                            container
                            spacing={gridSpacing}
                            sx={{ marginTop: '5px' }}
                        >
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
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
                                            helperText={
                                                errors.site_code?.message
                                            }
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
                                            select
                                            label="Estado"
                                            size="small"
                                            autoComplete="off"
                                            error={!!errors.state}
                                            helperText={errors.state?.message}
                                        >
                                            {states.map((option) => (
                                                <MenuItem
                                                    key={option.id}
                                                    value={option.id}
                                                >
                                                    {option.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
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
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
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
                                            // onKeyDown={onKeyDown}
                                            type="number"
                                            label="Progresiva de inicio(km)"
                                            size="small"
                                            autoComplete="off"
                                            error={!!errors.start_point}
                                            helperText={
                                                errors.start_point?.message
                                            }
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
                                            type="number"
                                            // onKeyDown={onKeyDown}
                                            label="Progresiva final(km)"
                                            size="small"
                                            autoComplete="off"
                                            error={!!errors.end_point}
                                            helperText={
                                                errors.end_point?.message
                                            }
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>

                        {/* <Divider sx={{ marginTop: '20px' }} /> */}
                        <CardActions>
                            <Grid
                                container
                                justifyContent="flex-end"
                                spacing={0}
                            >
                                {readOnly ? null : (
                                    <Grid item>
                                        <AnimateButton>
                                            <Button
                                                variant="contained"
                                                size="large"
                                                type="submit"
                                            >
                                                Crear
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
                ) : (
                    <SubCard
                        title={
                            <div className="text-center">
                                <h1>{`${tollData?.site_code} - ${tollData?.name}`}</h1>
                            </div>
                        }
                        // className="p-2"
                        contentClass="p-4"
                    >
                        {/* <div className='flex justify-evenly my-4'>
                            <h1>Autopista: </h1>
                            <h1>{tollData?.road}</h1>
                        </div>
                        <div className='flex justify-evenly my-4'>
                            <h1>Estado: </h1>
                            <h1>{tollData?.state}</h1>
                        </div>
                        <div className='flex justify-evenly my-4'>
                            <h1>Ciudad: </h1>
                            <h1>{tollData?.city}</h1>
                        </div> */}
                        <Grid
                            container
                            spacing={gridSpacing}
                            // sx={{ margin: '5px' }}
                        >
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    value={states.find((state) => state.id === tollData?.state).name}
                                    fullWidth
                                    label="Estado"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.state}
                                    helperText={errors.state?.message}
                                    disabled
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    value={tollData?.city}
                                    fullWidth
                                    label="Ciudad"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.city}
                                    helperText={errors.city?.message}
                                    disabled
                                />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                className={classes.searchControl}
                            >
                                <TextField
                                    value={tollData?.road}
                                    fullWidth
                                    label="Autopista"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.road}
                                    helperText={errors.road?.message}
                                    disabled
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    value={tollData?.start_point}
                                    fullWidth
                                    onKeyDown={onKeyDown}
                                    label="Progresiva de inicio(km)"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.start_point}
                                    helperText={errors.start_point?.message}
                                    disabled
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    value={tollData?.end_point}
                                    fullWidth
                                    onKeyDown={onKeyDown}
                                    label="Progresiva final(km)"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.end_point}
                                    helperText={errors.end_point?.message}
                                    disabled
                                />
                            </Grid>
                        </Grid>
                    </SubCard>
                )}
                {!createMode ? (
                    <Grid item sx={{ marginRight: '16px' }}>
                        <div className="flex justify-center mt-6">
                            <AnimateButton>
                                <Button
                                    variant="contained"
                                    size="large"
                                    onClick={handleAbleToEdit}
                                >
                                    Editar
                                </Button>
                            </AnimateButton>
                        </div>
                    </Grid>
                ) : null}
            </MainCard>
        </>
    )
}

export default TollForm
