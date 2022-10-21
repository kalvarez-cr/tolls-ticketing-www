import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
// import Chip from 'ui-component/extended/Chip'
import TableCustom from '../../components/Table'
// import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone'
// import EditIcon from '@material-ui/icons/Edit'
import VisibilityIcon from '@material-ui/icons/Visibility'
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
        Header: 'Nombre ',
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
    {
        Header: 'Inicio',
        accessor: 'start_point',
    },
    {
        Header: 'Final',
        accessor: 'end_point',
    },
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
    // ==================== REDUX ====================

    const tolls = useSelector((state: DefaultRootStateProps) => state.tolls)
    const statesConfig = useSelector(
        (state: DefaultRootStateProps) => state.login?.user?.states
    )
    // const countPage = useSelector(
    //     (state: DefaultRootStateProps) => state.commons.countPage
    // )

    // ==================== CUSTOM HOOKS ====================

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()

    // ==================== STATE ====================

    const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    const [loading, setLoading] = React.useState(false)
    const [mapView, setMapView] = React.useState<boolean>(true)
    const [editMarker, setEditMarker] = React.useState<boolean>(false)
    const [readOnly, setReadOnly] = React.useState<boolean>(true)
    const [tollId, setTollId] = React.useState<string | undefined>('')
    const [tollDataParam, setTollDataParam] = React.useState<
        TTollsSite | undefined
    >(tolls?.find((toll) => toll.id === id))
    const [createMode, setCreateMode] = React.useState<boolean>(false)
    const [editLocationMode, setEditLocationMode] =
        React.useState<boolean>(false)
    const [pageParam, setPageParam] = React.useState(1)
    const [perPageParam, setperPageParam] = React.useState(10)
    const countPage = useSelector(
        (state: DefaultRootStateProps) => state.commons.countPage
    )
    const [searchInputValue, setSearchInputValue] = React.useState<string>('')

    // ==================== FUNCTIONS ====================

    const handleEdit = useCallback(
        (e) => {
            e.preventDefault()
            const id = e.currentTarget.dataset.id
            navigate(`/peajes/editar/${id}`)
        },
        [navigate]
    )

    const handleCreate = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        setMapView(true)
        setCreateMode(true)
        setReadOnly(false)
    }

    const handleChangeView = () => {
        setEditMarker(false)
        setMapView(!mapView)
        setCreateMode(!setCreateMode)
    }

    // const handleView = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //     e.preventDefault()
    //     const id = e.currentTarget.dataset.id
    //     navigate(`/categoria-de-tarjetas/editar/${id}-view`)
    // }

    // ==================== EFFECTS ====================

    React.useEffect(() => {
        setTollDataParam(tolls?.find((toll) => toll.id === id))
    }, [id, tolls])

    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            if (searchInputValue !== '') {
                const data = await dispatch(
                    getTollsRequest({
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
                    getTollsRequest({
                        filter: true,
                        criteria: 'ALL',
                    })
                )
                setLoading(false)
                return data
            }
        }
        fetchData()
    }, [dispatch, perPageParam, pageParam, searchInputValue])

    React.useEffect(() => {
        if (id !== '1') {
            setMapView(true)
        }
    }, [id])

    React.useEffect(() => {
        const rows = tolls.map(
            ({ id, name, state, road, start_point, end_point }) => {
                const findSate = statesConfig.find((item) => item.id === state)
                return {
                    id,
                    name,
                    state: findSate?.name,
                    road,
                    start_point,
                    end_point,
                    edit: (
                        <div className="flex">
                            <button data-id={id} onClick={handleEdit}>
                                <IconButton color="primary">
                                    <VisibilityIcon
                                        sx={{ fontSize: '1.3rem' }}
                                    />
                                </IconButton>
                            </button>
                        </div>
                    ),
                }
            }
        )
        setRowsInitial(rows)
    }, [tolls, handleEdit, statesConfig])

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
                    loading={loading}
                    pageParam={pageParam}
                    setPageParam={setPageParam}
                    perPageParam={perPageParam}
                    setPerPageParam={setperPageParam}
                    countPage={countPage}
                    setSearchInputValue={setSearchInputValue}
                />
            )}
        </div>
    )
}

export default ReadTolls
