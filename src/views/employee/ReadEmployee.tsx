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
        Header: 'Nombre ',
        accessor: 'first_name',
    },
    {
        Header: ' S. nombre',
        accessor: 'middle_name',
    },
    {
        Header: 'Apellido',
        accessor: 'last_name',
    },
    {
        Header: 'S.apellido',
        accessor: 'second_last_name',
    },
    {
        Header: 'Rol',
        accessor: 'role',
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
    const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    const [open, setOpen] = React.useState<boolean>(false)
    const [modal, setModal] = React.useState<string>('')
    const [selectedId, setSelectedId] = React.useState('')

    //redux
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const employees = useSelector(
        (state: DefaultRootStateProps) => state.employee
    )

    const handleEdit = React.useCallback(
        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault()
            const id = e.currentTarget.dataset.id
            navigate(`/empleados/editar/${id}`)
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
        navigate(`/empleados/crear`)
    }

    const handleDeleteEmployee = (e) => {
        setSelectedId(e.currentTarget.dataset.id)
        setOpen(true)
        setModal('remove')
    }

    React.useEffect(() => {
        dispatch(getEmployeesRequest({ _all_: true, per_page: 50 }))
    }, [])

    React.useEffect(() => {
        const rows = employees.map(
            ({
                id,
                first_name,
                middle_name,
                last_name,
                second_last_name,
                role,
                active,
            }) => ({
                id,
                first_name,
                middle_name,
                last_name,
                second_last_name,
                role,
                active: active ? (
                    <Chip
                        label="Habilitado"
                        size="small"
                        chipcolor="success"
                        sx={{ width: '96px' }}
                    />
                ) : (
                    <Chip
                        label="Deshabilitado"
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
