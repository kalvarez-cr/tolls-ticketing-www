import TagIndex from 'components/TagForm/TagIndex'
import { useParams } from 'react-router'

const EditTag = () => {
    const { id } = useParams()

    return (
        <>
            <TagIndex fleetId={id} readOnly />
        </>
    )
}

export default EditTag
