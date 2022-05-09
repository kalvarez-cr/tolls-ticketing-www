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
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        console.log('testestestest')
        const getData = async () => {
            setLoading(true)
            await dispatch(getTollsALLRequest(id))
            setLoading(false)
        }
        getData()
    }, [dispatch, id])

    return (
        <div>
            {!loading ? <SimpleTabs
                tollIdParam={id}
                tollData={tollData}
                add={false}
                readOnly
            />: null}
        </div>
    )
}

export default EditToll
