import React from 'react'
// import { useNavigate } from 'react-router-dom'
import Chip from 'ui-component/extended/Chip'
// import TableCustom from '../../../components/Table'

// import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone'
// import EditIcon from '@material-ui/icons/Edit'
// import VisibilityIcon from '@material-ui/icons/Visibility'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
// import VisibilityIcon from '@material-ui/icons/Visibility'
// import SelectColumnFilter from "components/Table/Filters/SelectColumnFilter";
import { IconButton, Tooltip } from '@material-ui/core'
import TableCustom from 'components/Table'
import RemoveEmployee from 'components/removeForms/RemoveEmployee'
// import { getTollsRequest } from 'store/tolls/tollsActions'
// import { useSelector } from 'react-redux'
// import { useDispatch } from 'react-redux'
// import { DefaultRootStateProps } from 'types/index'

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
    // {
    //     Header: 'Telefono',
    //     accessor: 'phone',
    // },
    // {
    //     Header: 'Departamento',
    //     accessor: 'department',
    // },
    // {
    //     Header: 'Admite recarga via web',
    //     accessor: 'web_rechargable',
    // },
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
interface EmployeesTableeProps {
    tollIdParam?: string
    readOnly?: boolean
    onlyView?: boolean
    tollData?: any
    handleEditEmployee: any
    following?: boolean
    editNew: (edit: boolean) => void
    handleCreateNew: (boo: boolean) => void
}

const EmployeesTable = ({
    tollIdParam,
    tollData,
    handleEditEmployee,
    following,
    editNew,
    handleCreateNew,
}: EmployeesTableeProps) => {
    // const navigate = useNavigate()

    // States
    const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    const [open, setOpen] = React.useState<boolean>(false)
    const [modal, setModal] = React.useState<string>('')
    const [selectedId, setSelectedId] = React.useState('')
    // Customs Hooks

    // const navigate = useNavigate()
    // const permissions = useSelector(
    //     (state: DefaultRootStateProps) => state.login?.user?.content?.permissions
    // )
    // FUNCTIONS
    // const handleCreate = () => {
    //     handleCreateNew(true)
    //     editNew(false)

    //     navigate(`/peajes/editar/${tollIdParam}`)
    // }

    const handleDeleteEmployee = (e) => {
        setSelectedId(e.currentTarget.dataset.id)
        setOpen(true)
        setModal('remove')
    }

    // const handleEdit = useCallback(
    //     (e) => {
    //         e.preventDefault()
    //         const id = e.currentTarget.dataset.id
    //         handleEditEmployee(id)
    //         handleCreateNew(false)
    //         editNew(true)
    //         setSelectedEmployeeId(id)
    //     },
    //     [handleEditEmployee, editNew, handleCreateNew, setSelectedEmployeeId]
    // )

    //EFFECTS
    // React.useEffect(() => {
    //     dispatch(getTollsRequest())
    // }, [dispatch])

    React.useEffect(() => {
        const rows = tollData.employees.map(
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
                        {/* <Tooltip title="Ver" placement="bottom">
                            <button data-id={id} onClick={handleEditEmployee}>
                                <IconButton color="primary">
                                    <VisibilityIcon
                                        sx={{ fontSize: '1.3rem' }}
                                    />
                                </IconButton>
                            </button>
                        </Tooltip> */}
                        <Tooltip title="Eliminar" placement="bottom">
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
    }, [handleEditEmployee, tollData])

    return (
        <>
            <TableCustom
                columns={columns}
                data={rowsInitial}
                // title="Empleados"
                // addIconTooltip="Crear Empleado"
                // handleCreate={handleCreate}
            />

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

export default EmployeesTable
