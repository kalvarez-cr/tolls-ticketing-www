import { useParams } from 'react-router-dom'
import SimpleTabs from 'components/tollsSite/SimpleTabs'
import { DefaultRootStateProps } from 'types'
import { useSelector } from 'react-redux'

const EditToll = () => {
    const { id } = useParams()
    let paramId
    let following = id?.split('&&') || ''
    console.log(following[1])
    const foll = following[1] === 'following' ? true : false
    if (foll) {
        paramId = following[0]
    } else {
        paramId = id
    }
    console.log(foll)
    const tollData = useSelector((state: DefaultRootStateProps) =>
        state.tolls.find((toll) => toll.id === paramId)
    )

    return (
        <div>
            <SimpleTabs
                tollIdParam={paramId}
                tollData={tollData}
                add={false}
                following={foll}
                readOnly
            />
        </div>
    )
}

export default EditToll
