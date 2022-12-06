import React from 'react'
import { movements } from '../../../_mockApis/typesCompany/typesCompany'
import TableCustom from 'components/Table'

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

const MovementsVehicle = () => {
    const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])

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
    }, [movements])

    return (
        <>
            <TableCustom
                columns={columns}
                data={rowsInitial}
                title=" Movimientos"
                // addIconTooltip="Crear usuario"
                // handleCreate={handleCreate}
                // loading={loading}
            />
        </>
    )
}

export default MovementsVehicle
