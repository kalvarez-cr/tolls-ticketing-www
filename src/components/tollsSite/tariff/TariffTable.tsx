import React from 'react'
import { useCallback } from 'react'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import { IconButton } from '@material-ui/core'
// import EditIcon from '@material-ui/icons/Edit'
// import { IconButton } from '@material-ui/core'

// import { getTollsRequest } from 'store/tolls/tollsActions'
// import { useDispatch } from 'react-redux'
import TableCustom from 'components/Table'
import RemoveFare from 'components/removeForms/RemoveFare'
import { useDispatch, useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'
import { getFareByTollId } from 'store/fare/FareActions'

const columns = [
    {
        Header: 'Categoría',
        accessor: 'title',
    },
    {
        Header: 'Nombre',
        accessor: 'fare_name',
    },
    {
        Header: 'Precio',
        accessor: 'nominal_amount',
    },
    {
        Header: 'Factor por peso(Bs)',
        accessor: 'weight_factor',
        align: 'center',
    },

    {
        accessor: 'delete',
        disableFilters: true,
    },
    // {
    //     Header: 'Acciones',
    //     accessor: 'edit',
    //     disableFilters: true,
    // },
]
interface laneTableProps {
    tollIdParam?: string
    readOnly?: boolean
    onlyView?: boolean
    tollData?: any
    handleEditLanes: (id: string) => void
    following?: boolean
    editNew: (edit: boolean) => void
    handleCreateNew: (boo: boolean) => void
}

const TariffTable = ({
    tollIdParam,
    tollData,
    handleEditLanes,
    following,
    editNew,
    handleCreateNew,
}: laneTableProps) => {
    const dispatch = useDispatch()
    
    // States
    const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
   

    const [open, setOpen] = React.useState<boolean>(false)
    const [loading, setLoading] = React.useState(false)
    const [modal, setModal] = React.useState<string>('')
    const [selectedId, setSelectedId] = React.useState('')
    const [pageParam, setPageParam] = React.useState(1)
    const [perPageParam, setperPageParam] = React.useState(10)

    const fares = useSelector((state: DefaultRootStateProps) => state.fare)
    const countPage = useSelector(
        (state: DefaultRootStateProps) => state.commons.countPage
    )

    const handleEdit = useCallback(
        (e) => {
            e.preventDefault()
            const id = e.currentTarget.dataset.id
            editNew(true)
            handleCreateNew(false)
            handleEditLanes(id)
        },
        [handleEditLanes, editNew, handleCreateNew]
    )
    const handleDeleteTariff = (e) => {
        setSelectedId(e.currentTarget.dataset.id)
        setOpen(true)
        setModal('remove')
    }

    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true)        
                const data = await dispatch(
                    getFareByTollId({
                        site_id: tollIdParam ,
                        per_page: perPageParam,
                        page: pageParam,
                    })
                )
                setLoading(false)
                return data
            
        }
        fetchData()
    }, [perPageParam, pageParam])


    // EFFECTS
    React.useEffect(() => {
        const rows = fares.map(
            ({ id, nominal_amount, title, fare_name, weight_factor }) => ({
                id,
                nominal_amount,
                title,
                fare_name,
                weight_factor,
                delete: (
                    <div className="flex">
                        <button data-id={id} onClick={handleDeleteTariff}>
                            <IconButton color="primary">
                                <RemoveCircleIcon sx={{ fontSize: '1.3rem' }} />
                            </IconButton>
                        </button>
                    </div>
                ),
            })
        )
        setRowsInitial(rows)
    }, [handleEdit, fares])

    return (
        <>
            <TableCustom
                columns={columns}
                data={rowsInitial}
                loading={loading}
                pageParam={pageParam}
                setPageParam={setPageParam}
                perPageParam={perPageParam}
                setPerPageParam={setperPageParam}
                countPage={countPage}
                // title="Empleados"
                // addIconTooltip="Crear Tarifa"
                // handleCreate={handleCreate}
            />

            {modal === 'remove' ? (
                <RemoveFare
                    open={open}
                    setOpen={setOpen}
                    selectedId={selectedId}
                />
            ) : null}
        </>
    )
}

export default TariffTable
