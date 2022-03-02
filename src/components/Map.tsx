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
}

const Map = ({
    children,
    onClick,
    latitude,
    longitude,
    zoom,
    getCursor,
}: MapProps) => {
    const mapRef = React.useRef<string | any>()

    const [viewport, setViewport] = React.useState({
        latitude: latitude || 10.49562,
        longitude: longitude || -66.84887,
        // center: [10.49562, -66.84887],
        width: '100%',
        height: '86vh',
        zoom,
        bearing: 0,
        pitch: 40,
    })
    // const viewport2 = new WebMercatorViewport({
    //     latitude: viewport.latitude,
    //     longitude: viewport.longitude,
    //     width: viewport.width,
    //     height: viewport.height,
    //     zoom: viewport.zoom,
    //     bearing: 0,
    //     pitch: 40,
    // })
    // console.log(viewport2.getBoundingRegion())
    return (
        <ReactMapGL
            {...viewport}
            className="rounded-lg"
            maxZoom={20}
            mapStyle="mapbox://styles/mapbox/streets-v11"
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
