import React from 'react'
// import { WebMercatorViewport } from 'react-map-gl'
import ReactMapGL from 'react-map-gl'

interface MapProps {
    children?: JSX.Element
    onClick?: any
    latitude?: number
    longitude?: number
    zoom?: number
    getCursor?: any
    mapRef: any
}

const Map = ({
    children,
    onClick,
    latitude,
    longitude,
    zoom,
    getCursor,
    mapRef,
}: MapProps) => {
    const [viewport, setViewport] = React.useState({
        latitude: latitude || 10.49562,
        longitude: longitude || -66.84887,
        // center: [10.49562, -66.84887],
        width: '100%',
        height: '86vh',
        zoom,
        bearing: 0,
        pitch: 0,
        transitionDuration: 1,
    })
    React.useEffect(() => {
        setViewport({
            ...viewport,
            latitude: Number(latitude || 10.49562),
            longitude: Number(longitude || -66.84887),
            transitionDuration: 1,
        })
    }, [latitude, longitude])
    return (
        <ReactMapGL
            {...viewport}
            className="rounded-lg transition-all"
            maxZoom={20}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxApiAccessToken={`pk.eyJ1IjoiaXZhLWEiLCJhIjoiY2t1cjlxMnA3MDhqeTJwcWpia3lxaHh0ciJ9.mdvQ2zoU46a_QOFFwgbX6w`}
            onViewportChange={(newViewport) => {
                setViewport({ ...newViewport })
            }}
            ref={mapRef}
            onClick={onClick}
            getCursor={getCursor}
        >
            {children}
        </ReactMapGL>
    )
}

export default Map
