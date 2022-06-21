import TimeAnalysisChart from 'components/reportsForTime/TimeAnalysisChart'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'

const ViewReports = () => {
    const reportData = useSelector(
        (state: DefaultRootStateProps) => state.consolidate
    )

    return (
        <div>
            <TimeAnalysisChart data={reportData} />
        </div>
    )
}

export default ViewReports
