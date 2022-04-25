import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getTagRequest } from 'store/saleTag/saleTagActions'

import { DefaultRootStateProps } from 'types'
// import Chip from 'ui-component/extended/Chip'
import TableCustom from '../../components/Table'
// import EditIcon from '@material-ui/icons/Edit'
// import VisibilityIcon from '@material-ui/icons/Visibility'
// import SelectColumnFilter from 'components/Table/Filters/SelectColumnFilter'
import EditIcon from '@material-ui/icons/Edit'
import { IconButton } from '@material-ui/core'
// import { useSelector } from 'react-redux'
// import { DefaultRootStateProps } from 'types'
// import { Tag } from '_mockApis/Tags/Tag'

const columns = [
    {
        Header: 'Tag',
        accessor: 'tag_number',
    },
    {
        Header: 'Serial',
        accessor: 'tag_serial',
    },
    {
        Header: 'Media',
        accessor: 'media',
    },
    // {
    //     Header: 'Nombre',
    //     accessor: 'name',
    // },
    // {
    //     Header: 'última actualización',
    //     accessor: 'updated_on',
    // },
    // {
    //     Header: 'Disponible',
    //     accessor: 'active',
    //     disableFilters: true,
    // },
    {
        Header: 'Acciones',
        accessor: 'edit',
        disableFilters: true,
    },
]

const ReadTags = () => {
    const dispatch = useDispatch()
    const saleTag = useSelector((state: DefaultRootStateProps) => state.saleTag)

    const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    const navigate = useNavigate()
    // const fares = useSelector((state: DefaultRootStateProps) => state.fares)
    // const permissions = useSelector((state: DefaultRootStateProps) => state.login?.user?.content?.permissions)

    const handleEdit = React.useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const id = e.currentTarget.dataset.id
        navigate(`/ventaTag/editar/${id}`)
    }, [navigate])
    // const handleView = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //     e.preventDefault()
    //     const id = e.currentTarget.dataset.id
    //     navigate(`/gestion-de-tarifas/editar/${id}-view`)
    // }

    const handleCreate = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        navigate(`/ventaTag/crear`)
    }
    // const onClickCell = (value: string) => {
    //     // console.log("desde tabla")
    //     // e.preventDefault()

    //     // const id = e.currentTarget.dataset.id
    //     // console.log("id",value)
    //     navigate(`/ventaTag/editar/${value}`)
    // }

    React.useEffect(() => {
        dispatch(getTagRequest())
    }, [dispatch])

    React.useEffect(() => {
        const rows = saleTag.map(({ id, tag_number, tag_serial, media }) => ({
            id,
            tag_number,
            tag_serial,
            media,
            // active: active ? (
            //     <Chip
            //         label="Si"
            //         size="small"
            //         chipcolor="success"
            //         sx={{ width: '96px' }}
            //     />
            // ) : (
            //     <Chip
            //         label="No"
            //         size="small"
            //         chipcolor="orange"
            //         sx={{ width: '96px' }}
            //     />
            // ),
            edit: (
                <div className="flex">
                    <button data-id={id} onClick={handleEdit}>
                        <IconButton color="primary">
                            <EditIcon sx={{ fontSize: '1.3rem' }} />
                        </IconButton>
                    </button>
                </div>
            ),
        }))
        setRowsInitial(rows)
    }, [handleEdit, saleTag])

    return (
        <div>
            <TableCustom
                columns={columns}
                data={rowsInitial}
                title=" Tags disponibles"
                addIconTooltip="Añadir tags"
                handleCreate={handleCreate}
            />
        </div>
    )
}

export default ReadTags
