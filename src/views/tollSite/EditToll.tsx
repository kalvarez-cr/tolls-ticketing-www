import { useParams } from 'react-router-dom'
import SimpleTabs from 'components/cardsForm/SimpleTabs'
import { DefaultRootStateProps } from 'types'
import { useSelector } from 'react-redux'

const EditToll = () => {
    const { id } = useParams()

    const tollData = useSelector((state: DefaultRootStateProps) =>
        state.tolls.find((toll) => toll._id === id)
    )

    return (
        <div>
            <SimpleTabs tollIdParam={id} tollData={tollData} readOnly />
        </div>
    )
}

export default EditToll
