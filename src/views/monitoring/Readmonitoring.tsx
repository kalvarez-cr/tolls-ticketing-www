import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import Chip from 'ui-component/extended/Chip'
import TableCustom from '../../components/Table'
import VisibilityIcon from '@material-ui/icons/Visibility'
// import VisibilityIcon from '@material-ui/icons/Visibility'
// import SelectColumnFilter from 'components/Table/Filters/SelectColumnFilter'
// import EditIcon from '@material-ui/icons/Edit'
import { IconButton } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'
import { getMonitoringRequest } from 'store/monitoring/MonitoringAction'

const columns = [
    {
        Header: 'Peajes',
        accessor: 'name',
    },
    {
        Header: 'Nodos en linea',
        accessor: 'active_nodes',
    },
    {
        Header: 'Canales operativos',
        accessor: 'active_lanes',
    },
    {
        Header: 'Acciones',
        accessor: 'edit',
        disableFilters: true,
    },
]

const ReadMonitoring = () => {
    // ==================== STATE ====================

    const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    const [pageParam, setPageParam] = React.useState(1)
    const [perPageParam, setperPageParam] = React.useState(10)

    // ================= CUSTOM HOOKS =================

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // ==================== REDUX ====================

    const monitoring = useSelector(
        (state: DefaultRootStateProps) => state.monitoring
    )
    const countPage = useSelector(
        (state: DefaultRootStateProps) => state.commons.countPage
    )

    // ==================== FUNCTIONS ====================

    const handleEdit = React.useCallback(
        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault()
            const id = e.currentTarget.dataset.id
            navigate(`/monitoring/editar/${id}`)
        },
        [navigate]
    )
    // const handleView = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //     e.preventDefault()
    //     const id = e.currentTarget.dataset.id
    //     navigate(`/gestion-de-tarifas/editar/${id}-view`)
    // }

    // const handleCreate = (e: React.MouseEvent<HTMLElement>) => {
    //     e.preventDefault()
    //     navigate(`/gestion-de-cuentas-usuarios/crear`)
    // }

    // ==================== EFFECTS ====================

    React.useEffect(() => {
        dispatch(
            getMonitoringRequest({
                _all_: true,
                per_page: perPageParam,
                page: pageParam,
            })
        )
    }, [dispatch, perPageParam, pageParam])

    React.useEffect(() => {
        const rows = monitoring.map(
            ({ id, name, active_lanes, active_nodes }) => ({
                name,
                active_lanes:
                    active_lanes === 0 ? (
                        <p className="text-red-500">{active_lanes}</p>
                    ) : (
                        active_lanes
                    ),
                active_nodes:
                    active_nodes === 0 ? (
                        <p className="text-red-500">{active_nodes}</p>
                    ) : (
                        active_nodes
                    ),
                // status: status ? (
                //     <Chip
                //         label="Activo"
                //         size="small"
                //         chipcolor="success"
                //         sx={{ width: '96px' }}
                //     />
                // ) : (
                //     <Chip
                //         label="Inactivo"
                //         size="small"
                //         chipcolor="orange"
                //         sx={{ width: '96px' }}
                //     />
                // ),
                edit: (
                    <div className="flex">
                        <button data-id={id} onClick={handleEdit}>
                            <IconButton color="primary">
                                <VisibilityIcon sx={{ fontSize: '1.3rem' }} />
                            </IconButton>
                        </button>
                    </div>
                ),
            })
        )
        setRowsInitial(rows)
    }, [handleEdit, monitoring])

    return (
        <div>
            <TableCustom
                title="Monitorización"
                columns={columns}
                data={rowsInitial}
                pageParam={pageParam}
                setPageParam={setPageParam}
                perPageParam={perPageParam}
                setPerPageParam={setperPageParam}
                countPage={countPage}
                // addIconTooltip="Crear usuario"
                // handleCreate={handleCreate}
            />
        </div>
    )
}

export default ReadMonitoring
