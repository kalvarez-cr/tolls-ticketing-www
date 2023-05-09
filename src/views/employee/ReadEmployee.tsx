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
import { IconButton, Tooltip } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'

import RemoveEmployee from 'components/removeForms/RemoveEmployee'
import Chip from 'ui-component/extended/Chip'
import { getEmployeesRequest } from 'store/employee/employeeActions'

const columns = [
    {
        Header: 'Nombre de usuario',
        accessor: 'username',
    },

    {
        Header: 'Nombre ',
        accessor: 'first_name',
    },

    {
        Header: 'Apellido',
        accessor: 'last_name',
    },

    {
        Header: 'Rol',
        accessor: 'role_spanish',
    },
    {
        Header: 'Peaje ',
        accessor: 'toll_sites',
        disableFilters: true,
    },
    {
        Header: 'Activo',
        accessor: 'active',
        disableFilters: true,
    },
    {
        Header: 'Acciones',
        accessor: 'edit',
        disableFilters: true,
    },
]

const ReadEmployee = () => {
    // ==================== STATE ====================

    const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    const [open, setOpen] = React.useState<boolean>(false)
    const [modal, setModal] = React.useState<string>('')
    const [selectedId, setSelectedId] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [pageParam, setPageParam] = React.useState(1)
    const [perPageParam, setperPageParam] = React.useState(10)
    const [searchInputValue, setSearchInputValue] = React.useState<string>('')

    // ================= CUSTOM HOOKS =================

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // ==================== REDUX ====================

    const employees = useSelector(
        (state: DefaultRootStateProps) => state.employee
    )
    const countPage = useSelector(
        (state: DefaultRootStateProps) => state.commons.countPage
    )

    // ==================== FUNCTIONS ====================

    const handleEdit = React.useCallback(
        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault()
            const id = e.currentTarget.dataset.id
            navigate(`/empleados/editar/${id}`)
        },
        [navigate]
    )

    const handleCreate = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        navigate(`/empleados/crear`)
    }

    const handleDeleteEmployee = (e) => {
        setSelectedId(e.currentTarget.dataset.id)
        setOpen(true)
        setModal('remove')
    }

    // ==================== EFFECTS ====================

    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            if (searchInputValue !== '') {
                const data = await dispatch(
                    getEmployeesRequest({
                        filter: true,
                        criteria: searchInputValue,
                        per_page: perPageParam,
                        page: pageParam,
                    })
                )
                setLoading(false)
                return data
            } else {
                const data = await dispatch(
                    getEmployeesRequest({
                        _all_: true,
                        per_page: perPageParam,
                        page: pageParam,
                    })
                )
                setLoading(false)
                return data
            }
        }
        fetchData()
    }, [perPageParam, pageParam, searchInputValue])

    React.useEffect(() => {
        const rows = employees.map(
            ({
                id,
                username,
                first_name,
                middle_name,
                last_name,
                second_last_name,
                role_spanish,
                active,
                toll_sites,
            }) => ({
                id,
                username,
                first_name,
                middle_name,
                last_name,
                second_last_name,
                role_spanish,
                toll_sites: toll_sites?.map((toll) => <div>{toll.name}</div>),

                active: active ? (
                    <Chip
                        label="Si"
                        size="small"
                        chipcolor="success"
                        sx={{ width: '96px' }}
                    />
                ) : (
                    <Chip
                        label="No"
                        size="small"
                        chipcolor="orange"
                        sx={{ width: '96px' }}
                    />
                ),
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
                            <button data-id={id} onClick={handleDeleteEmployee}>
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
    }, [employees, handleEdit])

    return (
        <>
            <div className="my-6">
                <TableCustom
                    columns={columns}
                    data={rowsInitial}
                    title="Empleados"
                    addIconTooltip="Añadir empleado"
                    handleCreate={handleCreate}
                    loading={loading}
                    pageParam={pageParam}
                    setPageParam={setPageParam}
                    perPageParam={perPageParam}
                    setPerPageParam={setperPageParam}
                    countPage={countPage}
                    setSearchInputValue={setSearchInputValue}
                    createRolNotAllowed={['visualizer']}
                />
            </div>

            {modal === 'remove' ? (
                <RemoveEmployee
                    open={open}
                    setOpen={setOpen}
                    selectedId={selectedId}
                />
            ) : null}
        </>
    )
}

export default ReadEmployee
