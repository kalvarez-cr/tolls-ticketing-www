import ServicesIndex from 'components/servicesForm/ServicesIndex'
import { useParams } from 'react-router-dom'

const EditFares = () => {
    const { id } = useParams()

    return (
        <div>
            <ServicesIndex fleetId={id} readOnly />
        </div>
    )
}

export default EditFares
