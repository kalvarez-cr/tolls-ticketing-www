import React from 'react'
// import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Chip from 'ui-component/extended/Chip'
import TableCustom from '../../components/Table'
// import EditIcon from '@material-ui/icons/Edit'
// import VisibilityIcon from '@material-ui/icons/Visibility'
// import SelectColumnFilter from 'components/Table/Filters/SelectColumnFilter'
import EditIcon from '@material-ui/icons/Edit'
import { IconButton } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'
import { getCategoryRequest } from 'store/Category/CategoryActions'

const columns = [
    {
        Header: ' Tipo de vehiculo',
        accessor: 'title',
    },
    {
        Header: 'Ejes',
        accessor: 'axles',
    },
    {
        Header: 'Peso',
        accessor: 'weight_kg',
    },

    {
        Header: 'Status',
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

    const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const id = e.currentTarget.dataset.id
        navigate(`/categorias/editar/${id}`)
    }
    // const handleView = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //     e.preventDefault()
    //     const id = e.currentTarget.dataset.id
    //     navigate(`/gestion-de-tarifas/editar/${id}-view`)
    // }

    const handleCreate = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        navigate(`/categorias/crear`)
    }
    // const onClickCell = (value: string) => {
    //     // console.log("desde tabla")
    //     // e.preventDefault()

    //     // const id = e.currentTarget.dataset.id
    //     // console.log("id",value)
    //     navigate(`/categorias/editar/${value}`)
    // }

    React.useEffect(() => {
        dispatch(getCategoryRequest())
    }, [])

    React.useEffect(() => {
        const rows = categories.map(
            ({ id, title, axles, active, weight_kg }) => ({
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
    }, [])

    return (
        <div>
            <TableCustom
                columns={columns}
                data={rowsInitial}
                title=" Categorías de vehiculos"
                addIconTooltip="Añadir categorias"
                handleCreate={handleCreate}
            />
        </div>
    )
}

export default ReadFares
