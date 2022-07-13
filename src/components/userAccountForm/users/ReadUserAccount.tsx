import React from 'react'
// import { useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import Chip from 'ui-component/extended/Chip'

import VisibilityIcon from '@material-ui/icons/Visibility'
// import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'

// import VisibilityIcon from '@material-ui/icons/Visibility'
// import SelectColumnFilter from 'components/Table/Filters/SelectColumnFilter'
// import EditIcon from '@material-ui/icons/Edit'
import { IconButton, Tooltip } from '@material-ui/core'
// import { useSelector } from 'react-redux'
// import { DefaultRootStateProps } from 'types'
// import { getAccountHolderRequest } from 'store/accountHolder/AccountHolderActions'
import TableCustom from 'components/Table'
// import RemoveUser from '../../removeForms/RemoveUser'

const columns = [
    {
        Header: 'Número de cuenta',
        accessor: 'account_number',
    },
    {
        Header: 'Titular de la cuenta',
        accessor: 'account_holder',
    },
    {
        Header: 'Documento de identidad',
        accessor: 'nif_holder',
    },
    {
        Header: 'Saldo',
        accessor: 'account_detail',
    },
    {
        Header: 'Estatus',
        accessor: 'status',
        disableFilters: true,
    },
    {
        Header: 'Acciones',
        accessor: 'edit',
        disableFilters: true,
    },
]
interface userProps {
    userData?: any
    handleEditUser: any
    handleCreateNew: (boo: boolean) => void
    editNew: (edit: boolean) => void
    userId?: any
    dataUser?: any
}

const ReadUserAccount = ({
    userData,
    handleEditUser,
    handleCreateNew,
    editNew,
    userId,
    dataUser,
}: userProps) => {
    // const dispatch = useDispatch()

    // const [loading, setLoading] = React.useState(false)
    const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    // const [open, setOpen] = React.useState<boolean>(false)
    // const [modal, setModal] = React.useState<string>('')
    // const [selectedId, setSelectedId] = React.useState('')

    // const navigate = useNavigate()

    // const handleEdit = React.useCallback(
    //     (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //         e.preventDefault()
    //         const id = e.currentTarget.dataset.id
    //         navigate(`/gestion-de-cuentas-usuarios/editar/${id}`)
    //     },
    //     [navigate]
    // )
    // const handleDeleteUser = (e) => {
    //     setSelectedId(e.currentTarget.dataset.id)
    //     setOpen(true)
    //     setModal('remove')
    // }

    // const handleCreate = () => {
    //     // e.preventDefault()
    //     // navigate(`/gestion-de-cuentas-usuarios/crear`)
    //     handleCreateNew(true)
    //     editNew(false)
    // }

    // React.useEffect(() => {
    //     const fetchData = async () => {
    //         setLoading(true)
    //         const data = await dispatch(getAccountHolderRequest())
    //         setLoading(false)
    //         return data
    //     }
    //     fetchData()
    // }, [dispatch])
    console.log(dataUser)
    React.useEffect(() => {
        const rows = dataUser.map(
            ({
                id,
                account_number,
                account_holder,
                nif_holder,
                address,
                status,
                account_detail,
            }) => ({
                account_number,
                account_holder,
                nif_holder,
                address,
                account_detail: <div> {account_detail?.nominal_balance}</div>,
                status: status ? (
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
                        <Tooltip title="Ver" placement="bottom">
                            <button data-id={id} onClick={handleEditUser}>
                                <IconButton color="primary">
                                    <VisibilityIcon
                                        sx={{ fontSize: '1.3rem' }}
                                    />
                                </IconButton>
                            </button>
                        </Tooltip>
                        {/* <Tooltip title="Eliminar">
                            <button data-id={id} onClick={handleDeleteUser}>
                                <IconButton color="primary">
                                    <RemoveCircleIcon
                                        sx={{ fontSize: '1.3rem' }}
                                    />
                                </IconButton>
                            </button>
                        </Tooltip> */}
                    </div>
                ),
            })
        )
        setRowsInitial(rows)
    }, [handleEditUser, userData])

    return (
        <>
            <TableCustom
                columns={columns}
                data={rowsInitial}
                // title=" Usuarios"
                // addIconTooltip="Crear usuario"
                // handleCreate={handleCreate}
                // loading={loading}
            />
            {/* {modal === 'remove' ? (
                <RemoveUser
                    open={open}
                    setOpen={setOpen}
                    selectedId={selectedId}
                />
            ) : null} */}
        </>
    )
}

export default ReadUserAccount
