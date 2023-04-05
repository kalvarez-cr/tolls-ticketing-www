import TableTag from 'components/TableDetails/TableTag'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'

const ViewReports = () => {
    const detail  = useSelector(
        (state: DefaultRootStateProps) => state.transitDetail
    )
    return (
        <div>
            <TableTag data={detail} />
        </div>
    )
}

export default ViewReports
