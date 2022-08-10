import TableStickyHead from 'components/TableDetails/TableStickyHead'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'

const ViewReports = () => {
    const detail = useSelector((state: DefaultRootStateProps) => state.details)

    return (
        <div>
            <TableStickyHead data={detail} />
        </div>
    )
}

export default ViewReports
