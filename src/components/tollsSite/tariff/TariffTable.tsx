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
    // States
    const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    // Customs Hooks

    const [open, setOpen] = React.useState<boolean>(false)
    const [modal, setModal] = React.useState<string>('')
    const [selectedId, setSelectedId] = React.useState('')

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

    // EFFECTS
    React.useEffect(() => {
        const rows = tollData.fares.map(
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
    }, [handleEdit, tollData])

    return (
        <>
            <TableCustom
                columns={columns}
                data={rowsInitial}
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
