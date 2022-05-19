import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
// import Chip from 'ui-component/extended/Chip'
import TableCustom from '../../components/Table'
// import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone'
import EditIcon from '@material-ui/icons/Edit'
import { useParams } from 'react-router-dom'
// import VisibilityIcon from '@material-ui/icons/Visibility'
// import SelectColumnFilter from "components/Table/Filters/SelectColumnFilter";
import { IconButton } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { DefaultRootStateProps, TTollsSite } from 'types/index'
import { getTollsRequest } from 'store/tolls/tollsActions'
import MapTolls from 'components/map/MapTolls'
import MapIcon from '@material-ui/icons/Map'
// import { mockToll } from '_mockApis/toll/mockToll'

const columns = [
    {
        Header: 'Nombress ',
        accessor: 'name',
    },
    {
        Header: 'Estado',
        accessor: 'state',
    },
    {
        Header: 'Autopista',
        accessor: 'road',
    },
    // {
    //     Header: 'Locacion',
    //     accessor: 'location',
    // },
    // {
    //     Header: 'Acciones admitidas',
    //     accessor: 'allowed_actions',
    // },
    // {
    //     Header: 'Soportes Admitidos',
    //     accessor: 'allowed_media',
    // },
    // {
    //     Header: 'Admite titulos asociados',
    //     accessor: 'is_ticket_allowed',
    // },
    // {
    //     Header: 'Admite recarga via web',
    //     accessor: 'web_rechargable',
    // },
    // {
    //     Header: 'Activo',
    //     accessor: 'active',
    //     disableFilters: true,
    // },
    {
        Header: 'Acciones',
        accessor: 'edit',
        disableFilters: true,
    },
]

const ReadTolls = () => {
    // States
    const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    // Customs Hooks
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const tolls = useSelector((state: DefaultRootStateProps) => state.tolls)
    const { id } = useParams()
    const statesConfig = useSelector(
        (state: DefaultRootStateProps) => state.login?.user?.states
    )

    // const [loading, setLoading] = React.useState(false)
    const [mapView, setMapView] = React.useState<boolean>(true)
    const [editMarker, setEditMarker] = React.useState<boolean>(false)
    const [readOnly, setReadOnly] = React.useState<boolean>(true)
    const [tollId, setTollId] = React.useState<string | undefined>('')
    const [tollDataParam] = React.useState<TTollsSite | undefined>(
        tolls?.find((toll) => toll.id === id)
    )
    const [createMode, setCreateMode] = React.useState<boolean>(false)
    const [editLocationMode, setEditLocationMode] =
        React.useState<boolean>(false)
    // const permissions = useSelector(
    //     (state: DefaultRootStateProps) => state.login?.user?.content?.permissions
    // )
    // FUNCTIONS

    const handleEdit = useCallback(
        (e) => {
            e.preventDefault()
            const id = e.currentTarget.dataset.id
            navigate(`/peajes/editar/${id}`)
        },
        [navigate]
    )
    // const handleView = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //     e.preventDefault()
    //     const id = e.currentTarget.dataset.id
    //     navigate(`/categoria-de-tarjetas/editar/${id}-view`)
    // }

    const handleCreate = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        setMapView(true)
        setCreateMode(true)
        setReadOnly(false)
    }

    React.useEffect(() => {
        dispatch(getTollsRequest())
    }, [dispatch])

    React.useEffect(() => {
        if (id !== '1') {
            setMapView(true)
        }
    }, [id])

    //EFFECTS
    React.useEffect(() => {
        tolls.map((toll) => {
            const data = statesConfig.find((state) => state.id === toll.state)
            toll.state = data?.name
        })

        const rows = tolls.map(({ id, name, state, road }) => ({
            id,
            name,
            state,
            road,
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
    }, [tolls, handleEdit])

    const handleChangeView = () => {
        setEditMarker(false)
        setMapView(!mapView)
        setCreateMode(!setCreateMode)
    }

    return (
        <div>
            {mapView ? (
                <MapTolls
                    tollsData={tolls}
                    returnButtonAction={handleChangeView}
                    editMarker={editMarker}
                    readOnly={readOnly}
                    createMode={createMode}
                    tollId={tollId}
                    setTollId={setTollId}
                    setReadOnly={setReadOnly}
                    setCreateMode={setCreateMode}
                    tollDataParam={tollDataParam}
                    setEditLocationMode={setEditLocationMode}
                    editLocationMode={editLocationMode}
                />
            ) : (
                <TableCustom
                    columns={columns}
                    data={rowsInitial}
                    title="Gestión de Peajes"
                    extraOptionIcon={<MapIcon />}
                    addIconTooltip="Crear Peaje"
                    extraOptionAction={handleChangeView}
                    handleCreate={handleCreate}
                />
            )}
        </div>
    )
}

export default ReadTolls
