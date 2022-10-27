import BlacklistCriterialIndex from 'components/blacklistCriterialForm/BlacklistCriterialIndex'
import { useParams } from 'react-router-dom'

const EditFares = () => {
    const { id } = useParams()

    return (
        <div>
            <BlacklistCriterialIndex fleetId={id} readOnly />
        </div>
    )
}

export default EditFares
