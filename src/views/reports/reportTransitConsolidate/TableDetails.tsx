import TableStickyHeadNew from 'components/TableDetails/TableStickyHeadNew'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'

const ViewReports = () => {
    const transitDetail = useSelector(
        (state: DefaultRootStateProps) => state.transitDetail
    )
    return (
        <div>
            <TableStickyHeadNew data={transitDetail} />
        </div>
    )
}

export default ViewReports
