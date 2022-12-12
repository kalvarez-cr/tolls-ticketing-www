import React from 'react'
import TollForm from './TollForm'
// import { useSelector } from 'react-redux'
import { Popup } from 'react-map-gl'
import { TTollsSite } from 'types'
// import { DefaultRootStateProps, StopsAndZonesProps } from 'types'

interface PopupProp {
    tollId?: string
    readOnly?: boolean
    createMode: boolean
    tollData: TTollsSite
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    setCreateMarker: React.Dispatch<React.SetStateAction<Array<any>>>
    location: Array<string>
}

const PopupCustom = ({
    tollData,
    open,
    setOpen,
    tollId,
    readOnly,
    createMode,
    setCreateMarker,
    location,
}: PopupProp) => {
    return (
        <Popup
            latitude={parseFloat(tollData.location.coordinates[0])}
            longitude={parseFloat(tollData.location.coordinates[1])}
            closeButton={true}
            closeOnClick={false}
            onClose={() => {
                setOpen(!open)
                setCreateMarker([])
            }}
            offsetTop={-30}
        >
            <TollForm
                tollData={tollData}
                readOnly={readOnly}
                location={location}
                setCreateMarker={setCreateMarker}
                // setCreateMarker={setCreateMarker}
                createMode={createMode}
                setOpen={setOpen}
            />
        </Popup>
    )
}

export default PopupCustom
