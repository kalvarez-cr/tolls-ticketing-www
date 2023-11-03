import TableStickyHeadDetailLane from 'components/TableDetails/TableStickyHeadDetailLane'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'

const ViewReports = () => {
    const detail = useSelector((state: DefaultRootStateProps) => state.details)

    return (
        <div>
            <TableStickyHeadDetailLane data={detail} />
        </div>
    )
}

export default ViewReports
