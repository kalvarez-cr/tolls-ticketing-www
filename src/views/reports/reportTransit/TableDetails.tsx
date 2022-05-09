import TableStickyHead from 'components/TableDetails/TableStickyHead'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'

const ViewReports = () => {
    const transit = useSelector(
        (state: DefaultRootStateProps) => state.transitRes
    )
    return (
        <div>
            <TableStickyHead data={transit} />
        </div>
    )
}

export default ViewReports
