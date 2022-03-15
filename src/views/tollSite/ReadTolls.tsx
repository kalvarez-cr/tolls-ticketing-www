import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
// import Chip from 'ui-component/extended/Chip'
import TableCustom from '../../components/Table'
// import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone'
import EditIcon from '@material-ui/icons/Edit'
// import VisibilityIcon from '@material-ui/icons/Visibility'
// import SelectColumnFilter from "components/Table/Filters/SelectColumnFilter";
import { IconButton } from '@material-ui/core'
import { useSelector } from 'react-redux'
// import { useDispatch } from 'react-redux'
import { DefaultRootStateProps } from 'types/index'
// import { getCardsRequest } from 'store/cards/tollsActions'

const columns = [
    {
        Header: 'Nombre ',
        accessor: 'name',
    },
    {
        Header: 'Estado',
        accessor: 'state',
    },
    {
        Header: 'Canales',
        accessor: 'tolls_lanes',
    },
    {
        Header: 'Locacion',
        accessor: 'location',
    },
    // {
    //     Header: 'Acciones admitidas',
    //     accessor: 'allowed_actions',
    // },
    // {
    //     Header: 'Soportes Admitidos',
    //     accessor: 'allowed_media',
    // },
    // {
    //     Header: 'Admite titulos asociados',
    //     accessor: 'is_ticket_allowed',
    // },
    // {
    //     Header: 'Admite recarga via web',
    //     accessor: 'web_rechargable',
    // },
    // {
    //     Header: 'Activo',
    //     accessor: 'active',
    //     disableFilters: true,
    // },
    {
        Header: 'Acciones',
        accessor: 'edit',
        disableFilters: true,
    },
]

const ReadTolls = () => {
    // States
    const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    // Customs Hooks
    // const dispatch = useDispatch()
    const navigate = useNavigate()
    // const permissions = useSelector(
    //     (state: DefaultRootStateProps) => state.login?.user?.content?.permissions
    // )
    const tolls = useSelector((state: DefaultRootStateProps) => state.tolls)
    // FUNCTIONS
    const handleEdit = useCallback((e) => {
        e.preventDefault()
        const id = e.currentTarget.dataset.id
        console.log(id)
        navigate(`/peajes/editar/${id}`)
    }, [navigate])
    // const handleView = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //     e.preventDefault()
    //     const id = e.currentTarget.dataset.id
    //     navigate(`/categoria-de-tarjetas/editar/${id}-view`)
    // }

    const handleCreate = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        navigate(`/peajes/crear`)
    }
    const onClickCell = (value: string) => {
        console.log('desde tabla')
        // e.preventDefault()

        // const id = e.currentTarget.dataset.id
        console.log('id', value)
        navigate(`/peajes/editar/${value}`)
    }

    // const handleChip = (active) => {
    //     return active ? (
    //         <Chip
    //             label="Si"
    //             size="small"
    //             chipcolor="success"
    //             sx={{ width: '96px' }}
    //         />
    //     ) : (
    //         <Chip
    //             label="No"
    //             size="small"
    //             chipcolor="orange"
    //             sx={{ width: '96px' }}
    //         />
    //     )
    // }

    //    React.useEffect(() => {
    //         dispatch(getCardsRequest())
    //     }, [dispatch])

    //EFFECTS
    React.useEffect(() => {
        console.log(tolls)
        const rows = tolls.map(({ _id, name, state, tolls_lanes, location}) => ({
            _id,
            name,
            state,
            tolls_lanes,
            location,
            edit: (
                <div className="flex">
                    <button data-id={_id} onClick={handleEdit}>
                        <IconButton color="primary">
                            <EditIcon sx={{ fontSize: '1.3rem' }} />
                        </IconButton>
                    </button>
                </div>
            ),
        }))
        setRowsInitial(rows)
    }, [tolls, handleEdit])

    return (
        <div>
            <TableCustom
                columns={columns}
                data={rowsInitial}
                title="Gestión de Peajes"
                addIconTooltip="Crear Tarjeta"
                handleCreate={handleCreate}
                onClickCell={onClickCell}
            />
        </div>
    )
}

export default ReadTolls
