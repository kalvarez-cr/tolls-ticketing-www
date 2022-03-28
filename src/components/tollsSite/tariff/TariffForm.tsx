import React from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
// import { v4 as uuidv4 } from 'uuid'
import {
    useForm,
    SubmitHandler,
    Controller,
    SubmitErrorHandler,
} from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
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
    MenuItem,
} from '@material-ui/core'
import AnimateButton from 'ui-component/extended/AnimateButton'

import { useDispatch, useSelector } from 'react-redux'
// project imports
import { gridSpacing } from 'store/constant'
import { addTolls, updateTolls } from 'store/tolls/tollsActions'
import { DefaultRootStateProps } from 'types'
import { CATEGORY, PESO } from '_mockApis/toll/mockToll'

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
    peso: string
    abbreviation: string
    category: string
    price: string
}
//schema validation
const Schema = yup.object().shape({
    peso: yup.string().required('Este campo es requerido'),
    abbreviation: yup.string().required('Este campo es requerido'),
    category: yup.string().required('Este campo es requerido'),
    price: yup.string().required('Este campo es requerido'),
})
// ==============================|| COMPANY PROFILE FORM ||============================== //
interface CompanyProfileFormProps {
    tollIdParam?: string
    readOnly?: boolean
    onlyView?: boolean
    setTabValue?: any
    tollData?: any
    handleEditLanes?: () => void
    dataTariff?: any
    handleTable: () => void
    handleCreateNew: (boo: boolean) => void
}

const TariffForm = ({
    tollIdParam,
    readOnly,
    setTabValue,
    tollData,
    handleEditLanes,
    dataTariff,
    handleTable,
    handleCreateNew,
}: CompanyProfileFormProps) => {
    // CUSTOMS HOOKS
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const toll = useSelector((state: DefaultRootStateProps) => state.tolls)

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
        const { peso, abbreviation, category, price } = data

        if (!editable) {
            console.log('new')
            const _id = uuidv4()
            const to = toll.find((fi) => fi.id === tollIdParam)
            const len = to?.tariff.length
            to?.tariff.push({
                _id,
                peso,
                abbreviation,
                category,
                price,
            })
            dispatch(addTolls(to))
            navigate(`/peajes/editar/${tollIdParam}&&following`)
            if (len && len > 0) {
                handleCreateNew(false)
            }
        }
        if (editable) {
            const to = toll.find((fi) => fi.id === tollIdParam)
            console.log('edit to ', to)
            if (to !== undefined) {
                let t = to?.tariff.filter((fin) => fin._id !== dataTariff._id)
                console.log('edit', t)
                to.tariff = t
                to.tariff.push({
                    _id: dataTariff._id,
                    peso,
                    abbreviation,
                    category,
                    price,
                })
            }
            console.log(to)

            // to?.lanes.find()
            console.log('new')
            dispatch(updateTolls(to))
            navigate(`/peajes/editar/${tollIdParam}`)
            handleTable()
        }
    }

    const handleAbleToEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
    }
    // const handleActive = () => {
    //     setValue('active', !active, {
    //         shouldValidate: true,
    //     })
    //     setActive(!active)
    //     // setEqualBankInfo(false)
    // }

    const handleCancelEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
        setValue('peso', tollData?.peso, {
            shouldValidate: true,
        })
        setValue('abbreviation', tollData?.abbreviation, {
            shouldValidate: true,
        })
        setValue('category', tollData?.category, {
            shouldValidate: true,
        })
        setValue('price', tollData?.price, {
            shouldValidate: true,
        })
    }

    // EFFECTS
    // VALIDATE CHECKS BOX

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
                <Typography variant="h4"> Datos de canales </Typography>
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
                    <Controller
                        name="peso"
                        control={control}
                        rules={{ required: true }}
                        defaultValue={dataTariff?.peso || ''}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    select
                                    label="Peso"
                                    fullWidth
                                    size="small"
                                    {...field}
                                    error={!!errors.peso}
                                    helperText={errors.peso?.message}
                                    disabled={readOnlyState}
                                >
                                    {PESO.map((option) => (
                                        <MenuItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        )}
                    />

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="abbreviation"
                            control={control}
                            defaultValue={dataTariff?.abbreviation || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Tipo de moneda"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.abbreviation}
                                    helperText={errors.abbreviation?.message}
                                    disabled={readOnlyState}
                                />
                            )}
                        />
                    </Grid>
                    <Controller
                        name="category"
                        control={control}
                        rules={{ required: true }}
                        defaultValue={dataTariff?.category || ''}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    select
                                    label="Categoria"
                                    fullWidth
                                    size="small"
                                    {...field}
                                    error={!!errors.category}
                                    helperText={errors.category?.message}
                                    disabled={readOnlyState}
                                >
                                    {CATEGORY.map((option) => (
                                        <MenuItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        )}
                    />
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="price"
                            control={control}
                            defaultValue={dataTariff?.price || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Precio"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.price}
                                    helperText={errors.price?.message}
                                    disabled={readOnlyState}
                                />
                            )}
                        />
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
                    </Grid>
                </CardActions>
            </form>
        </>
    )
}

export default TariffForm
