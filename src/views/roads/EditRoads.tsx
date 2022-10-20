import RoadsIndex from 'components/roadsForm/RoadsIndex'
import { useParams } from 'react-router-dom'

const EditFares = () => {
    const { id } = useParams()

    return (
        <div>
            <RoadsIndex fleetId={id} readOnly />
        </div>
    )
}

export default EditFares
