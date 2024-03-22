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
import { DefaultRootStateProps } from 'types'
import { useDispatch, useSelector } from 'react-redux'
import { getEmployeesRequest } from 'store/employee/employeeActions'
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
        accessor: 'role_spanish',
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
   
    handleEditEmployee,
    following,
    editNew,
    handleCreateNew,
}: EmployeesTableeProps) => {
    const dispatch = useDispatch()

    // States
    const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    const [open, setOpen] = React.useState<boolean>(false)
    const [loading, setLoading] = React.useState(false)
    const [modal, setModal] = React.useState<string>('')
    const [selectedId, setSelectedId] = React.useState('')
    const [pageParam, setPageParam] = React.useState(1)
    const [perPageParam, setperPageParam] = React.useState(10)

    const employees = useSelector((state: DefaultRootStateProps) => state.employee)

    const countPage = useSelector(
        (state: DefaultRootStateProps) => state.commons.countPage
    )
    const role = useSelector(
        (state: DefaultRootStateProps) => state.login?.user?.role
    )

 

    const handleDeleteEmployee = (e) => {
        setSelectedId(e.currentTarget.dataset.id)
        setOpen(true)
        setModal('remove')
    }

    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true)        
                const data = await dispatch(
                    getEmployeesRequest({
                        toll_sites: [tollIdParam] ,
                        per_page: perPageParam,
                        page: pageParam,
                    })
                )
                setLoading(false)
                return data
            
        }
        fetchData()
    }, [perPageParam, pageParam])

    React.useEffect(() => {
        const rows = employees.map(
            ({
                id,
                first_name,
                middle_name,
                last_name,
                second_last_name,
                role_spanish,
                active,
            }) => ({
                id,
                first_name,
                middle_name,
                last_name,
                second_last_name,
                role_spanish,
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
                        { role === 'general_administrator' ?<Tooltip title="Eliminar" placement="bottom">
                            <button data-id={id} onClick={handleDeleteEmployee}>
                                <IconButton color="primary">
                                    <RemoveCircleIcon
                                        sx={{ fontSize: '1.3rem' }}
                                    />
                                </IconButton>
                            </button>
                        </Tooltip> : null }
                    </div>
                ),
            })
        )
        setRowsInitial(rows)
    }, [handleEditEmployee, employees])

    return (
        <>
            <TableCustom
                columns={columns}
                data={rowsInitial}
                loading={loading}
                pageParam={pageParam}
                setPageParam={setPageParam}
                perPageParam={perPageParam}
                setPerPageParam={setperPageParam}
                countPage={countPage}
                
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
