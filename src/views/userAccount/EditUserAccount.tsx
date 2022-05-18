import SimpleTabs from 'components/userAccountForm/SimpleTabs'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { DefaultRootStateProps } from 'types'

const EditUserAccount = () => {
    const { id } = useParams()
    const userData = useSelector((state: DefaultRootStateProps) =>
        state.accountHolder.find((user) => user.id === id)
    )

    return (
        <>
            <SimpleTabs readOnly add={false} userId={id} userData={userData} />
        </>
    )
}

export default EditUserAccount
