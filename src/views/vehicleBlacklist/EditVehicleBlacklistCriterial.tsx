import VehicleBlacklistIndex from '../../components/vehicleBlacklistForm/VehicleBlacklistIndex'
import { useParams } from 'react-router-dom'

const EditFares = () => {
    const { id } = useParams()

    return (
        <div>
            <VehicleBlacklistIndex fleetId={id} readOnly />
        </div>
    )
}

export default EditFares
