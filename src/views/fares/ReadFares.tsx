import React from 'react'
// import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Chip from 'ui-component/extended/Chip'
import TableCustom from '../../components/Table'
// import EditIcon from '@material-ui/icons/Edit'
// import VisibilityIcon from '@material-ui/icons/Visibility'
// import SelectColumnFilter from 'components/Table/Filters/SelectColumnFilter'
// import EditIcon from '@material-ui/icons/Edit'
// import { IconButton } from '@material-ui/core'
// import { useSelector } from 'react-redux'
// import { DefaultRootStateProps } from 'types'
import { fares } from '_mockApis/tariff/fare'

const columns = [
    {
        Header: 'Vehiculo',
        accessor: 'type_vehicle',
    },
    {
        Header: 'Ejes',
        accessor: 'number_ejes',
    },
    {
        Header: 'Peso(toneladas)',
        accessor: 'weight',
    },
    // {
    //     Header: 'Fecha de creación',
    //     accessor: 'created_on',
    // },
    // {
    //     Header: 'última actualización',
    //     accessor: 'updated_on',
    // },
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
    // const dispatch = useDispatch()

    const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    const navigate = useNavigate()
    // const fares = useSelector((state: DefaultRootStateProps) => state.fares)
    // const permissions = useSelector((state: DefaultRootStateProps) => state.login?.user?.content?.permissions)

    // const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //     e.preventDefault()
    //     const id = e.currentTarget.dataset.id
    //     navigate(`/gestion-de-tarifas/editar/${id}`)
    // }
    // const handleView = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //     e.preventDefault()
    //     const id = e.currentTarget.dataset.id
    //     navigate(`/gestion-de-tarifas/editar/${id}-view`)
    // }

    const handleCreate = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        navigate(`/tarifas/crear`)
    }
    const onClickCell = (value: string) => {
        // console.log("desde tabla")
        // e.preventDefault()

        // const id = e.currentTarget.dataset.id
        // console.log("id",value)
        navigate(`/tarifas/editar/${value}`)
    }

    React.useEffect(() => {
        // dispatch(getTariffRequest())
    }, [])

    React.useEffect(() => {
        const rows = fares.map(({ number_ejes, type_vehicle, active }) => ({
            number_ejes,
            type_vehicle,
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
            // edit:(
            // <div className="flex">
            //     <button data-id={id} onClick={handleEdit}>
            //         <IconButton color="primary">
            //             <EditIcon sx={{ fontSize: '1.3rem' }} />
            //         </IconButton>
            //     </button>
            // </div>

            // <div className="flex">
            //     <button data-id={id} onClick={handleView}>
            //         <IconButton color="primary">
            //             <VisibilityIcon sx={{ fontSize: '1.3rem' }} />
            //         </IconButton>
            //     </button>
            // </div>
            // ),
        }))
        setRowsInitial(rows)
    }, [fares])

    return (
        <div>
            <TableCustom
                columns={columns}
                data={rowsInitial}
                title=" Categorías de tarifas"
                addIconTooltip="Añadir tarifas"
                handleCreate={handleCreate}
                onClickCell={onClickCell}
            />
        </div>
    )
}

export default ReadFares
