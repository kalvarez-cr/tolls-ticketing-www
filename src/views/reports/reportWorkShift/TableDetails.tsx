import TableStickyHead from 'components/TableDetails/TableStickyHead'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'

const ViewReports = () => {
    const work = useSelector((state: DefaultRootStateProps) => state.work)
    return (
        <div>
            <TableStickyHead data={work} />
        </div>
    )
}

export default ViewReports
