import TableStickyHeadDetail from 'components/TableDetails/TableStickyHeadDetail'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'

const ViewReports = () => {
    const transit = useSelector(
        (state: DefaultRootStateProps) => state.transitRes
    )
    return (
        <div>
            <TableStickyHeadDetail data={transit} />
        </div>
    )
}

export default ViewReports
