import CategorySiteIndex from 'components/categorySiteForm/CategorySiteIndex'
import { useParams } from 'react-router-dom'

const EditFares = () => {
    const { id } = useParams()

    return (
        <div>
            <CategorySiteIndex fleetId={id} readOnly />
        </div>
    )
}

export default EditFares
