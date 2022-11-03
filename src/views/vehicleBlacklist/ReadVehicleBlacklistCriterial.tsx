import React from 'react'
import { useNavigate } from 'react-router-dom'
import TableCustom from '../../components/Table'
import VisibilityIcon from '@material-ui/icons/Visibility'
import { IconButton } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'
import { getVehicleBlacklistRequest } from 'store/blacklistVehicle/blacklistVehicleActions'

const columns = [
    {
        Header: 'Placa',
        accessor: 'plate',
    },
    {
        Header: 'Modelo',
        accessor: 'model',
    },
    {
        Header: 'Año',
        accessor: 'year',
    },

    {
        Header: 'Acciones',
        accessor: 'edit',
        disableFilters: true,
    },
]

const ReadFares = () => {
    // ==================== STATE ====================

    const [loading, setLoading] = React.useState(false)
    const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    const [pageParam, setPageParam] = React.useState(1)
    const [perPageParam, setperPageParam] = React.useState(10)
    const [searchInputValue, setSearchInputValue] = React.useState<string>('')
    console.log(setSearchInputValue)
    // ================= CUSTOM HOOKS =================

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // ==================== REDUX ====================

    const vehicleBlacklist = useSelector(
        (state: DefaultRootStateProps) => state.vehicleBlacklist
    )

    const countPage = useSelector(
        (state: DefaultRootStateProps) => state.commons.countPage
    )

    // ==================== FUNCTIONS ====================

    const handleEdit = React.useCallback(
        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault()
            const id = e.currentTarget.dataset.id
            navigate(`/taglist-vehicles/editar/${id}`)
        },
        [navigate]
    )

    const handleCreate = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        navigate(`/taglist-vehicles/crear`)
    }

    // const handleView = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //     e.preventDefault()
    //     const id = e.currentTarget.dataset.id
    //     navigate(`/gestion-de-tarifas/editar/${id}-view`)
    // }

    // ==================== EFFECTS ====================

    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            if (searchInputValue !== '') {
                // const data = await dispatch(
                //     getCategoryRequest({
                //         filter: true,
                //         criteria: searchInputValue,
                //         per_page: perPageParam,
                //         page: pageParam,
                //     })
                // )
                setLoading(false)
                // return data
            } else {
                const data = await dispatch(
                    getVehicleBlacklistRequest({
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
        const rows = vehicleBlacklist.map(({ id, plate, year, model }) => ({
            id,
            plate,
            year,
            model,
            edit: (
                <div className="flex">
                    <button data-id={id} onClick={handleEdit}>
                        <IconButton color="primary">
                            <VisibilityIcon sx={{ fontSize: '1.3rem' }} />
                        </IconButton>
                    </button>
                </div>
            ),
        }))
        setRowsInitial(rows)
    }, [vehicleBlacklist, handleEdit])

    return (
        <div>
            <TableCustom
                columns={columns}
                data={rowsInitial}
                title="Lista negra de vehículos"
                addIconTooltip="Añadir a lista negra"
                handleCreate={handleCreate}
                loading={loading}
                pageParam={pageParam}
                setPageParam={setPageParam}
                perPageParam={perPageParam}
                setPerPageParam={setperPageParam}
                countPage={countPage}
                // setSearchInputValue={setSearchInputValue}
            />
        </div>
    )
}

export default ReadFares
