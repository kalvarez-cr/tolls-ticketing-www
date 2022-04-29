import AccountUserIndex from 'components/accounUserForm /AccountUserIndex'
import { useParams } from 'react-router'

const EditUserAccount = () => {
    const { id } = useParams()
    return (
        <>
            <AccountUserIndex fleetId={id} readOnly />
        </>
    )
}

export default EditUserAccount
