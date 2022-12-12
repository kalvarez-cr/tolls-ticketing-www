import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Chip from 'ui-component/extended/Chip'
import TableCustom from '../../components/Table'
import VisibilityIcon from '@material-ui/icons/Visibility'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
// import BlockIcon from '@mui/icons-material/Block'

import { IconButton, Tooltip } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'
import { getAccountHolderRequest } from 'store/accountHolder/AccountHolderActions'
import RemoveUser from '../../components/removeForms/RemoveUser'
// import BlockAccount from 'components/removeForms/BlockAccount '
const columns = [
    {
        Header: 'No cuenta',
        accessor: 'account_number',
    },
    {
        Header: 'TItular ',
        accessor: 'account_holder',
    },
    {
        Header: 'Documento de identidad',
        accessor: 'nif_holder',
    },
    {
        Header: 'Estado',
        accessor: 'state',
    },
    {
        Header: 'Saldo',
        accessor: 'nominal_balance',
    },
    {
        Header: 'Último uso',
        accessor: 'last_use_date',
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
const ReadUserAccount = () => {
    // ==================== STATE ====================

    const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    const [open, setOpen] = React.useState<boolean>(false)
    const [modal, setModal] = React.useState<string>('')
    // const [account, setAccount] = React.useState('')
    const [selectedId, setSelectedId] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [pageParam, setPageParam] = React.useState(1)
    const [perPageParam, setperPageParam] = React.useState(10)
    const [searchInputValue, setSearchInputValue] = React.useState<string>('')

    // ================= CUSTOM HOOKS =================

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // ==================== REDUX ====================

    const AccountHolder = useSelector(
        (state: DefaultRootStateProps) => state.accountHolder
    )
    const countPage = useSelector(
        (state: DefaultRootStateProps) => state.commons.countPage
    )
    // const detailsAccount = AccountHolder.map((account) => {
    //     return {
    //         account_number: account.account_number,
    //         status: account.status
    //     }

    // })
    // ==================== FUNCTIONS ====================

    const handleEdit = React.useCallback(
        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault()
            const id = e.currentTarget.dataset.id
            navigate(`/gestion-de-cuentas-usuarios/editar/${id}`)
        },
        [navigate]
    )
    const handleDeleteUser = (e) => {
        setSelectedId(e.currentTarget.dataset.id)
        setOpen(true)
        setModal('remove')
    }

    //   const handleBlockAccount = () => {
    //     setAccount(detailsAccount.)
    //     setOpen(true)
    //     setModal('block')
    //  }

    //  const handleBlockAccept = () => {
    //     dispatch(
    //         blockAccountRequest({
    //             account_number: account,
    //         })
    //     )

    //     setOpen(false)
    // }

    const handleCreate = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        navigate(`/gestion-de-cuentas-usuarios/crear`)
    }

    // ==================== EFFECTS ====================

    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            if (searchInputValue !== '') {
                const data = await dispatch(
                    getAccountHolderRequest({
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
                    getAccountHolderRequest({
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
    }, [dispatch, perPageParam, pageParam, searchInputValue])

    React.useEffect(() => {
        const rows = AccountHolder.map(
            ({
                id,
                account_holder,
                account_number,
                state,
                nif_holder,
                status,
                account_detail,
            }) => ({
                account_holder,
                account_number,
                nif_holder,
                nominal_balance: account_detail?.nominal_balance,
                last_use_date: account_detail?.last_use_date,
                state: state?.name,
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
                            <button data-id={id} onClick={handleEdit}>
                                <IconButton color="primary">
                                    <VisibilityIcon
                                        sx={{ fontSize: '1.3rem' }}
                                    />
                                </IconButton>
                            </button>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                            <button data-id={id} onClick={handleDeleteUser}>
                                <IconButton color="primary">
                                    <RemoveCircleIcon
                                        sx={{ fontSize: '1.3rem' }}
                                    />
                                </IconButton>
                            </button>
                        </Tooltip>
                        {/* <Tooltip title="Bloquear Cuenta">
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
                            </Tooltip> */}
                    </div>
                ),
            })
        )
        setRowsInitial(rows)
    }, [handleEdit, AccountHolder])

    return (
        <>
            <TableCustom
                columns={columns}
                data={rowsInitial}
                title="Cuentas"
                addIconTooltip="Crear usuario"
                handleCreate={handleCreate}
                loading={loading}
                pageParam={pageParam}
                setPageParam={setPageParam}
                perPageParam={perPageParam}
                setPerPageParam={setperPageParam}
                countPage={countPage}
                setSearchInputValue={setSearchInputValue}
            />
            {modal === 'remove' ? (
                <RemoveUser
                    open={open}
                    setOpen={setOpen}
                    selectedId={selectedId}
                />
            ) : null}

            {/* {modal === 'block' ? (
                <BlockAccount
                    open={open}
                    setOpen={setOpen}
                    handleAccept={handleBlockAccept}
                    title={
                        detailsAccount.status
                            ? 'Bloquear cuenta'
                            : 'Desbloquear cuenta'
                    }
                    text={
                        detailsAccount.status
                            ? '¿Estas seguro que quieres bloquear esta cuenta?'
                            : '¿Estas seguro que quieres desbloquear esta cuenta? '
                    }
                />
            ) : null} */}
        </>
    )
}

export default ReadUserAccount
