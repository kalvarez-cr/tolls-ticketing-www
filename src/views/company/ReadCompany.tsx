import React from 'react'

import { useNavigate } from 'react-router-dom'
import TableCustom from '../../components/Table'
import VisibilityIcon from '@material-ui/icons/Visibility'
import { IconButton, Tooltip } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'
import Chip from 'ui-component/extended/Chip'
import { getCompaniesRequest } from 'store/company/companyActions'

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
                    title="Empresas"
                    addIconTooltip="Añadir empresa"
                    handleCreate={handleCreate}
                    loading={loading}
                    pageParam={pageParam}
                    setPageParam={setPageParam}
                    perPageParam={perPageParam}
                    setPerPageParam={setperPageParam}
                    countPage={countPage}
                    // setSearchInputValue={setSearchInputValue}
                />
            </div>
        </>
    )
}

export default ReadEmployee
