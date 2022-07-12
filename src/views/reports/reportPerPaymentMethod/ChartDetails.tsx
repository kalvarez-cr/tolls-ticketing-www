import PaymentMethodChart from 'components/reportsPerPaymentMethod/PaymentMethodChart'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'

const ViewReports = () => {
    const reportData = useSelector(
        (state: DefaultRootStateProps) => state.analytics
    )

    return (
        <div>
            <PaymentMethodChart data={reportData} />
        </div>
    )
}

export default ViewReports
