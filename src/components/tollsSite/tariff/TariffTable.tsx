import React from 'react'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import EditIcon from '@material-ui/icons/Edit'
import { IconButton } from '@material-ui/core'

import { getTollsRequest } from 'store/tolls/tollsActions'
import { useDispatch } from 'react-redux'
import TableCustom from 'components/Table'

const columns = [
    {
        Header: 'Categoria',
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
        Header: 'Precio',
        accessor: 'nominal_amount',
    },
    {
        Header: 'Acciones',
        accessor: 'edit',
        disableFilters: true,
    },
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
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const permissions = useSelector(
    //     (state: DefaultRootStateProps) => state.login?.user?.content?.permissions
    // )
    // FUNCTIONS
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
    const handleCreate = () => {
        handleCreateNew(true)
        navigate(`/peajes/editar/${tollIdParam}&&following&&1`)
    }

    // const handleCreate = (e: React.MouseEvent<HTMLElement>) => {
    //     e.preventDefault()
    //     navigate(`/peajes/crear`)
    // }
    // const onClickCell = (value: string) => {
    //     console.log('desde tabla')
    //     // e.preventDefault()

    //     // const id = e.currentTarget.dataset.id
    //     console.log('id', value)
    //     navigate(`/peajes/editar/${value}`)
    // }

    React.useEffect(() => {
        dispatch(getTollsRequest())
    }, [dispatch])

    // EFFECTS
    React.useEffect(() => {
        const rows = tollData.fares.map(
            ({ id, nominal_amount, title, axles, weight_kg }) => ({
                id,
                nominal_amount,
                title,
                axles,
                weight_kg,
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
    }, [tollData])

    return (
        <>
            <TableCustom
                columns={columns}
                data={rowsInitial}
                // title="Empleados"
                addIconTooltip="Crear Tarifa"
                handleCreate={handleCreate}
            />
        </>
    )
}

export default TariffTable
