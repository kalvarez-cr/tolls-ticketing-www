import React from 'react'

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
import { getMunicipalityRequest } from 'store/municipality/municipalityAction'
import { getStatesRequest } from 'store/states/stateAction'
import { getRoadsRequest } from 'store/roads/roadsActions'
import { getCategorySiteRequest } from 'store/categorySite/categorySiteActions'
import { getCompaniesRequest } from 'store/company/companyActions'

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
    highway: string
    start_point: string
    end_point: string
    category: string
    company: string
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
    highway: yup
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
        .transform((value) => (isNaN(value) ? undefined : value))
        .positive('Debe ser un número positivo')
        .required('Este campo es requerido'),
    end_point: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .min(0, 'Mínimo km 0')
        .required('Este campo es requerido'),
    category: yup.string().required('Este campo es requerido'),
    company: yup.string().required('Este campo es requerido'),
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
    const states = useSelector(
        (state: DefaultRootStateProps) => state.login.user.states
    )

    const roads = useSelector((state: DefaultRootStateProps) => state.roads)
    const cities = useSelector(
        (state: DefaultRootStateProps) => state.municipality
    )
    const categories = useSelector(
        (state: DefaultRootStateProps) => state.categorySite
    )
    const companies = useSelector(
        (state: DefaultRootStateProps) => state.company
    )
    const {
        handleSubmit,
        control,
        formState: { errors },
        getValues,
        watch,
    } = useForm<Inputs>({
        resolver: yupResolver(Schema),
        mode: 'onChange',
    })
    // STATES
    const [loading, setLoading] = React.useState<boolean>(false)

    // FUNCTIONS
    // const optionsCompanies = companies.map((company) => {
    //     return {
    //         label: company.name,
    //         value: company.company_code,
    //     }
    // })

    const onInvalid: SubmitErrorHandler<Inputs> = (data, e) => {}
    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        const {
            name,
            site_code,
            city,
            state,
            highway,
            start_point,
            end_point,
            company,
            category,
        } = data
        const fetchData = async () => {
            setLoading(true)
            const responseData = await dispatch(
                createTollsRequest({
                    name,
                    site_code,
                    city,
                    state,
                    road: highway,
                    company,
                    category,
                    start_point: Number(start_point),
                    end_point: Number(end_point),
                    location,
                    // lanes: [],
                    // equips: [],
                    // employers: [],
                    fares: [],
                })
            )
            setLoading(false)
            return responseData
        }
        fetchData()
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
    React.useEffect(() => {
        dispatch(getStatesRequest())
        dispatch(getRoadsRequest({ _all_: true }))
        dispatch(getCategorySiteRequest({ _all_: true }))
        dispatch(getCompaniesRequest({ _all_: true }))
    }, [])

    React.useEffect(() => {
        dispatch(getMunicipalityRequest({ state: getValues('state') }))
    }, [watch('state')])

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
                                md={6}
                                className={classes.searchControl}
                            >
                                <Controller
                                    name="company"
                                    control={control}
                                    defaultValue={tollData?.company?.name}
                                    render={({ field }) => (
                                        <TextField
                                            select
                                            {...field}
                                            fullWidth
                                            label="Compañía"
                                            size="small"
                                            autoComplete="off"
                                            error={!!errors.company}
                                            helperText={errors.company?.message}
                                        >
                                            {companies.map((option) => (
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
                                    name="category"
                                    control={control}
                                    defaultValue={tollData?.category?.name}
                                    render={({ field }) => (
                                        <TextField
                                            select
                                            {...field}
                                            fullWidth
                                            label="Categoría"
                                            size="small"
                                            autoComplete="off"
                                            error={!!errors.category}
                                            helperText={
                                                errors.category?.message
                                            }
                                        >
                                            {categories.map((option) => (
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
                                    defaultValue={tollData?.city?.name}
                                    render={({ field }) => (
                                        <TextField
                                            select
                                            {...field}
                                            fullWidth
                                            label="Municipio"
                                            size="small"
                                            autoComplete="off"
                                            error={!!errors.city}
                                            helperText={errors.city?.message}
                                            disabled={!watch('state')}
                                        >
                                            {cities.map((option) => (
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
                                    name="highway"
                                    control={control}
                                    defaultValue={tollData?.road?.name}
                                    render={({ field }) => (
                                        <TextField
                                            select
                                            {...field}
                                            fullWidth
                                            label="Autopista"
                                            size="small"
                                            autoComplete="off"
                                            error={!!errors.highway}
                                            helperText={errors.highway?.message}
                                        >
                                            {roads.map((option) => (
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
                                                {loading ? (
                                                    <>
                                                        <svg
                                                            role="status"
                                                            className="inline w-4 h-4 mr-3 text-white animate-spin"
                                                            viewBox="0 0 100 101"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                                fill="#E5E7EB"
                                                            />
                                                            <path
                                                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                                fill="currentColor"
                                                            />
                                                        </svg>
                                                        Cargando...
                                                    </>
                                                ) : (
                                                    <>Crear</>
                                                )}
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
                                    value={tollData?.company?.name}
                                    fullWidth
                                    label="Compañia"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.category}
                                    helperText={errors.company?.message}
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
                                    value={tollData?.category?.name}
                                    fullWidth
                                    label="Categoría"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.category}
                                    helperText={errors.category?.message}
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
                                    value={tollData?.state?.name}
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
                                    value={tollData?.city?.name}
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
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    value={tollData?.road?.name}
                                    fullWidth
                                    label="Autopista"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.highway}
                                    helperText={errors.highway?.message}
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
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <svg
                                                role="status"
                                                className="inline w-4 h-4 mr-3 text-white animate-spin"
                                                viewBox="0 0 100 101"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                    fill="#E5E7EB"
                                                />
                                                <path
                                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                            Cargando...
                                        </>
                                    ) : (
                                        <>Detalles</>
                                    )}
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
