import SimpleTabs from 'components/userAccountForm/SimpleTabs'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'

const CreateUserAccount = () => {
    const userData = useSelector(
        (state: DefaultRootStateProps) => state.accountHolder
    )

    return (
        <>
            <SimpleTabs add={true} userData={userData} createMode />
        </>
    )
}

export default CreateUserAccount
