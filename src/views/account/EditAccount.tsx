import AccountIndex from 'components/accountForm/AccountIndex'
import { useParams } from 'react-router'

const EditAccount = () => {
    const { id } = useParams()
    return (
        <>
            <AccountIndex fleetId={id} readOnly />
        </>
    )
}

export default EditAccount
