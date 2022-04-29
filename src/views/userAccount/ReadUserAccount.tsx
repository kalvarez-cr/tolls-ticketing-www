import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Chip from 'ui-component/extended/Chip'
import TableCustom from '../../components/Table'
import EditIcon from '@material-ui/icons/Edit'
// import VisibilityIcon from '@material-ui/icons/Visibility'
// import SelectColumnFilter from 'components/Table/Filters/SelectColumnFilter'
// import EditIcon from '@material-ui/icons/Edit'
import { IconButton } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'
import { getVehiclesRequest } from 'store/gestionCuentas/AccountActions'

const columns = [
    {
        Header: 'Placa asociada',
        accessor: 'license_plate',
    },
    {
        Header: 'Tag',
        accessor: 'tag_id',
    },
    {
        Header: 'Categoria',
        accessor: 'category',
    },
    {
        Header: 'Movimientos',
        accessor: 'movements',
    },
    {
        Header: 'status',
        accessor: 'active',
        disableFilters: true,
    },
    {
        Header: 'Acciones',
        accessor: 'edit',
        disableFilters: true,
    },
]

const ReadUserAccount = () => {
    const dispatch = useDispatch()

    const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    const navigate = useNavigate()
    const vehicles = useSelector(
        (state: DefaultRootStateProps) => state.account
    )

    const handleEdit = React.useCallback(
        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault()
            const id = e.currentTarget.dataset.id
            navigate(`/gestion-de-cuentas-usuarios/editar/${id}`)
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
        navigate(`/gestion-de-cuentas-usuarios/crear`)
    }

    React.useEffect(() => {
        dispatch(getVehiclesRequest())
    }, [dispatch])

    React.useEffect(() => {
        const rows = vehicles.map(
            ({ id, license_plate, tag_id, category, model, active }) => ({
                license_plate,
                tag_id,
                category,
                model,
                active: active ? (
                    <Chip
                        label="Activo"
                        size="small"
                        chipcolor="success"
                        sx={{ width: '96px' }}
                    />
                ) : (
                    <Chip
                        label="Inactivo"
                        size="small"
                        chipcolor="orange"
                        sx={{ width: '96px' }}
                    />
                ),
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
    }, [handleEdit, vehicles])

    return (
        <div>
            <TableCustom
                columns={columns}
                data={rowsInitial}
                title=" Usuarios"
                addIconTooltip="Crear usuario"
                handleCreate={handleCreate}
            />
        </div>
    )
}

export default ReadUserAccount
