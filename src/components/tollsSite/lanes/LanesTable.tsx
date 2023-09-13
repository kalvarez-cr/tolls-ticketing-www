import React from 'react'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

// import EditIcon from '@material-ui/icons/Edit'
import VisibilityIcon from '@material-ui/icons/Visibility'
import { IconButton, Tooltip } from '@material-ui/core'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'

import Chip from 'ui-component/extended/Chip'

import TableCustom from 'components/Table'
import RemoveLane from 'components/removeForms/RemoveLane'
import { useDispatch, useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'
import { getLaneStateRequest, updateLaneRequest } from 'store/tolls/lane/laneTollAction'
import ActiveStatus from 'components/removeForms/ActiveStatus'

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
]
interface laneTableProps {
    tollIdParam?: string
    readOnly?: boolean
    onlyView?: boolean

    handleEditLanes: (id: string) => void
    following?: boolean
    handleCreateNew: (boo: boolean) => void
    editNue: (edit: boolean) => void
    setSelectedLaneId: any
}

const LanesTable = ({
    tollIdParam,
  
    handleEditLanes,
    following,
    handleCreateNew,
    editNue,
    setSelectedLaneId,
}: laneTableProps) => {
    const dispatch = useDispatch()
    
    // States
    const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    const [open, setOpen] = React.useState<boolean>(false)
    const [activeStatus, setActiveStatus] = React.useState<boolean>();
    const [loading, setLoading] = React.useState(false)
    const [modal, setModal] = React.useState<string>('')
    const [selectedId, setSelectedId] = React.useState('')
    const [pageParam, setPageParam] = React.useState(1)
    const [perPageParam, setperPageParam] = React.useState(10)

    const lanes = useSelector((state: DefaultRootStateProps) => state.lanes)

    const countPage = useSelector(
        (state: DefaultRootStateProps) => state.commons.countPage
    )

    const navigate = useNavigate()

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
        setSelectedId(e.currentTarget.dataset.id)
        setOpen(true)
        setModal('remove')
    }

    const handleChangeStatus = (e) => {
        setSelectedId(e.currentTarget.dataset.id);
        const activeButton = e.currentTarget.dataset.active;
        setActiveStatus(activeButton === "true" ? true : false);
        setOpen(true);
        setModal("active");
      };
    
    
      const handleAccept = () => {
        dispatch(
            updateLaneRequest({
            id: selectedId,
              is_active: !activeStatus,
        
          })
        );
        setOpen(false);
        
      
        
      };


    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true)        
                const data = await dispatch(
                    getLaneStateRequest({
                        site_id: tollIdParam ,
                        per_page: perPageParam,
                        page: pageParam,
                    })
                )
                setLoading(false)
                return data
            
        }
        fetchData()
    }, [perPageParam, pageParam])

    React.useEffect(() => {
        const rows = lanes.map(
            ({ id, name, width_m, height_m, is_active }) => ({
                id,
                name,
                width_m,
                height_m,
                is_active: is_active ? (
                    <button
                      onClick={handleChangeStatus}
                      data-id={id}
                      data-active={is_active}
                    >
                      <Chip
                        label="Sí"
                        size="small"
                        chipcolor="success"
                        sx={{ width: "96px" }}
                      />
                    </button>
                  ) : (
                    <button
                      onClick={handleChangeStatus}
                      data-id={id}
                      data-active={is_active}
                    >
                      <Chip
                        label="No"
                        size="small"
                        chipcolor="orange"
                        sx={{ width: "96px" }}
                      />
                    </button>
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
                        <Tooltip title="Eliminar" placement="bottom">
                            <button data-id={id}  onClick={handleDeletelane}>
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
    }, [lanes])

    return (
        <>
            <TableCustom
                columns={columns}
                data={rowsInitial}
                // title="Empleados"
                addIconTooltip="Crear canal"
                handleCreate={handleCreate}
                createRolNotAllowed={['visualizer', 'crm_user', 'monitor_viewer', 'report_viewer', 'gate_device', 'operator']}
                loading={loading}
                pageParam={pageParam}
                setPageParam={setPageParam}
                perPageParam={perPageParam}
                setPerPageParam={setperPageParam}
                countPage={countPage}
            />

            {modal === 'remove' ? (
                <RemoveLane
                    open={open}
                    setOpen={setOpen}
                    selectedId={selectedId}
                    dataToll={tollIdParam}
                />
            ) : null}

{modal === "active" ? (
        <ActiveStatus
          open={open}
          setOpen={setOpen}
          text="¿Estás  seguro que quieres cambiar el estatus?"
          handleAccept={handleAccept}
        />
      ) : null}
        </>
    )
}

export default LanesTable
