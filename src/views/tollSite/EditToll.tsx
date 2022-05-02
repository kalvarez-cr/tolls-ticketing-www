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

    const tollData = useSelector((state: DefaultRootStateProps) => state.toll)

    React.useEffect(() => {
        dispatch(getTollsALLRequest(id))
    }, [dispatch, id])

    return (
        <div>
            <SimpleTabs
                tollIdParam={id}
                tollData={tollData}
                add={false}
                readOnly
            />
        </div>
    )
}

export default EditToll
