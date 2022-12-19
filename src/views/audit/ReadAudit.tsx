import React from 'react'

import { useNavigate } from 'react-router-dom'
import TableCustom from '../../components/Table'
// import VisibilityIcon from '@material-ui/icons/Visibility'
import { Tooltip } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'
import { getCompaniesRequest } from 'store/company/companyActions'

const columns = [
    {
        Header: 'Fecha',
        accessor: 'reported_on_date',
    },
    {
        Header: 'Hora ',
        accessor: 'reported_on_time',
    },

    {
        Header: 'Estado',
        accessor: 'status',
    },
    {
        Header: 'Peaje',
        accessor: 'site_code',
        disableFilters: true,
    },
    {
        Header: 'Canal',
        accessor: 'lane_code',
        disableFilters: true,
    },
    {
        Header: 'Operador',
        accessor: 'operator',
        disableFilters: true,
    },
    {
        Header: 'Categoria',
        accessor: 'reported_fare_category',
        disableFilters: true,
    },
    {
        Header: 'Monto',
        accessor: 'collected_amount',
        disableFilters: true,
    },
    {
        Header: 'Acciones',
        accessor: 'edit',
        disableFilters: true,
    },
]

const ReadAudit = () => {
    // ==================== STATE ====================

    const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    const [loading, setLoading] = React.useState(false)
    const [pageParam, setPageParam] = React.useState(1)
    const [perPageParam, setperPageParam] = React.useState(10)
    const [selectedRows, setSelectedRows] = React.useState([])
    // const [searchInputValue, setSearchInputValue] = React.useState<string>('')
    console.log(selectedRows)
    // ================= CUSTOM HOOKS =================

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // ==================== REDUX ====================

    const audits = useSelector((state: DefaultRootStateProps) => state.audit)
    const countPage = useSelector(
        (state: DefaultRootStateProps) => state.commons.countPage
    )

    // ==================== FUNCTIONS ====================

    const handleAudit = React.useCallback(
        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault()
            const id = e.currentTarget.dataset.id
            navigate(`/audit/${id}`)
        },
        [navigate]
    )

    const handleAudits = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        // navigate(`/empresas/crear`)
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
        const rows = audits.map(
            ({
                id,
                site_code,
                lane_code,
                collected_amount,
                reported_fare_category,
                reported_on,
                status,
                operator,
            }) => ({
                site_code,
                lane_code,
                collected_amount,
                reported_fare_category,
                reported_on_date: new Date(reported_on).toLocaleDateString(
                    'es-VE'
                ),
                reported_on_time: new Date(reported_on).toLocaleTimeString(
                    'es-VE'
                ),
                status,
                operator,
                edit: (
                    <div className="flex">
                        <Tooltip title="Ver" placement="bottom">
                            <button data-id={id} onClick={handleAudit}>
                                {/* <IconButton color="primary">
                                    <VisibilityIcon
                                        sx={{ fontSize: '1.3rem' }}
                                    />
                                </IconButton> */}
                                Auditar
                            </button>
                        </Tooltip>
                    </div>
                ),
            })
        )
        setRowsInitial(rows)
    }, [audits, handleAudit])

    return (
        <>
            <div className="my-6">
                <TableCustom
                    columns={columns}
                    data={rowsInitial}
                    title="Auditoria"
                    addIconTooltip="Auditar"
                    handleCreate={
                        selectedRows.length > 0 ? handleAudits : undefined
                    }
                    loading={loading}
                    pageParam={pageParam}
                    setPageParam={setPageParam}
                    perPageParam={perPageParam}
                    setPerPageParam={setperPageParam}
                    countPage={countPage}
                    setSelectedRows={setSelectedRows}
                    // setSearchInputValue={setSearchInputValue}
                />
            </div>
        </>
    )
}

export default ReadAudit
