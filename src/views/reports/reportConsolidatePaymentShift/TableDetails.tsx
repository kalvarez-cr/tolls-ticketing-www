import TableStickyHead from 'components/TableDetails/TableStickyHead'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'

const ViewReports = () => {
    const generate = useSelector(
        (state: DefaultRootStateProps) => state.generateReport
    )
    return (
        <div>
            <TableStickyHead data={generate} />
        </div>
    )
}

export default ViewReports
