import React from 'react'

import { useNavigate } from 'react-router-dom'
// import Chip from 'ui-component/extended/Chip'
import TableCustom from '../../components/Table'
// import EditIcon from '@material-ui/icons/Edit'
// import VisibilityIcon from '@material-ui/icons/Visibility'
// import SelectColumnFilter from 'components/Table/Filters/SelectColumnFilter'
// import EditIcon from '@material-ui/icons/Edit'
import VisibilityIcon from '@material-ui/icons/Visibility'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import {
    Grid,
    IconButton,
    MenuItem,
    TextField,
    Theme,
    Tooltip,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'
import { makeStyles } from '@material-ui/styles'
import { getTollsRequest } from 'store/tolls/tollsActions'
import MainCard from 'ui-component/cards/MainCard'
import { getFareByTollId, getFareRequest } from 'store/fare/FareActions'
import RemoveFare from 'components/removeForms/RemoveFare'

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
        Header: 'Peaje',
        accessor: 'sites',
        disableFilters: true,
    },
    {
        Header: 'Categoría',
        accessor: 'title',
    },
    {
        Header: 'Nombre',
        accessor: 'fare_name',
    },

    {
        Header: 'Precio',
        accessor: 'nominal_amount',
    },
    {
        Header: 'Factor por peso(Bs)',
        accessor: 'weight_factor',
    },

    {
        Header: 'Acciones',
        accessor: 'edit',
        disableFilters: true,
    },
]

const ReadCategory = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    const [loading, setLoading] = React.useState(false)
    const [open, setOpen] = React.useState<boolean>(false)
    const [modal, setModal] = React.useState<string>('')
    const [selectedId, setSelectedId] = React.useState('')

    //redux
    const navigate = useNavigate()
    const fares = useSelector((state: DefaultRootStateProps) => state.fare)
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

    const handleDeleteFare = (e) => {
        setSelectedId(e.currentTarget.dataset.id)
        setOpen(true)
        setModal('remove')
    }

    const onChange = async (e) => {
        const id = e.target.value

        const getData = async () => {
            setLoading(true)
            await dispatch(getFareByTollId({ site_id: id }))
            setLoading(false)
        }
        getData()
    }

    React.useEffect(() => {
        dispatch(getTollsRequest({ _all_: true }))
        const fetchData = async () => {
            setLoading(true)
            const data = await dispatch(getFareRequest())
            setLoading(false)
            return data
        }
        fetchData()
    }, [dispatch])

    React.useEffect(() => {
        const rows = fares.map(
            ({
                id,
                fare_name,
                title,
                nominal_amount,
                weight_factor,
                sites,
                nominal_iso_code,
            }) => ({
                id,
                fare_name,
                title,
                nominal_amount,
                weight_factor,
                sites: sites?.map((site) => <div>{site.site_name}</div>),
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
                        <Tooltip title="Ver" placement="bottom">
                            <button data-id={id} onClick={handleEdit}>
                                <IconButton color="primary">
                                    <VisibilityIcon
                                        sx={{ fontSize: '1.3rem' }}
                                    />
                                </IconButton>
                            </button>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                            <button data-id={id} onClick={handleDeleteFare}>
                                <IconButton color="primary">
                                    <RemoveCircleIcon
                                        sx={{ fontSize: '1.3rem' }}
                                    />
                                </IconButton>
                            </button>
                        </Tooltip>
                    </div>
                ),
            })
        )
        setRowsInitial(rows)
    }, [fares, handleEdit])

    return (
        <>
            <form>
                <MainCard content={true}>
                    <Grid container>
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
                                onChange={onChange}
                            >
                                {tolls.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                </MainCard>
            </form>

            <div className="my-6">
                <TableCustom
                    columns={columns}
                    data={rowsInitial}
                    title=" Categorías de tarifas"
                    addIconTooltip="Añadir tarifas"
                    handleCreate={handleCreate}
                    loading={loading}
                />
            </div>

            {modal === 'remove' ? (
                <RemoveFare
                    open={open}
                    setOpen={setOpen}
                    selectedId={selectedId}
                />
            ) : null}
        </>
    )
}

export default ReadCategory
