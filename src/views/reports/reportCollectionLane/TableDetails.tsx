import TableStickyHeadDetail from 'components/TableDetails/TableStickyHeadDetail'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'

const ViewReports = () => {
    const detail = useSelector((state: DefaultRootStateProps) => state.details)

    return (
        <div>
            <TableStickyHeadDetail data={detail} />
        </div>
    )
}

export default ViewReports
