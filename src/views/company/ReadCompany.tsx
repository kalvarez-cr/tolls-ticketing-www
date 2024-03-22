import React from 'react'

import { useNavigate } from 'react-router-dom'
import TableCustom from '../../components/Table'
import VisibilityIcon from '@material-ui/icons/Visibility'
import { IconButton, Tooltip } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'
import Chip from 'ui-component/extended/Chip'
import { getCompaniesRequest, updateCompaniesRequest } from 'store/company/companyActions'
import ActiveStatus from 'components/removeForms/ActiveStatus'

const columns = [
    {
        Header: 'Empresa',
        accessor: 'name',
    },

    {
        Header: 'Rif ',
        accessor: 'nif',
    },
    {
        Header: 'Estado ',
        accessor: 'state',
    },

    {
        Header: 'Representante legal',
        accessor: 'legal_representative',
    },
    {
        Header: 'Activo',
        accessor: 'active',
        disableFilters: true,
    },
    {
        Header: 'Acciones',
        accessor: 'edit',
        disableFilters: true,
    },
]

const ReadEmployee = () => {
    // ==================== STATE ====================

    const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    const [loading, setLoading] = React.useState(false)
    const [pageParam, setPageParam] = React.useState(1)
    const [perPageParam, setperPageParam] = React.useState(10)
    const [open, setOpen] = React.useState<boolean>(false);
    const [modal, setModal] = React.useState<string>("");
    const [activeStatus, setActiveStatus] = React.useState<boolean>();
    const [selectedId, setSelectedId] = React.useState("");
    // const [searchInputValue, setSearchInputValue] = React.useState<string>('')

    // ================= CUSTOM HOOKS =================

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // ==================== REDUX ====================

    const companies = useSelector(
        (state: DefaultRootStateProps) => state.company
    )
    const countPage = useSelector(
        (state: DefaultRootStateProps) => state.commons.countPage
    )

    // ==================== FUNCTIONS ====================

    const handleEdit = React.useCallback(
        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault()
            const id = e.currentTarget.dataset.id
            navigate(`/empresas/editar/${id}`)
        },
        [navigate]
    )

    const handleCreate = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        navigate(`/empresas/crear`)
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
            updateCompaniesRequest({
            id: selectedId,      
        active: !activeStatus,
            
          })
        );
        setOpen(false);
      };

    // ==================== EFFECTS ====================

    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            // if (searchInputValue !== '') {
            //     const data = await dispatch(
            //         getEmployeesRequest({
            //             filter: true,
            //             criteria: searchInputValue,
            //             per_page: perPageParam,
            //             page: pageParam,
            //         })
            //     )
            //     setLoading(false)
            //     return data
            // } else {
            const data = await dispatch(
                getCompaniesRequest({
                    _all_: true,
                    per_page: perPageParam,
                    page: pageParam,
                })
            )
            setLoading(false)
            return data
        }
        // }
        fetchData()
    }, [perPageParam, pageParam])

    React.useEffect(() => {
        const rows = companies.map(
            ({ id, name, nif, legal_representative, active, state }) => ({
                id,
                name,
                nif,
                legal_representative,
                state: state?.name,

                active: active ? (
                    <button
                      onClick={handleChangeStatus}
                      data-id={id}
                      data-active={active}
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
                      data-active={active}
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
                        {/* <Tooltip title="Eliminar">
                            <button data-id={id} onClick={handleDeleteEmployee}>
                                <IconButton color="primary">
                                    <RemoveCircleIcon
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
    }, [companies, handleEdit])

    return (
        <>
            <div className="my-6">
                <TableCustom
                    columns={columns}
                    data={rowsInitial}
                    title="Gestión de Empresas"
                    addIconTooltip="Añadir empresa"
                    handleCreate={handleCreate}
                    loading={loading}
                    pageParam={pageParam}
                    setPageParam={setPageParam}
                    perPageParam={perPageParam}
                    setPerPageParam={setperPageParam}
                    countPage={countPage}
                    createRolNotAllowed={['visualizer', 'administrator']}
                   
                    // setSearchInputValue={setSearchInputValue}
                />
            </div>

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

export default ReadEmployee
