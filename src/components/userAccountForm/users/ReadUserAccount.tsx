import React from 'react'
// import Chip from 'ui-component/extended/Chip'
// import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
// import BlockIcon from '@mui/icons-material/Block'
// import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import { Grid, TextField, Theme } from '@material-ui/core'
import TableCustom from 'components/Table'
// import RechargueAccount from 'components/removeForms/RechargueAccount'
// import BlockAccount from 'components/removeForms/BlockAccount '
// import {
//     blockAccountRequest,
//     cancelAccountRequest,
// } from 'store/accountHolder/AccountHolderActions'
// import { useDispatch } from 'react-redux'
import TotalRevenueCard from './TotalRevenueCard'
import TotalTransitCard from './TotalTransitCard'
import TotalRevenueCard2 from './TotalRevenueCard2'
import { gridSpacing } from 'store/constant'
import { movements } from '../../../_mockApis/typesCompany/typesCompany'
import Collapse from 'ui-component/extended/Collapse'
import MainCard from 'ui-component/cards/MainCard'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme: Theme) => ({
    searchControl: {
        width: '100%',
        '& input': {
            background: 'transparent !important',
        },
        '& .Mui-focused input': {
            boxShadow: 'none',
        },
        ' & .css-1xu5ovs-MuiInputBase-input-MuiOutlinedInput-input': {
            color: '#6473a8',
        },

        [theme.breakpoints.down('lg')]: {
            width: '250px',
        },
        [theme.breakpoints.down('md')]: {
            width: '100%',
            marginLeft: '4px',
        },
    },
}))

const columns = [
    {
        Header: 'Fecha',
        accessor: 'company_type',
    },
    {
        Header: 'Hora',
        accessor: 'name',
    },
    {
        Header: 'Vehículo',
        accessor: 'abbreviation',
    },
    {
        Header: 'Peaje',
        accessor: 'description',
    },
    {
        Header: 'Canal',
        accessor: 'lane',
    },
    {
        Header: 'Monto',
        accessor: 'amount',
    },
    // {
    //     Header: 'Acciones',
    //     accessor: 'edit',
    //     disableFilters: true,
    // },
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
    const classes = useStyles()
    const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    // const [open, setOpen] = React.useState<boolean>(false)
    // const [modal, setModal] = React.useState<string>('')
    // const [account, setAccount] = React.useState('')
    const [loading] = React.useState(false)

    // const handleBlockAccount = () => {
    //     setAccount(userData.account_number)
    //     setOpen(true)
    //     setModal('block')
    // }
    // const handleBlockAccept = () => {
    //     dispatch(
    //         blockAccountRequest({
    //             account_number: account,
    //         })
    //     )

    //     setOpen(false)
    // }

    // const handleCloseAccount = () => {
    //     setAccount(userData.account_number)
    //     setOpen(true)
    //     setModal('remove')
    // }

    // const handleRemoveAccept = () => {
    //     dispatch(
    //         cancelAccountRequest({
    //             account_number: account,
    //         })
    //     )

    //     setOpen(false)
    // }

    // const handleRecharge = () => {
    //     setAccount(userData.account_number)
    //     setOpen(true)
    //     setModal('rechargue')
    // }
    React.useEffect(() => {
        const rows = movements.map(
            ({
                id,
                company_type,
                name,
                abbreviation,
                description,
                lane,
                amount,
            }) => {
                return {
                    company_type,
                    name,
                    abbreviation,
                    amount,
                    description,
                    lane,

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
                    // edit: (
                    //     <div className="flex">
                    //         <Tooltip title="Recargar" placement="bottom">
                    //             <button data-id={id} onClick={handleRecharge}>
                    //                 <IconButton color="primary">
                    //                     <AccountBalanceIcon
                    //                         sx={{ fontSize: '1.3rem' }}
                    //                     />
                    //                 </IconButton>
                    //             </button>
                    //         </Tooltip>
                    //         <Tooltip title="Bloquear">
                    //             <button
                    //                 data-id={id}
                    //                 onClick={handleBlockAccount}
                    //             >
                    //                 <IconButton color="primary">
                    //                     <BlockIcon
                    //                         sx={{ fontSize: '1.3rem' }}
                    //                     />
                    //                 </IconButton>
                    //             </button>
                    //         </Tooltip>
                    //         <Tooltip title="Cerrar">
                    //             <button
                    //                 data-id={id}
                    //                 onClick={handleCloseAccount}
                    //             >
                    //                 <IconButton color="primary">
                    //                     <RemoveCircleOutlineIcon
                    //                         sx={{ fontSize: '1.3rem' }}
                    //                     />
                    //                 </IconButton>
                    //             </button>
                    //         </Tooltip>
                    //     </div>
                    // ),
                }
            }
        )
        setRowsInitial(rows)
    }, [handleEditUser, movements])

    return (
        <>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 lg:col-span-4">
                    <TotalRevenueCard loading={loading} data={userData} />
                </div>
                <div className="col-span-12 lg:col-span-4">
                    <TotalTransitCard loading={loading} data={userData} />
                </div>
                <div className="col-span-12 lg:col-span-4">
                    <TotalRevenueCard2 loading={loading} data={userData} />
                </div>
            </div>

            <Grid spacing={gridSpacing} sx={{ marginTop: '25px' }}>
                <Collapse title="Datos de creación">
                    <MainCard content={true}>
                        <Grid container spacing={gridSpacing}>
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    label="Fecha"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    disabled={true}
                                    defaultValue={new Date(
                                        userData?.created_info?.date
                                    ).toLocaleDateString('es-VE')}
                                />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    label="Empresa"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    disabled={true}
                                    defaultValue={
                                        userData?.created_info?.company_name
                                    }
                                />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    label="Peaje"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    disabled={true}
                                />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    label="Creada por"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    disabled={true}
                                    defaultValue={
                                        userData?.created_info?.created_by
                                    }
                                />
                            </Grid>
                        </Grid>
                    </MainCard>
                </Collapse>
                <Collapse title="Detalles de movimientos">
                    <TableCustom
                        columns={columns}
                        data={rowsInitial}
                        // title=" Movimientos"
                        // addIconTooltip="Crear usuario"
                        // handleCreate={handleCreate}
                        // loading={loading}
                    />
                </Collapse>
            </Grid>

            {/* {modal === 'rechargue' ? (
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
                    title={
                        userData.status
                            ? 'Bloquear cuenta'
                            : 'Desbloquear cuenta'
                    }
                    text={
                        userData.status
                            ? '¿Estas seguro que quieres bloquear esta cuenta?'
                            : '¿Estas seguro que quieres desbloquear esta cuenta? '
                    }
                />
            ) : null}

            {modal === 'remove' ? (
                <BlockAccount
                    open={open}
                    setOpen={setOpen}
                    title="Cerrar cuenta"
                    handleAccept={handleRemoveAccept}
                    text="¿Estas seguro que quieres cerrar esta cuenta?"
                />
            ) : null} */}
        </>
    )
}

export default ReadUserAccount
