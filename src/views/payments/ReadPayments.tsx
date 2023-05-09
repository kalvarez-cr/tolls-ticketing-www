import React from 'react'
import { useNavigate } from 'react-router-dom'
import TableCustom from '../../components/Table'
import VisibilityIcon from '@material-ui/icons/Visibility'
import { IconButton } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'
import { getPaymentsRequest } from 'store/payments/paymentsActions'

const columns = [
    {
        Header: 'Código',
        accessor: 'method_code',
    },
    {
        Header: 'Nombre',
        accessor: 'name',
    },
    {
        Header: 'Descripción',
        accessor: 'description',
    },
    {
        Header: 'Abreviatura',
        accessor: 'abbreviation',
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

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // ==================== REDUX ====================

    const payment = useSelector(
        (state: DefaultRootStateProps) => state.payments
    )
    const countPage = useSelector(
        (state: DefaultRootStateProps) => state.commons.countPage
    )

    // ==================== FUNCTIONS ====================

    const handleEdit = React.useCallback(
        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault()
            const id = e.currentTarget.dataset.id
            navigate(`/pagos/editar/${id}`)
        },
        [navigate]
    )

    const handleCreate = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        navigate(`/pagos/crear`)
    }

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
                    getPaymentsRequest({
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
        const rows = payment.map(
            ({ id, method_code, name, description, abbreviation }) => ({
                id,
                method_code,
                name,
                description,
                abbreviation,

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
    }, [payment, handleEdit])

    return (
        <div>
            <TableCustom
                columns={columns}
                data={rowsInitial}
                title="Métodos de pago"
                addIconTooltip="Añadir Métodos de pago"
                handleCreate={handleCreate}
                loading={loading}
                pageParam={pageParam}
                setPageParam={setPageParam}
                perPageParam={perPageParam}
                setPerPageParam={setperPageParam}
                countPage={countPage}
                createRolNotAllowed={['visualizer']}
                // setSearchInputValue={setSearchInputValue}
            />
        </div>
    )
}

export default ReadFares
