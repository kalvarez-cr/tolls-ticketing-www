import React from 'react'
import Chip from 'ui-component/extended/Chip'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import BlockIcon from '@mui/icons-material/Block'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import { IconButton, Tooltip } from '@material-ui/core'
import TableCustom from 'components/Table'
import RechargueAccount from 'components/removeForms/RechargueAccount'
import BlockAccount from 'components/removeForms/BlockAccount '
import {
    blockAccountRequest,
    cancelAccountRequest,
} from 'store/accountHolder/AccountHolderActions'
import { useDispatch } from 'react-redux'

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
    const dispatch = useDispatch()

    const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    const [open, setOpen] = React.useState<boolean>(false)
    const [modal, setModal] = React.useState<string>('')
    const [account, setAccount] = React.useState('')

    const handleBlockAccount = () => {
        setAccount(userData.account_number)
        setOpen(true)
        setModal('block')
    }
    const handleBlockAccept = () => {
        dispatch(
            blockAccountRequest({
                account_number: account,
            })
        )

        setOpen(false)
    }

    const handleCloseAccount = () => {
        setAccount(userData.account_number)
        setOpen(true)
        setModal('remove')
    }

    const handleRemoveAccept = () => {
        dispatch(
            cancelAccountRequest({
                account_number: account,
            })
        )

        setOpen(false)
    }

    const handleRecharge = () => {
        setAccount(userData.account_number)
        setOpen(true)
        setModal('rechargue')
    }
    console.log(open)
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
            }) => {
                console.log(
                    'account_detail?.nominal_balance',
                    account_detail?.nominal_balance
                )
                return {
                    account_number,
                    account_holder,
                    nif_holder,
                    address,
                    account_detail: account_detail?.nominal_balance,
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
                            <Tooltip title="Recargar" placement="bottom">
                                <button data-id={id} onClick={handleRecharge}>
                                    <IconButton color="primary">
                                        <AccountBalanceIcon
                                            sx={{ fontSize: '1.3rem' }}
                                        />
                                    </IconButton>
                                </button>
                            </Tooltip>
                            <Tooltip title="Bloquear">
                                <button
                                    data-id={id}
                                    onClick={handleBlockAccount}
                                >
                                    <IconButton color="primary">
                                        <BlockIcon
                                            sx={{ fontSize: '1.3rem' }}
                                        />
                                    </IconButton>
                                </button>
                            </Tooltip>
                            <Tooltip title="Cerrar">
                                <button
                                    data-id={id}
                                    onClick={handleCloseAccount}
                                >
                                    <IconButton color="primary">
                                        <RemoveCircleOutlineIcon
                                            sx={{ fontSize: '1.3rem' }}
                                        />
                                    </IconButton>
                                </button>
                            </Tooltip>
                        </div>
                    ),
                }
            }
        )
        setRowsInitial(rows)
    }, [handleEditUser, dataUser, userData, open])

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
            {modal === 'rechargue' ? (
                <RechargueAccount
                    open={open}
                    setOpen={setOpen}
                    account={account}
                />
            ) : null}

            {modal === 'block' ? (
                <BlockAccount
                    open={open}
                    setOpen={setOpen}
                    handleAccept={handleBlockAccept}
                    text="¿Estas seguro que quieres bloquear esta cuenta?"
                />
            ) : null}

            {modal === 'remove' ? (
                <BlockAccount
                    open={open}
                    setOpen={setOpen}
                    handleAccept={handleRemoveAccept}
                    text="¿Estas seguro que quieres cerrar esta cuenta?"
                />
            ) : null}
        </>
    )
}

export default ReadUserAccount
