import React from 'react'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import EditIcon from '@material-ui/icons/Edit'
import { IconButton } from '@material-ui/core'

import Chip from 'ui-component/extended/Chip'

import { getTollsRequest } from 'store/tolls/tollsActions'
import { useDispatch } from 'react-redux'
import TableCustom from 'components/Table'

const columns = [
    {
        Header: 'Nombre ',
        accessor: 'name',
    },
    {
        Header: 'Compañia',
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
    tollData?: any
    handleEditEquip: (id: string) => void
    following?: boolean
    handleCreateNew: (boo: boolean) => void
    editNew: (edit: boolean) => void
}

const EquipsTable = ({
    tollIdParam,
    tollData,
    handleEditEquip,
    following,
    handleCreateNew,
    editNew,
}: laneTableProps) => {
    // States
    const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    // Customs Hooks
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const permissions = useSelector(
    //     (state: DefaultRootStateProps) => state.login?.user?.content?.permissions
    // )
    // FUNCTIONS
    const handleEdit = useCallback(
        (e) => {
            e.preventDefault()
            const id = e.currentTarget.dataset.id
            handleCreateNew(false)
            editNew(true)
            handleEditEquip(id)
        },
        [handleEditEquip, editNew, handleCreateNew]
    )

    const handleCreate = () => {
        handleCreateNew(true)
        navigate(`/peajes/editar/${tollIdParam}&&following&&1`)
    }

    React.useEffect(() => {
        dispatch(getTollsRequest())
    }, [dispatch])

    //EFFECTS
    React.useEffect(() => {
        const rows = tollData.nodes.map(
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
                        <button data-id={id} onClick={handleEdit}>
                            <IconButton color="primary">
                                <EditIcon sx={{ fontSize: '1.3rem' }} />
                            </IconButton>
                        </button>
                    </div>
                ),
            })
        )
        setRowsInitial(rows)
    }, [handleEdit, tollData])

    return (
        // <MainCard  content={false} >
        <>
            <TableCustom
                columns={columns}
                data={rowsInitial}
                addIconTooltip="Crear Equipo"
                handleCreate={handleCreate}
            />
        </>
    )
}

export default EquipsTable
