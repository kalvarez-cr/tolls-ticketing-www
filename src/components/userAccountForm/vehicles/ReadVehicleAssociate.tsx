import React from 'react'
import Chip from 'ui-component/extended/Chip'
import TableCustom from '../../Table'
import VisibilityIcon from '@material-ui/icons/Visibility'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import RemoveVehicle from '../../removeForms/RemoveVehicle'
import BlockIcon from '@mui/icons-material/Block'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import { IconButton, Tooltip } from '@material-ui/core'
import BlockAccount from 'components/removeForms/BlockAccount '
import { useDispatch } from 'react-redux'
import {
    blockCarRequest,
    cancelCarRequest,
} from 'store/accountHolder/AccountHolderActions'
import { getTagRequest } from 'store/saleTag/saleTagActions'

const columns = [
    {
        Header: 'Tag',
        accessor: 'tag_serial',
    },
    {
        Header: 'Placa',
        accessor: 'license_plate',
    },

    {
        Header: 'Modelo',
        accessor: 'model',
    },
    {
        Header: 'Categoría',
        accessor: 'category',
    },
    // {
    //     Header: 'Balance en la cuenta',
    //     accessor: 'movements',
    // },
    {
        Header: 'Estado del vehículo',
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
    neww?: boolean
    setDataVehicle?: any
    setEditVehicle?: any
}

const ReadUserAccount = ({
    vehiclesData,
    handleEditVehicle,
    handleCreateNew,
    editNew,
    userId,
    neww,
    setDataVehicle,
    setEditVehicle,
}: userProps) => {
    const dispatch = useDispatch()
    const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    const [open, setOpen] = React.useState<boolean>(false)
    const [modal, setModal] = React.useState<string>('')
    const [selectedId, setSelectedId] = React.useState('')
    const [tag, setTag] = React.useState('')

    const handleBlockAccount = (e) => {
        setSelectedId(e.currentTarget.dataset.id)
        setOpen(true)
        setModal('block')
    }
    const handleBlockAccept = () => {
        dispatch(
            blockCarRequest(
                {
                    id: selectedId,
                },
                userId
            )
        )

        setOpen(false)
    }

    const handleCloseAccount = (e) => {
        setTag(e.currentTarget.dataset.tag)
        setOpen(true)
        setModal('remove')
    }

    const handleRemoveAccept = async () => {
        await dispatch(
            cancelCarRequest(
                {
                    tag_serial: tag,
                },
                userId
            )
        )

        await dispatch(getTagRequest({ _all_: true, per_page: 50 }))
        const newVehicle = vehiclesData?.find((v) => v.tag_serial === tag)
        setDataVehicle({
            ...newVehicle,
            tag_delete: true,
            tag_serial: '',
            tag_number: '',
        })
        setEditVehicle(true)
    }

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
            ({ id, license_plate, model, active, tag_serial, category }) => ({
                license_plate,
                tag_serial,
                category,
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
                        <Tooltip title="Eliminar Vehículo">
                            <button data-id={id} onClick={handleDeleteVehicle}>
                                <IconButton color="primary">
                                    <RemoveCircleIcon
                                        sx={{ fontSize: '1.3rem' }}
                                    />
                                </IconButton>
                            </button>
                        </Tooltip>
                        <Tooltip title="Bloquear Vehículo">
                            <button data-id={id} onClick={handleBlockAccount}>
                                <IconButton color="primary">
                                    <BlockIcon sx={{ fontSize: '1.3rem' }} />
                                </IconButton>
                            </button>
                        </Tooltip>
                        <Tooltip title="Cancelar Media">
                            <button
                                data-tag={tag_serial}
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
                addIconTooltip="Asociar vehículo"
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

            {modal === 'block' ? (
                <BlockAccount
                    open={open}
                    setOpen={setOpen}
                    handleAccept={handleBlockAccept}
                    title={
                        vehiclesData.active
                            ? 'Desbloquear vehículo'
                            : 'Bloquear vehículo'
                    }
                    text={
                        vehiclesData.active
                            ? '¿Estas seguro que quieres desbloquear este vehículo?'
                            : '¿Estas seguro que quieres bloquear este vehículo? '
                    }
                />
            ) : null}

            {modal === 'remove' ? (
                <BlockAccount
                    open={open}
                    setOpen={setOpen}
                    handleAccept={handleRemoveAccept}
                    title="Cancelar vehículo"
                    text="¿Estas seguro que quieres cancelar este vehículo?"
                />
            ) : null}
        </>
    )
}

export default ReadUserAccount
