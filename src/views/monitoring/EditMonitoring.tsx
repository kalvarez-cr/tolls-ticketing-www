import SimpleTabs from 'components/MonitoringForm/SimpleTabs'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { DefaultRootStateProps } from 'types'

const EditMonitoring = () => {
    const { id } = useParams()
    const monitoringData = useSelector((state: DefaultRootStateProps) =>
        state.monitoring.find((monitor) => monitor.id === id)
    )

    return (
        <>
            <SimpleTabs userId={id} monitoringData={monitoringData} />
        </>
    )
}

export default EditMonitoring
