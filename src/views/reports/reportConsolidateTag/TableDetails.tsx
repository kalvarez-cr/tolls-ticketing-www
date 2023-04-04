import TableTag from 'components/TableDetails/TableTag'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'

const ViewReports = () => {
    const tagConsolidate = useSelector(
        (state: DefaultRootStateProps) => state.transitDetail
    )
    return (
        <div>
            <TableTag data={tagConsolidate} />
        </div>
    )
}

export default ViewReports
