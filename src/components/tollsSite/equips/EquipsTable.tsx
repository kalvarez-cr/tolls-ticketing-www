import React from 'react'
import { useNavigate } from 'react-router-dom'

// import EditIcon from '@material-ui/icons/Edit'
import VisibilityIcon from '@material-ui/icons/Visibility'
import { IconButton, Tooltip } from '@material-ui/core'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'

import Chip from 'ui-component/extended/Chip'
import TableCustom from 'components/Table'
import RemoveEquip from 'components/removeForms/RemoveEquip'

const columns = [
    {
        Header: 'Nombre ',
        accessor: 'name',
    },
    {
        Header: 'Código de compañía',
        accessor: 'company',
    },
    {
        Header: 'Tipo de equipo',
        accessor: 'node_type',
    },
    {
        Header: 'Código',
        accessor: 'node_code',
    },
    {
        Header: 'Activo',
        accessor: 'active',
        disableFilters: true,
    },
    {
        Header: 'Monitorizable',
        accessor: 'monitored',
        disableFilters: true,
    },
    {
        Header: 'Acciones',
        accessor: 'edit',
        disableFilters: true,
    },
]
interface laneTableProps {
    tollIdParam?: string
    readOnly?: boolean
    onlyView?: boolean
    equips: any
    handleEditEquip: any
    following?: boolean
    handleCreateNew: (boo: boolean) => void
    editNew: (edit: boolean) => void
}

const EquipsTable = ({
    tollIdParam,
    equips,
    handleEditEquip,
    following,
    handleCreateNew,
    editNew,
}: laneTableProps) => {
    // States
    const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    // Customs Hooks

    const navigate = useNavigate()
    const [open, setOpen] = React.useState<boolean>(false)
    const [modal, setModal] = React.useState<string>('')
    const [selectedId, setSelectedId] = React.useState('')

    const handleDeleteEquip = (e) => {
        e.preventDefault()
        setSelectedId(e.currentTarget.dataset.id)
        setOpen(true)
        setModal('remove')
    }

    const handleCreate = () => {
        handleCreateNew(true)
        navigate(`/peajes/editar/${tollIdParam}`)
    }

    // React.useEffect(() => {
    //     dispatch(getTollsRequest())
    // }, [dispatch])

    //EFFECTS
    React.useEffect(() => {
        const rows = equips.nodes.map(
            ({
                id,
                name,
                node_type,
                company,
                node_code,
                active,
                monitored,
            }) => ({
                id,
                name,
                node_type,
                node_code,
                company,
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
                monitored: monitored ? (
                    <Chip
                        label="Si"
                        size="small"
                        chipcolor="success"
                        sx={{ width: '96px' }}
                    />
                ) : (
                    <Chip
                        label="No"
                        size="small"
                        chipcolor="orange"
                        sx={{ width: '96px' }}
                    />
                ),
                edit: (
                    <div className="flex">
                        <Tooltip title="Ver" placement="bottom">
                            <button data-id={id} onClick={handleEditEquip}>
                                <IconButton color="primary">
                                    <VisibilityIcon
                                        sx={{ fontSize: '1.3rem' }}
                                    />
                                </IconButton>
                            </button>
                        </Tooltip>
                        <Tooltip title="Eliminar" placement="bottom">
                            <button data-id={id} onClick={handleDeleteEquip}>
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
    }, [handleEditEquip, equips])

    return (
        // <MainCard  content={false} >
        <>
            <TableCustom
                columns={columns}
                data={rowsInitial}
                addIconTooltip="Crear Equipo"
                handleCreate={handleCreate}
            />

            {modal === 'remove' ? (
                <RemoveEquip
                    open={open}
                    setOpen={setOpen}
                    selectedId={selectedId}
                />
            ) : null}
        </>
    )
}

export default EquipsTable
