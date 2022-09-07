import TableStickyHead from 'components/TableDetails/TableStickyHead'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'

const ViewReports = () => {
    const period = useSelector(
        (state: DefaultRootStateProps) => state.liquidationWork
    )
    return (
        <div>
            <TableStickyHead data={period} />
        </div>
    )
}

export default ViewReports
