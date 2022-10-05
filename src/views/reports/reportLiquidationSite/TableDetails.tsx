import TableStickyHead4 from 'components/TableDetails/TableStickyHead4'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'

const ViewReports = () => {
    const site = useSelector((state: DefaultRootStateProps) => state.site)
    return (
        <div>
            <TableStickyHead4 data={site} />
        </div>
    )
}

export default ViewReports
