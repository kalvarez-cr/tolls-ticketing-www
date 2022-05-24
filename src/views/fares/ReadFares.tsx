import React from 'react'
import * as yup from 'yup'

import { useNavigate } from 'react-router-dom'
// import Chip from 'ui-component/extended/Chip'
import TableCustom from '../../components/Table'
// import EditIcon from '@material-ui/icons/Edit'
// import VisibilityIcon from '@material-ui/icons/Visibility'
// import SelectColumnFilter from 'components/Table/Filters/SelectColumnFilter'
import EditIcon from '@material-ui/icons/Edit'
import {
    Button,
    Grid,
    IconButton,
    MenuItem,
    TextField,
    Theme,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'
import { getFareAllRequest } from 'store/fareUnique/FareOneActions'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { makeStyles } from '@material-ui/styles'
import { yupResolver } from '@hookform/resolvers/yup'
import AnimateButton from 'ui-component/extended/AnimateButton'
import { getTollsRequest } from 'store/tolls/tollsActions'

const useStyles = makeStyles((theme: Theme) => ({
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

const columns = [
    {
        Header: 'Nombre',
        accessor: 'fare_name',
    },
    {
        Header: 'Categoría',
        accessor: 'title',
    },
    {
        Header: 'Precio',
        accessor: 'nominal_amount',
    },
    {
        Header: 'Factor por peso(Bs)',
        accessor: 'weight_factor',
    },
    // {
    //     Header: 'Status',
    //     accessor: 'active',
    //     disableFilters: true,
    // },
    {
        Header: 'Acciones',
        accessor: 'edit',
        disableFilters: true,
    },
]

interface Inputs {
    site_id: string
}

const Schema = yup.object().shape({
    site_id: yup.string().required('Este campo es requerido'),
})
const ReadCategory = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: yupResolver(Schema),
    })

    const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    const [loading, setLoading] = React.useState(false)
    const navigate = useNavigate()
    const fares = useSelector((state: DefaultRootStateProps) => state.fares)
    const tolls = useSelector((state: DefaultRootStateProps) => state.tolls)
    const handleEdit = React.useCallback(
        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault()
            const id = e.currentTarget.dataset.id
            navigate(`/tarifas/editar/${id}`)
        },
        [navigate]
    )

    // const handleView = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //     e.preventDefault()
    //     const id = e.currentTarget.dataset.id
    //     navigate(`/gestion-de-tarifas/editar/${id}-view`)
    // }

    const handleCreate = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        navigate(`/tarifas/crear`)
    }

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const { site_id } = data

        const getData = async () => {
            setLoading(false)
            await dispatch(getFareAllRequest({ site_id }))
            setLoading(true)
        }
        getData()
    }

    React.useEffect(() => {
        dispatch(getTollsRequest())
    }, [dispatch])

    React.useEffect(() => {
        const rows = fares.map(
            ({ id, fare_name, title, nominal_amount, weight_factor }) => ({
                id,
                fare_name,
                title,
                nominal_amount,
                weight_factor,
                // active: active ? (
                //     <Chip
                //         label="Habilitado"
                //         size="small"
                //         chipcolor="success"
                //         sx={{ width: '96px' }}
                //     />
                // ) : (
                //     <Chip
                //         label="Deshabilitado"
                //         size="small"
                //         chipcolor="orange"
                //         sx={{ width: '96px' }}
                //     />
                // ),
                edit: (
                    <div className="flex">
                        <button data-id={id} onClick={handleEdit}>
                            <IconButton color="primary">
                                <EditIcon sx={{ fontSize: '1.3rem' }} />
                            </IconButton>
                        </button>
                    </div>
                ),
            })
        )
        setRowsInitial(rows)
    }, [fares, handleEdit])

    return (
        <>
            {!loading ? (
                <>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2} sx={{ marginTop: '5px' }}>
                            <Controller
                                name="site_id"
                                control={control}
                                render={({ field }) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        className={classes.searchControl}
                                    >
                                        <TextField
                                            select
                                            fullWidth
                                            label="Peaje"
                                            size="small"
                                            autoComplete="off"
                                            {...field}
                                            error={!!errors.site_id}
                                            helperText={errors.site_id?.message}
                                        >
                                            {tolls.map((option) => (
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
                        </Grid>
                        <Grid container justifyContent="center">
                            <Grid
                                item
                                sx={{
                                    display: 'flex',
                                    marginLeft: '85px',
                                    marginTop: '-40px',
                                }}
                            >
                                <AnimateButton>
                                    <Button
                                        variant="contained"
                                        size="medium"
                                        type="submit"
                                    >
                                        Buscar
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </form>
                </>
            ) : (
                <TableCustom
                    columns={columns}
                    data={rowsInitial}
                    title=" Categorías de tarifas"
                    addIconTooltip="Añadir tarifas"
                    handleCreate={handleCreate}
                />
            )}
        </>
    )
}

export default ReadCategory
