import FareIndex from 'components/categoryForm/CategoryIndex'
import { useParams } from 'react-router'

const EditFares = () => {
    const { id } = useParams()
    return (
        <>
            <FareIndex fleetId={id} readOnly />
        </>
    )
}

export default EditFares
