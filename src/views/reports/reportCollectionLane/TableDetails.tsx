import TableStickyHead from 'components/TableDetails/TableStickyHead'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'

const ViewReports = () => {
    const taking = useSelector((state: DefaultRootStateProps) => state.taking)

    return (
        <div>
            <TableStickyHead data={taking} />
        </div>
    )
}

export default ViewReports
