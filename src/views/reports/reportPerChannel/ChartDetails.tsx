import ChannelChart from 'components/reportsPerChannel/ChannelChart'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'

const ViewReports = () => {
    const reportData = useSelector(
        (state: DefaultRootStateProps) => state.analytics
    )

    return (
        <div>
            <ChannelChart data={reportData} />
        </div>
    )
}

export default ViewReports
