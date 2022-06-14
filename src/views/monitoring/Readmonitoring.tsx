import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Chip from 'ui-component/extended/Chip'
import TableCustom from '../../components/Table'
import VisibilityIcon from '@material-ui/icons/Visibility'
// import VisibilityIcon from '@material-ui/icons/Visibility'
// import SelectColumnFilter from 'components/Table/Filters/SelectColumnFilter'
// import EditIcon from '@material-ui/icons/Edit'
import { IconButton } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'
import { getAccountHolderRequest } from 'store/accountHolder/AccountHolderActions'

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
        Header: 'Direccción',
        accessor: 'address',
    },
    {
        Header: 'Status',
        accessor: 'status',
        disableFilters: true,
    },
    {
        Header: 'Acciones',
        accessor: 'edit',
        disableFilters: true,
    },
]

const ReadMonitoring = () => {
    const dispatch = useDispatch()

    const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    const navigate = useNavigate()
    const AccountHolder = useSelector(
        (state: DefaultRootStateProps) => state.accountHolder
    )

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

    React.useEffect(() => {
        dispatch(getAccountHolderRequest())
    }, [dispatch])

    React.useEffect(() => {
        const rows = AccountHolder.map(
            ({
                id,
                account_number,
                account_holder,
                nif_holder,
                address,
                status,
            }) => ({
                account_number,
                account_holder,
                nif_holder,
                address,
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
    }, [handleEdit, AccountHolder])

    return (
        <div>
            <TableCustom
                columns={columns}
                data={rowsInitial}
                title="Monitorización"
                // addIconTooltip="Crear usuario"
                // handleCreate={handleCreate}
            />
        </div>
    )
}

export default ReadMonitoring
