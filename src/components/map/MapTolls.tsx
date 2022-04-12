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
import VisibilityIcon from '@material-ui/icons/Visibility'
// import FilterForm from './FilterForm'
// import Transitions from 'ui-component/extended/Transitions'
import Map from 'components/Map'
import { updateTollRequest } from 'store/tolls/tollsActions'
import { useDispatch } from 'react-redux'
import TollIcon from 'components/icons/TollIcon'
// import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
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
}: MapProps) {
    // const [filterOptions, setFilterOptions] = React.useState<any>()
    const [markers, setMarkers] = React.useState<Array<TTollsSite>>(tollsData)

    // const [editMode, setEditMode] = React.useState<boolean>(false)
    const [createMarker, setCreateMarker] = React.useState<
        Array<TTollsSite> | Array<any>
    >([])
    const [findTollData, setFindTollData] = React.useState<any | undefined>(
        tollsData?.find((marker) => marker.id === tollId)
    )
    const [open, setOpen] = React.useState<boolean>(editMarker)
    const [location, setLocation] = React.useState<Array<string>>([])
    // const [openFilterForm, setOpenFilterForm] = React.useState<boolean>(false)

    const dispatch = useDispatch()

    // React.useEffect(() => {
    //     // const nameFilter = stopsAndZonesData?.filter((stop) =>
    //     //     stop?.stop?.name
    //     //         .toLowerCase()
    //     //         .includes(filterOptions?.name.toLowerCase())
    //     // )
    //     // const stopCodeFilter = nameFilter?.filter((stop) =>
    //     //     stop?.stop?.stop_code.includes(filterOptions?.stop_code)
    //     // )
    //     const routeFilter = stopsAndZonesData?.filter((stop) =>
    //         stop?.stop_code
    //             .toLowerCase()
    //             .includes(filterOptions?.route.toLowerCase())
    //     )
    //     const typeFilter = routeFilter?.filter((stop) =>
    //         stop?.location.type
    //             .toLowerCase()
    //             .includes(filterOptions?.type.toLowerCase())
    //     )
    //     const stateFilter = typeFilter?.filter((stop) =>
    //         stop?.location.state
    //             .toLowerCase()
    //             .includes(filterOptions?.state.toLowerCase())
    //     )
    //     const municipalityFilter = stateFilter?.filter((stop) =>
    //         stop?.location.municipality
    //             .toLowerCase()
    //             .includes(filterOptions?.municipality.toLowerCase())
    //     )
    //     setMarkers(municipalityFilter)
    // }, [filterOptions])

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
                    location: {coordinates :[latitude, longitude]},
                },
            ])
            setLocation([latitude, longitude])
            setOpen(!open)
        }
    }
    const handleCreateMode = () => {
        setReadOnly(!readOnly)
        setCreateMode(!createMode)
    }
    // const handleEditLocation = () => {
    //     // setReadOnly(!readOnly)
    //     setEditMode(!editMode)
    //     console.log('edit',editMode)
    // }
    function getCursor({ isHovering, isDragging }) {
        return createMode
            ? isDragging
                ? 'grabbing'
                : 'crosshair'
            : isDragging
            ? 'grabbing'
            : 'grab'
    }

    const onMarkerDragEnd = useCallback((event) => {
        // const tollId2 = event.currentTarget.dataset.id
        const id = event.target.querySelector('button').dataset.id
        dispatch(
            updateTollRequest({ id, location: [event.lngLat[1], event.lngLat[0]]})
        )
    }, [])

    return (
        <div className="relative">
            <div className="flex">
                {readOnly ? (
                    <h1 className="text-black font-bold absolute bottom-10 left-4 z-10">
                        Modo lectura
                    </h1>
                ) : (
                    <h1 className="text-green-700 font-bold absolute bottom-10 left-4 z-10">
                        Modo escritura
                    </h1>
                )}
                {/* <Tooltip title="Aplicar filtro" placement="bottom">
                    <Fab
                        color="primary"
                        className="absolute top-4 left-4  z-10"
                        onClick={() => setOpenFilterForm(!openFilterForm)}
                        // disabled={!readOnly}
                    >
                        <FilterIcon />
                    </Fab>
                </Tooltip> */}
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

            {
                //openFilterForm ? (
                // <div className="absolute top-20 left-4 z-10 w-full md:w-1/2 lg:w-1/3">
                //     <Transitions
                //         type="grow"
                //         in
                //         position="top-left"
                //         direction="up"
                //     >
                //         {/* <FilterForm setFilterOptions={setFilterOptions} /> */}
                //     </Transitions>
                // </div>
                //) : null
            }

            <Map
                onClick={handleMarkers}
                latitude={Number(findTollData?.location.coordinates[0])}
                longitude={Number(findTollData?.location.coordinates[1])}
                zoom={editMarker ? 18 : 8}
                getCursor={getCursor}
            >
                <>
                    {markers.map((marker) => (
                        <Marker
                            {...marker}
                            latitude={Number(marker.location.coordinates[0])}
                            longitude={Number(marker.location.coordinates[1])}
                            key={marker.name}
                            draggable={createMode}
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
                                    createMode
                                        ? 'text-gray-600 pointer-events-none'
                                        : 'text-blue-700'
                                }`}
                            >
                                <TollIcon />
                            </button>
                        </Marker>
                    ))}
                    {createMarker.map((marker) => (
                        <Marker
                            {...marker}
                            latitude={Number(marker.location.coordinates[0])}
                            longitude={Number(marker.location.coordinates[1])}
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
                {/* <Tooltip title="Editar ubicación" placement="top">
                    <Fab
                        color="primary"
                        className="absolute bottom-20 z-10"
                        onClick={handleEditLocation}
                        // disabled={!readOnly}
                    >
                        <EditLocationAltIcon />
                    </Fab>
                </Tooltip> */}
                {createMode ? (
                    <Tooltip title="Modo lectura" placement="top">
                        <Fab
                            color="primary"
                            aria-label="add"
                            onClick={handleCreateMode}
                            disabled={open}
                        >
                            <VisibilityIcon />
                        </Fab>
                    </Tooltip>
                ) : true ? (
                    <Tooltip
                        title="Añadir Parada y editar ubicación"
                        placement="top"
                    >
                        <Fab
                            color="primary"
                            aria-label="add"
                            onClick={handleCreateMode}
                            disabled={open}
                        >
                            <AddIcon />
                        </Fab>
                    </Tooltip>
                ) : null}
            </div>
        </div>
    )
}
