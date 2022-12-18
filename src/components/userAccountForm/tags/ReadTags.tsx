import { IconButton, Tooltip } from '@material-ui/core'
import React from 'react'

// import Chip from 'ui-component/extended/Chip'
import TableCustom from '../../Table'

import VisibilityIcon from '@material-ui/icons/Visibility'
// import SelectColumnFilter from 'components/Table/Filters/SelectColumnFilter'
// import EditIcon from '@material-ui/icons/Edit'

const columns = [
    {
        Header: 'Serial',
        accessor: 'tag_serial',
    },
    {
        Header: 'Número de tag',
        accessor: 'tag_number',
    },
    {
        Header: 'Media',
        accessor: 'media',
    },

    // {
    //     Header: 'Direccción',
    //     accessor: 'address',
    // },
    // {
    //     Header: 'Status',
    //     accessor: 'status',
    //     disableFilters: true,
    // },
    {
        Header: 'Acciones',
        accessor: 'edit',
        disableFilters: true,
    },
]
interface Tagsprops {
    userData?: any
    setEditTag?: any
    handleEditTag: any
    editNew: (edit: boolean) => void
    setDataTag?: any
}
const ReadTags = ({
    userData,
    setDataTag,
    setEditTag,
    handleEditTag,
    editNew,
}: Tagsprops) => {
    // const dispatch = useDispatch()

    // const [loading, setLoading] = React.useState(false)
    const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    // const [open, setOpen] = React.useState<boolean>(false)
    // const [modal, setModal] = React.useState<string>('')
    // const [selectedId, setSelectedId] = React.useState('')

    React.useEffect(() => {
        const rows = userData.map(({ id, tag_serial, tag_number, media }) => ({
            tag_serial,
            tag_number,
            media,

            // status: status ? (
            //     <Chip
            //         label="Activo"
            //         size="small"
            //         chipcolor="success"
            //         sx={{ width: '96px' }}
            //     />
            // ) : (
            //     <Chip
            //         label="Inactivo"
            //         size="small"
            //         chipcolor="orange"
            //         sx={{ width: '96px' }}
            //     />
            // ),
            edit: (
                <div className="flex">
                    <Tooltip title="Ver" placement="bottom">
                        <button data-id={id} onClick={handleEditTag}>
                            <IconButton color="primary">
                                <VisibilityIcon sx={{ fontSize: '1.3rem' }} />
                            </IconButton>
                        </button>
                    </Tooltip>
                </div>
            ),
        }))
        setRowsInitial(rows)
    }, [userData, handleEditTag])

    return (
        <>
            <TableCustom
                columns={columns}
                data={rowsInitial}
                // title=" Usuarios"
                // addIconTooltip="Crear usuario"
                // handleCreate={handleCreate}
                // loading={loading}
            />
        </>
    )
}

export default ReadTags
