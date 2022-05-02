import AssociateVehicleIndex from 'components/associateVehicleForm/AssociateVehicleIndex'
import { useParams } from 'react-router'

const EditUserAccount = () => {
    const { id } = useParams()
    return (
        <>
            <AssociateVehicleIndex fleetId={id} readOnly />
        </>
    )
}

export default EditUserAccount
