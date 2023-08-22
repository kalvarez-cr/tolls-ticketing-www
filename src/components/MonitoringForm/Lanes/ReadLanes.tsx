import React from 'react'
import { useNavigate } from 'react-router-dom'
import Chip from 'ui-component/extended/Chip'

// import VisibilityIcon from '@material-ui/icons/Visibility'
// import VisibilityIcon from '@material-ui/icons/Visibility'
// import SelectColumnFilter from 'components/Table/Filters/SelectColumnFilter'
// import EditIcon from '@material-ui/icons/Edit'
// import { IconButton } from '@material-ui/core'

import TableCustom from 'components/Table'
import AnimateButton from 'ui-component/extended/AnimateButton'
import { Button, Grid } from '@material-ui/core'

const columns = [
    {
        Header: 'Nombre del canal',
        accessor: 'lane_name',
    },
    {
        Header: 'Nombre del equipo',
        accessor: 'name',
    },
    {
        Header: 'Estatus',
        accessor: 'online',
        disableFilters: true,
    },
    {
        Header: 'Flujo',
        accessor: 'transit',
    },
    {
        Header: 'Última actualización',
        accessor: 'updated_on',
    },
]

interface monitoringProps {
    monitoringData?: any
}

const ReadLanes = ({ monitoringData }: monitoringProps) => {
    const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    const navigate = useNavigate()

    const handleEdit = React.useCallback(
        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault()
            const id = e.currentTarget.dataset.id
            navigate(`/gestion-de-cuentas-usuarios/editar/${id}`)
        },
        [navigate]
    )
    // const handleView = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //     e.preventDefault()
    //     const id = e.currentTarget.dataset.id
    //     navigate(`/gestion-de-tarifas/editar/${id}-view`)
    // }

    const handleReturn = () => {
        navigate(-1)
    }

    React.useEffect(() => {
        const rows = monitoringData.map(
            ({ name, lane_name, online, transit, updated_on }) => ({
                name,
                lane_name,

                transit:
                    transit === null ? (
                        <p className="text-red-500">{0}</p>
                    ) : (
                        transit
                    ),
                updated_on,
                online: online !== 'Offline'  ? (
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
                // edit: (
                //     <div className="flex">
                //         <button data-id={id} onClick={handleEdit}>
                //             <IconButton color="primary">
                //                 <VisibilityIcon sx={{ fontSize: '1.3rem' }} />
                //             </IconButton>
                //         </button>
                //     </div>
                // ),
            })
        )
        setRowsInitial(rows)
    }, [handleEdit, monitoringData])

    return (
        <>
            <TableCustom
                columns={columns}
                data={rowsInitial}
                // title="Canales"
                // addIconTooltip="Crear usuario"
                // handleCreate={handleCreate}
            />

            <Grid
                item
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: '15px',
                }}
            >
                <AnimateButton>
                    <Button
                        variant="contained"
                        size="medium"
                        onClick={handleReturn}
                    >
                        Volver
                    </Button>
                </AnimateButton>
            </Grid>
        </>
    )
}

export default ReadLanes
