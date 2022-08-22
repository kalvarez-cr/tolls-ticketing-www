import TableStickyHead2 from 'components/TableDetails/TableStickyHead2'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'

const ViewReports = () => {
    const consolidate = useSelector(
        (state: DefaultRootStateProps) => state.tollReport
    )
    return (
        <div>
            <TableStickyHead2 data={consolidate} />
        </div>
    )
}

export default ViewReports
