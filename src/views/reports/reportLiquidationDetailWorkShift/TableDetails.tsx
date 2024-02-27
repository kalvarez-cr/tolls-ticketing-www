import TableStickyHead3 from 'components/TableDetails/TableStickyHead3'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'

const ViewReports = () => {
    const period = useSelector(
        (state: DefaultRootStateProps) => state.liquidationWork
    )
    return (
        <div>
            <TableStickyHead3 data={period} />
        </div>
    )
}

export default ViewReports
