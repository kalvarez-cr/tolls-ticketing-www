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
import { vehicle } from '_mockApis/account_management/vehicle'

const columns = [
    {
        Header: 'Placa asociada',
        accessor: 'plate',
    },
    {
        Header: 'Tag',
        accessor: 'tag',
    },
    {
        Header: 'Categoria',
        accessor: 'categoria',
    },
    {
        Header: 'Movimientos',
        accessor: 'movements',
    },
    // {
    //     Header: 'última actualización',
    //     accessor: 'updated_on',
    // },
    {
        Header: 'status',
        accessor: 'active',
        disableFilters: true,
    },
    {
        Header: 'Acciones',
        accessor: 'edit',
        disableFilters: true,
    },
]

const ReadAccount = () => {
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
        navigate(`/gestion-de-cuentas/crear`)
    }
    const onClickCell = (value: string) => {
        // console.log("desde tabla")
        // e.preventDefault()

        // const id = e.currentTarget.dataset.id
        // console.log("id",value)
        navigate(`/gestion-de-cuentas/editar/${value}`)
    }

    React.useEffect(() => {
        // dispatch(getTariffRequest())
    }, [])

    React.useEffect(() => {
        const rows = vehicle.map(
            ({ plate, tag, categoria, movements, active }) => ({
                plate,
                tag,
                categoria,
                movements,
                active: active ? (
                    <Chip
                        label="Activo"
                        size="small"
                        chipcolor="success"
                        sx={{ width: '96px' }}
                    />
                ) : (
                    <Chip
                        label="Inactivo"
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
            })
        )
        setRowsInitial(rows)
    }, [])

    return (
        <div>
            <TableCustom
                columns={columns}
                data={rowsInitial}
                title=" Vehiculos asociados"
                addIconTooltip="Vincular tags"
                handleCreate={handleCreate}
                onClickCell={onClickCell}
            />
        </div>
    )
}

export default ReadAccount
