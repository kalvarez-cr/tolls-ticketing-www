import TagListIndex from 'components/tagListForm/TagListIndex'
import { useParams } from 'react-router-dom'

const EditFares = () => {
    const { id } = useParams()

    return (
        <div>
            <TagListIndex fleetId={id} readOnly />
        </div>
    )
}

export default EditFares
