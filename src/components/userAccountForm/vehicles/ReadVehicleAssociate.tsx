import React from 'react'
// import { useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import Chip from 'ui-component/extended/Chip'
import TableCustom from '../../Table'
import VisibilityIcon from '@material-ui/icons/Visibility'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import RemoveVehicle from '../../removeForms/RemoveVehicle'
// import VisibilityIcon from '@material-ui/icons/Visibility'
// import SelectColumnFilter from 'components/Table/Filters/SelectColumnFilter'
// import EditIcon from '@material-ui/icons/Edit'
import { IconButton, Tooltip } from '@material-ui/core'

const columns = [
    {
        Header: 'Placa',
        accessor: 'license_plate',
    },
    {
        Header: 'Marca',
        accessor: 'make',
    },
    {
        Header: 'Modelo',
        accessor: 'model',
    },
    // {
    //     Header: 'Balance en la cuenta',
    //     accessor: 'movements',
    // },
    {
        Header: 'Estado de la cuenta',
        accessor: 'active',
        disableFilters: true,
    },
    {
        Header: 'Acciones',
        accessor: 'edit',
        disableFilters: true,
    },
]

interface userProps {
    vehiclesData?: any
    handleEditVehicle: any
    editNew: (edit: boolean) => void
    handleCreateNew: (boo: boolean) => void
    userId?: any
}

const ReadUserAccount = ({
    vehiclesData,
    handleEditVehicle,
    handleCreateNew,
    editNew,
    userId,
}: userProps) => {
    // const dispatch = useDispatch()

    const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    const [open, setOpen] = React.useState<boolean>(false)
    const [modal, setModal] = React.useState<string>('')
    const [selectedId, setSelectedId] = React.useState('')
    // const navigate = useNavigate()

    // const handleEdit = React.useCallback(
    //     (e) => {
    //         e.preventDefault()
    //         const id = e.currentTarget.dataset.id
    //         setSelectedVehicleId(id)
    //         handleEditVehicle(id)
    //         handleCreateNew(false)
    //         editNew(true)
    //     },
    //     [handleEditVehicle, editNew, handleCreateNew, setSelectedVehicleId]
    // )

    const handleCreate = () => {
        handleCreateNew(true)
        editNew(false)
    }

    const handleDeleteVehicle = (e) => {
        setSelectedId(e.currentTarget.dataset.id)
        setOpen(true)
        setModal('remove')
    }

    React.useEffect(() => {
        const rows = vehiclesData.map(
            ({ id, license_plate, make, model, active }) => ({
                license_plate,
                make,

                model,
                active: active ? (
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
                            <button data-id={id} onClick={handleEditVehicle}>
                                <IconButton color="primary">
                                    <VisibilityIcon
                                        sx={{ fontSize: '1.3rem' }}
                                    />
                                </IconButton>
                            </button>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                            <button data-id={id} onClick={handleDeleteVehicle}>
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
    }, [handleEditVehicle, vehiclesData])

    return (
        <>
            <TableCustom
                columns={columns}
                data={rowsInitial}
                // title="Vehiculos de un usuario"
                addIconTooltip="Asociar vehiculo"
                handleCreate={handleCreate}
            />

            {modal === 'remove' ? (
                <RemoveVehicle
                    open={open}
                    setOpen={setOpen}
                    selectedId={selectedId}
                    userId={userId}
                />
            ) : null}
        </>
    )
}

export default ReadUserAccount
