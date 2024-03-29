import React from 'react'
import { useNavigate } from 'react-router-dom'
import TableCustom from '../../components/Table'
import VisibilityIcon from '@material-ui/icons/Visibility'
import { IconButton } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'
import { getCategorySiteRequest } from 'store/categorySite/categorySiteActions'

const columns = [
    {
        Header: 'Código',
        accessor: 'category_code',
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
        Header: 'Servicios obligatorios',
        accessor: 'mandatory_services',
        disableFilters: true,
    },
    { Header: '% Tarifa base', accessor: 'base_fee_percentage' },
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

    const categories = useSelector(
        (state: DefaultRootStateProps) => state.categorySite
    )
    const countPage = useSelector(
        (state: DefaultRootStateProps) => state.commons.countPage
    )

    // ==================== FUNCTIONS ====================

    const handleEdit = React.useCallback(
        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault()
            const id = e.currentTarget.dataset.id
            navigate(`/categorias-de-peaje/editar/${id}`)
        },
        [navigate]
    )

    const handleCreate = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        navigate(`/categorias-de-peaje/crear`)
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
                    getCategorySiteRequest({
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
        const rows = categories.map(
            ({
                id,
                description,
                mandatory_services,
                category_code,
                name,
                base_fee_percentage,
            }) => ({
                id,
                description,
                mandatory_services: mandatory_services?.map((service) => (
                    <div>{service.name}</div>
                )),
                category_code,
                name,
                base_fee_percentage,
                // active: active ? (
                //     <Chip
                //         label="Habilitado"
                //         size="small"
                //         chipcolor="success"
                //         sx={{ width: '96px' }}
                //     />
                // ) : (
                //     <Chip
                //         label="Deshabilitado"
                //         size="small"
                //         chipcolor="orange"
                //         sx={{ width: '96px' }}
                //     />
                // ),

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
    }, [categories, handleEdit])

    return (
        <div>
            <TableCustom
                columns={columns}
                data={rowsInitial}
                title=" Categorías de peajes"
                addIconTooltip="Añadir categoría"
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
    )
}

export default ReadFares
