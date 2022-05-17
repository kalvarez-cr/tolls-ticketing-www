import React from 'react'
import ReadVehicleAssociate from './ReadVehicleAssociate'
import AssociateVehicleProfile from './AssociateVehicleProfile'

interface laneTableProps {
    fleetId?: string
    readOnly?: boolean
    onlyView?: boolean
    tollData?: any
    add?: boolean
    following?: boolean
    userData?: any
}

const VehiclesIndex = ({
    fleetId,
    userData,
    add,
    following,
}: laneTableProps) => {
    const [editVehicle, setEditVehicle] = React.useState(false)
    const [dataVehicle] = React.useState(
        userData.find((find) => find.id === fleetId)
    )
    const [neww, setNeww] = React.useState(false)
    // const [editNew, setEditNew] = React.useState(false)

    const handleEditVolver = () => {
        setEditVehicle(!editVehicle)
    }
    const handleEditVehicle = () => {
        setEditVehicle(!editVehicle)
    }

    const handleCreateNew = (boo) => {
        setNeww(boo)
    }
    const editNue = () => {}

    return (
        <>
            {!editVehicle && !neww ? (
                <ReadVehicleAssociate
                    fleetId={fleetId}
                    userData={dataVehicle}
                    handleEditVehicle={handleEditVehicle}
                    editNew={editNue}
                    handleCreateNew={handleCreateNew}
                />
            ) : (
                <AssociateVehicleProfile
                    fleetId={fleetId}
                    readOnly={editVehicle}
                    userData={dataVehicle}
                    handleEditVehicle={handleEditVolver}
                    handleCreateNew={handleCreateNew}
                    dataVehicle={dataVehicle}
                />
            )}
        </>
    )
}

export default VehiclesIndex
