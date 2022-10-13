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
// import EditIcon from '@material-ui/icons/Edit'
import VisibilityIcon from '@material-ui/icons/Visibility'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import { IconButton, Tooltip } from '@material-ui/core'
import RemoveTag from 'components/removeForms/RemoveTag'
// import { useSelector } from 'react-redux'
// import { DefaultRootStateProps } from 'types'
// import { Tag } from '_mockApis/Tags/Tag'

const columns = [
    {
        Header: 'Media',
        accessor: 'media_spanish',
    },
    {
        Header: 'Serial',
        accessor: 'tag_serial',
    },
    {
        Header: 'Tag',
        accessor: 'tag_number',
    },
    {
        Header: 'Acciones',
        accessor: 'edit',
        disableFilters: true,
    },
]

const ReadTags = () => {
    const navigate = useNavigate()

    // ==================== STATE ====================

    const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    const [open, setOpen] = React.useState<boolean>(false)
    const [modal, setModal] = React.useState<string>('')
    const [selectedId, setSelectedId] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [pageParam, setPageParam] = React.useState(1)
    const [perPageParam, setperPageParam] = React.useState(10)
    const [searchInputValue, setSearchInputValue] = React.useState<string>('')

    // ==================== REDUX ====================

    const dispatch = useDispatch()
    const saleTag = useSelector((state: DefaultRootStateProps) => state.saleTag)
    const countPage = useSelector(
        (state: DefaultRootStateProps) => state.commons.countPage
    )
    // const permissions = useSelector((state: DefaultRootStateProps) => state.login?.user?.content?.permissions)

    const handleEdit = React.useCallback(
        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault()
            const id = e.currentTarget.dataset.id
            navigate(`/ventaTag/editar/${id}`)
        },
        [navigate]
    )

    // ==================== FUNCTIONS ====================

    const handleCreate = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        navigate(`/ventaTag/crear`)
    }

    const handleDeleteTag = (e) => {
        setSelectedId(e.currentTarget.dataset.id)
        setOpen(true)
        setModal('remove')
    }

    // ==================== EFFECTS ====================

    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            if (searchInputValue !== '') {
                const data = await dispatch(
                    getTagRequest({
                        filter: true,
                        criteria: searchInputValue,
                        per_page: perPageParam,
                        page: pageParam,
                    })
                )
                setLoading(false)
                return data
            } else {
                const data = await dispatch(
                    getTagRequest({
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
        const rows = saleTag.map(
            ({ id, tag_number, tag_serial, media_spanish }) => ({
                id,
                tag_number,
                tag_serial,
                media_spanish,
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
                        <Tooltip title="Ver" placement="bottom">
                            <button data-id={id} onClick={handleEdit}>
                                <IconButton color="primary">
                                    <VisibilityIcon
                                        sx={{ fontSize: '1.3rem' }}
                                    />
                                </IconButton>
                            </button>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                            <button data-id={id} onClick={handleDeleteTag}>
                                <IconButton color="primary">
                                    <RemoveCircleIcon
                                        sx={{ fontSize: '1.3rem' }}
                                    />
                                </IconButton>
                            </button>
                        </Tooltip>
                    </div>
                ),
            })
        )
        setRowsInitial(rows)
    }, [handleEdit, saleTag])

    return (
        <>
            <div>
                <TableCustom
                    columns={columns}
                    data={rowsInitial}
                    title=" Tags disponibles"
                    addIconTooltip="Añadir tags"
                    handleCreate={handleCreate}
                    loading={loading}
                    pageParam={pageParam}
                    setPageParam={setPageParam}
                    perPageParam={perPageParam}
                    setPerPageParam={setperPageParam}
                    countPage={countPage}
                    setSearchInputValue={setSearchInputValue}
                />
            </div>

            {modal === 'remove' ? (
                <RemoveTag
                    open={open}
                    setOpen={setOpen}
                    selectedId={selectedId}
                />
            ) : null}
        </>
    )
}

export default ReadTags
