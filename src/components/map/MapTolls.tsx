import React, { useCallback } from 'react'
import { Marker } from 'react-map-gl'
import PopupCustom from './Popup'
import { v4 as uuidv4 } from 'uuid'
import { TTollsSite } from 'types'
import { Fab, Tooltip } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
// import BusIcon from '@material-ui/icons/FilterList'
import TableChartIcon from '@material-ui/icons/TableChart'
// import FilterIcon from '@material-ui/icons/FilterList'
// import VisibilityIcon from '@material-ui/icons/Visibility'
// import FilterForm from './FilterForm'
// import Transitions from 'ui-component/extended/Transitions'
import Map from 'components/Map'
import { updateTollRequest } from 'store/tolls/tollsActions'
import { useDispatch } from 'react-redux'
import TollIcon from 'components/icons/TollIcon'
import SubCard from 'ui-component/cards/SubCard'
import CustomizedTreeView from './CustomizedTreeView'
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt'
// import { useSelector } from 'react-redux'
// import { useDispatch } from 'react-redux'
// import { createStops } from 'store/StopsAndZones/StopsAndZonesActions'

interface MapProps {
    // tollId?: string
    returnButtonAction?: React.MouseEventHandler<HTMLButtonElement>
    tollsData: Array<TTollsSite> | Array<any>
    editMarker: boolean
    readOnly: boolean
    createMode: boolean
    tollId?: string
    setTollId: any
    setReadOnly: any
    setCreateMode: any
    tollDataParam?: TTollsSite
    setEditLocationMode?: any
    editLocationMode: boolean
}

export default function MapTolls({
    tollId,
    returnButtonAction,
    tollsData,
    editMarker,
    readOnly,
    createMode,
    setTollId,
    setReadOnly,
    setCreateMode,
    tollDataParam,
    setEditLocationMode,
    editLocationMode,
}: MapProps) {
    const dispatch = useDispatch()
    const mapRef = React.useRef()

    const [markers, setMarkers] = React.useState<Array<TTollsSite>>(tollsData)
    const [createMarker, setCreateMarker] = React.useState<
        Array<TTollsSite> | Array<any>
    >([])
    const [findTollData, setFindTollData] = React.useState<any | undefined>(
        tollsData?.find((toll) => toll.id === tollId)
    )
    const [open, setOpen] = React.useState<boolean>(editMarker)
    const [location, setLocation] = React.useState<Array<string>>([])

    React.useEffect(() => {
        setMarkers(tollsData)
    }, [tollsData])

    const handleOpen = (e) => {
        e.preventDefault()
        const tollId = e.currentTarget.dataset.id
        setTollId(tollId)
        setFindTollData(tollsData?.find((marker) => marker.id === tollId))
        setOpen(!open)
    }

    const handleMarkers = (e) => {
        if (e.target.localName === 'button') {
            return
        }
        const [longitude, latitude] = e.lngLat
        if (!readOnly && !open && createMode) {
            setCreateMarker([
                {
                    id: uuidv4(),
                    location: { coordinates: [latitude, longitude] },
                },
            ])
            setLocation([latitude, longitude])
            setOpen(!open)
        }
    }
    const handleCreateMode = () => {
        if (editLocationMode) {
            setEditLocationMode(false)
            setReadOnly(false)
            setCreateMode(!createMode)
        } else {
            setReadOnly(!readOnly)
            setCreateMode(!createMode)
        }
    }
    const handleEditLocation = () => {
        if (createMode) {
            setCreateMode(false)
            setEditLocationMode(!editLocationMode)
            setReadOnly(false)
        } else {
            setReadOnly(!readOnly)
            setEditLocationMode(!editLocationMode)
        }
    }
    function getCursor({ isHovering, isDragging }) {
        return createMode
            ? isDragging || editLocationMode
                ? 'grabbing'
                : 'crosshair'
            : isDragging
            ? 'grabbing'
            : 'grab'
    }

    const onMarkerDragEnd = useCallback(
        (event) => {
            // const tollId2 = event.currentTarget.dataset.id
            const id = event.target.querySelector('button').dataset.id
            dispatch(
                updateTollRequest({
                    id,
                    location: [event.lngLat[1], event.lngLat[0]],
                })
            )
        },
        [dispatch]
    )
    return (
        <div className="flex">
            <div className="w-1/4 mr-6 h-full">
                <SubCard title="Peajes" className="">
                    <CustomizedTreeView tollDataParam={tollDataParam} />
                </SubCard>
            </div>

            <div className="relative w-3/4">
                <div className="flex">
                    {readOnly ? (
                        <h1 className="text-black font-bold absolute bottom-10 left-4 z-10">
                            Modo lectura
                        </h1>
                    ) : (
                        <h1 className="text-primary-300 font-bold absolute bottom-10 left-4 z-10">
                            Modo escritura
                        </h1>
                    )}
                </div>
                <Tooltip title="Ver tabla" placement="bottom">
                    <Fab
                        color="primary"
                        className="absolute top-4 right-4 z-10"
                        onClick={returnButtonAction}
                        disabled={!readOnly}
                    >
                        <TableChartIcon />
                    </Fab>
                </Tooltip>
                <Map
                    onClick={handleMarkers}
                    latitude={Number(tollDataParam?.location.coordinates[0])}
                    longitude={Number(tollDataParam?.location.coordinates[1])}
                    zoom={tollDataParam ? 15 : 8}
                    getCursor={getCursor}
                    mapRef={mapRef}
                >
                    <>
                        {markers.map((marker) => (
                            <Marker
                                {...marker}
                                latitude={Number(
                                    marker.location.coordinates[0]
                                )}
                                longitude={Number(
                                    marker.location.coordinates[1]
                                )}
                                key={marker.name}
                                draggable={editLocationMode}
                                onDragEnd={onMarkerDragEnd}
                                data-id={marker.id}
                            >
                                <button
                                    onClick={handleOpen}
                                    data-id={marker.id}
                                    id="marker"
                                    type="button"
                                    disabled={createMode}
                                    className={`${
                                        createMode || editLocationMode
                                            ? 'text-primary-300 pointer-events-none'
                                            : 'text-indigo-700'
                                    }`}
                                >
                                    <TollIcon />
                                </button>
                            </Marker>
                        ))}
                        {createMarker.map((marker) => (
                            <Marker
                                {...marker}
                                latitude={Number(
                                    marker.location.coordinates[0]
                                )}
                                longitude={Number(
                                    marker.location.coordinates[1]
                                )}
                                key={marker.name}
                            >
                                <button
                                    onClick={handleOpen}
                                    data-id={marker.id}
                                    type="button"
                                    className="text-blue-700"
                                >
                                    <TollIcon />
                                </button>
                            </Marker>
                        ))}

                        {open ? (
                            <PopupCustom
                                tollId={tollId}
                                tollData={
                                    createMode ? createMarker[0] : findTollData
                                }
                                open={open}
                                setOpen={setOpen}
                                readOnly={readOnly}
                                createMode={createMode}
                                setCreateMarker={setCreateMarker}
                                location={location}
                            />
                        ) : null}
                    </>
                </Map>
                <div className="absolute right-4 bottom-10">
                    <Tooltip title="Editar ubicación" placement="top">
                        <Fab
                            color={editLocationMode ? 'secondary' : 'primary'}
                            className="absolute bottom-20 z-10"
                            onClick={handleEditLocation}
                            disabled={open}
                        >
                            <EditLocationAltIcon />
                        </Fab>
                    </Tooltip>

                    <Tooltip title="Añadir Peaje" placement="top">
                        <Fab
                            color={createMode ? 'secondary' : 'primary'}
                            aria-label="add"
                            onClick={handleCreateMode}
                            disabled={open}
                        >
                            <AddIcon />
                        </Fab>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}
