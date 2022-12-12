import PaymentsIndex from 'components/PaymentsForm/PaymentsIndex'
import { useParams } from 'react-router-dom'

const EditFares = () => {
    const { id } = useParams()

    return (
        <div>
            <PaymentsIndex fleetId={id} readOnly />
        </div>
    )
}

export default EditFares
