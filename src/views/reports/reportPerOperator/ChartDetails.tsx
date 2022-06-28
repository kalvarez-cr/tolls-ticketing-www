import OperatorChart from 'components/reportsPerOperator/OperatorChart'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'

const ViewReports = () => {
    const reportData = useSelector(
        (state: DefaultRootStateProps) => state.analytics
    )

    return (
        <div>
            <OperatorChart data={reportData} />
        </div>
    )
}

export default ViewReports
