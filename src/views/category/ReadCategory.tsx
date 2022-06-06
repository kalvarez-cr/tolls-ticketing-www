import React from 'react'

import { useNavigate } from 'react-router-dom'
import Chip from 'ui-component/extended/Chip'
import TableCustom from '../../components/Table'
// import EditIcon from '@material-ui/icons/Edit'
// import VisibilityIcon from '@material-ui/icons/Visibility'
// import SelectColumnFilter from 'components/Table/Filters/SelectColumnFilter'
// import EditIcon from '@material-ui/icons/Edit'
import VisibilityIcon from '@material-ui/icons/Visibility'
import { IconButton } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'
import { getCategoryRequest } from 'store/Category/CategoryActions'

const columns = [
    {
        // Header: ' Tipo de vehículo',
        accessor: 'image',
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
    const dispatch = useDispatch()

    const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    const navigate = useNavigate()
    const categories = useSelector(
        (state: DefaultRootStateProps) => state.category
    )

    const handleEdit = React.useCallback(
        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault()
            const id = e.currentTarget.dataset.id
            navigate(`/categorias/editar/${id}`)
        },
        [navigate]
    )
    // const handleView = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //     e.preventDefault()
    //     const id = e.currentTarget.dataset.id
    //     navigate(`/gestion-de-tarifas/editar/${id}-view`)
    // }

    const handleCreate = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        navigate(`/categorias/crear`)
    }

    React.useEffect(() => {
        dispatch(getCategoryRequest())
    }, [dispatch])

    const handleErrorPic = (e) => {
        e.target.style.src = 'Imagen no disponible'
        e.target.style.display = 'none'
    }

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
            />
        </div>
    )
}

export default ReadFares
