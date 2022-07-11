import React from 'react'
import { useNavigate } from 'react-router-dom'
import Chip from 'ui-component/extended/Chip'
import TableCustom from '../../components/Table'
import VisibilityIcon from '@material-ui/icons/Visibility'
import { IconButton } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'
import { getCategoryRequest } from 'store/Category/CategoryActions'

const columns = [
    {
        // Header: ' Tipo de vehículo',
        accessor: 'image',
        disableFilters: true,
    },
    {
        Header: ' Tipo de vehículo',
        accessor: 'title',
    },
    {
        Header: 'Ejes',
        accessor: 'axles',
    },
    // {
    //     Header: 'Peso(Kg)',
    //     accessor: 'weight_kg',
    // },

    {
        Header: 'Estado',
        accessor: 'active',
        disableFilters: true,
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

    // ================= CUSTOM HOOKS =================

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // ==================== REDUX ====================

    const categories = useSelector(
        (state: DefaultRootStateProps) => state.category
    )
    const countPage = useSelector(
        (state: DefaultRootStateProps) => state.commons.countPage
    )

    // ==================== FUNCTIONS ====================

    const handleEdit = React.useCallback(
        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault()
            const id = e.currentTarget.dataset.id
            navigate(`/categorias/editar/${id}`)
        },
        [navigate]
    )

    const handleCreate = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        navigate(`/categorias/crear`)
    }

    const handleErrorPic = (e) => {
        e.target.style.src = 'Imagen no disponible'
        e.target.style.display = 'none'
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
            const data = await dispatch(
                getCategoryRequest({
                    _all_: true,
                    per_page: perPageParam,
                    page: pageParam,
                })
            )
            setLoading(false)
            return data
        }
        fetchData()
    }, [dispatch, perPageParam, pageParam])

    React.useEffect(() => {
        const rows = categories.map(
            ({ id, title, axles, active, weight_kg, image }) => ({
                id,
                title,
                axles,
                weight_kg,
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
                image: (
                    <img
                        src={image}
                        alt="Imagen no disponible"
                        onError={handleErrorPic}
                        width="70px"
                        height="70px"
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
            })
        )
        setRowsInitial(rows)
    }, [categories, handleEdit])

    return (
        <div>
            <TableCustom
                columns={columns}
                data={rowsInitial}
                title=" Categorías de vehiculos"
                addIconTooltip="Añadir categoría"
                handleCreate={handleCreate}
                loading={loading}
                pageParam={pageParam}
                setPageParam={setPageParam}
                perPageParam={perPageParam}
                setPerPageParam={setperPageParam}
                countPage={countPage}
            />
        </div>
    )
}

export default ReadFares
