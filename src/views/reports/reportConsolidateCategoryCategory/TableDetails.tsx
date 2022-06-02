import TableStickyHead from 'components/TableDetails/TableStickyHead'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'

const ViewReports = () => {
    const consolidate = useSelector(
        (state: DefaultRootStateProps) => state.consolidate
    )
    return (
        <div>
            <TableStickyHead data={consolidate} />
        </div>
    )
}

export default ViewReports
