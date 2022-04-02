import React from 'react'
import { useParams } from 'react-router-dom'
import SimpleTabs from 'components/tollsSite/SimpleTabs'
// import { DefaultRootStateProps } from 'types'
import { useDispatch, useSelector } from 'react-redux'
import { getTollsALLRequest } from 'store/toll/tollActions'
import { DefaultRootStateProps } from 'types'

const EditToll = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    let paramId
    let following = id?.split('&&') || ''
    console.log(following[1])
    const foll = following[1] === 'following' ? true : false
    if (foll) {
        paramId = following[0]
    } else {
        paramId = id
    }

    const tollData = useSelector((state: DefaultRootStateProps) => state.toll)

    React.useEffect(() => {
        dispatch(getTollsALLRequest(id))
    }, [])

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
