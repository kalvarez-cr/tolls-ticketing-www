import React from 'react'
import { useNavigate } from 'react-router-dom'
import TableCustom from '../../components/Table'
import VisibilityIcon from '@material-ui/icons/Visibility'
import { IconButton } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'
import { getLiquidationConceptRequest } from 'store/liquidationConceptInSite/liquidationConceptInSiteActions'

const columns = [
    {
        Header: 'Compañia',
        accessor: 'company',
    },
    {
        Header: 'Porcentaje',
        accessor: 'settlement_percentage',
    },
    {
        Header: 'Periodicidad',
        accessor: 'settlement_days',
    },
    {
        Header: 'Acciones',
        accessor: 'edit',
        disableFilters: true,
    },
]

const ReadFares = () => {
    // ==================== STATE ====================

    const [loading, setLoading] = React.useState(false)
    const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    const [pageParam, setPageParam] = React.useState(1)
    const [perPageParam, setperPageParam] = React.useState(10)
    const [searchInputValue, setSearchInputValue] = React.useState<string>('')
    console.log(setSearchInputValue)
    // ================= CUSTOM HOOKS =================
    const days = useSelector(
        (state: DefaultRootStateProps) => state.login?.user?.days
    )
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // ==================== REDUX ====================

    const liquidationConcept = useSelector(
        (state: DefaultRootStateProps) => state.liquidationConcept
    )
    const countPage = useSelector(
        (state: DefaultRootStateProps) => state.commons.countPage
    )

    // ==================== FUNCTIONS ====================

    const handleEdit = React.useCallback(
        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault()
            const id = e.currentTarget.dataset.id
            navigate(`/liquidacion/editar/${id}`)
        },
        [navigate]
    )

    const handleCreate = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        navigate(`/liquidacion/crear`)
    }

    // const handleView = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //     e.preventDefault()
    //     const id = e.currentTarget.dataset.id
    //     navigate(`/gestion-de-tarifas/editar/${id}-view`)
    // }

    // ==================== EFFECTS ====================

    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            if (searchInputValue !== '') {
                // const data = await dispatch(
                //     getCategoryRequest({
                //         filter: true,
                //         criteria: searchInputValue,
                //         per_page: perPageParam,
                //         page: pageParam,
                //     })
                // )
                setLoading(false)
                // return data
            } else {
                const data = await dispatch(
                    getLiquidationConceptRequest({
                        _all_: true,
                        per_page: perPageParam,
                        page: pageParam,
                    })
                )
                setLoading(false)
                return data
            }
        }
        fetchData()
    }, [dispatch, perPageParam, pageParam, searchInputValue])

    React.useEffect(() => {
        const rows = liquidationConcept.map(
            ({ id, company, settlement_percentage, settlement_days }) => ({
                id,
                company: company.name,
                settlement_days: settlement_days?.map((day) => {
                    const nameDay = days.find((day2) => day === day2.value).name
                    return <p>{nameDay}</p>
                }),
                settlement_percentage,
                edit: (
                    <div className="flex">
                        <button data-id={id} onClick={handleEdit}>
                            <IconButton color="primary">
                                <VisibilityIcon sx={{ fontSize: '1.3rem' }} />
                            </IconButton>
                        </button>
                    </div>
                ),
            })
        )
        setRowsInitial(rows)
    }, [liquidationConcept, handleEdit])

    return (
        <div>
            <TableCustom
                columns={columns}
                data={rowsInitial}
                title="Liquidaciones"
                addIconTooltip="Añadir liquidación "
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
    )
}

export default ReadFares
