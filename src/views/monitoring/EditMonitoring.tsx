import SimpleTabs from 'components/MonitoringForm/SimpleTabs'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { DefaultRootStateProps } from 'types'

const EditMonitoring = () => {
    const { id } = useParams()
    const userData = useSelector((state: DefaultRootStateProps) =>
        state.accountHolder.find((user) => user.id === id)
    )

    return (
        <>
            <SimpleTabs userId={id} userData={userData} />
        </>
    )
}

export default EditMonitoring
