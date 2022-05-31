import React from 'react'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

// import EditIcon from '@material-ui/icons/Edit'
import VisibilityIcon from '@material-ui/icons/Visibility'
import { IconButton } from '@material-ui/core'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'

import Chip from 'ui-component/extended/Chip'

import TableCustom from 'components/Table'
import { useDispatch } from 'react-redux'
import { updateLaneRequest } from 'store/lane/laneActions'

const columns = [
    {
        Header: 'Nombre',
        accessor: 'name',
    },
    {
        Header: 'Ancho(m)',
        accessor: 'width_m',
    },
    {
        Header: 'Alto(m)',
        accessor: 'height_m',
    },
    {
        Header: 'Activo',
        accessor: 'is_active',
        disableFilters: true,
    },
    {
        Header: 'Acciones',
        accessor: 'edit',
        disableFilters: true,
    },
    {
        accessor: 'delete',
        disableFilters: true,
    },
]
interface laneTableProps {
    tollIdParam?: string
    readOnly?: boolean
    onlyView?: boolean
    tollData?: any
    handleEditLanes: (id: string) => void
    following?: boolean
    handleCreateNew: (boo: boolean) => void
    editNue: (edit: boolean) => void
    setSelectedLaneId: any
}

const LanesTable = ({
    tollIdParam,
    tollData,
    handleEditLanes,
    following,
    handleCreateNew,
    editNue,
    setSelectedLaneId,
}: laneTableProps) => {
    // States
    const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    // Customs Hooks

    const navigate = useNavigate()
    const dispatch = useDispatch()

    // FUNCTIONS
    const handleEdit = useCallback(
        (e) => {
            e.preventDefault()
            const id = e.currentTarget.dataset.id
            handleCreateNew(false)
            editNue(true)
            setSelectedLaneId(id)
            handleEditLanes(id)
        },
        [handleEditLanes, handleCreateNew, editNue, setSelectedLaneId]
    )

    const handleCreate = () => {
        handleCreateNew(true)
        navigate(`/peajes/editar/${tollIdParam}`)
    }

    const handleDeletelane = (e) => {
        e.preventDefault()
        const id = e.currentTarget.dataset.id
        dispatch(
            updateLaneRequest({
                id,
                is_deleted: true,
            })
        )
    }

    React.useEffect(() => {
        const rows = tollData.lanes.map(
            ({ id, name, width_m, height_m, is_active }) => ({
                id,
                name,
                width_m,
                height_m,
                is_active: is_active ? (
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

                edit: (
                    <div className="flex">
                        <button data-id={id} onClick={handleEdit}>
                            <IconButton color="primary">
                                <VisibilityIcon sx={{ fontSize: '1.3rem' }} />
                            </IconButton>
                        </button>
                    </div>
                ),
                delete: (
                    <div className="flex">
                        <button data-id={id} onClick={handleDeletelane}>
                            <IconButton color="primary">
                                <RemoveCircleIcon sx={{ fontSize: '1.3rem' }} />
                            </IconButton>
                        </button>
                    </div>
                ),
            })
        )
        setRowsInitial(rows)
    }, [tollData, handleEdit])

    return (
        <>
            <TableCustom
                columns={columns}
                data={rowsInitial}
                // title="Empleados"
                addIconTooltip="Crear canal"
                handleCreate={handleCreate}
            />
        </>
    )
}

export default LanesTable
