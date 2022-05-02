import SimpleTabs from 'components/tollsSite/SimpleTabs'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'


const CreateToll = () => {
    const tollData = useSelector(
        (state: DefaultRootStateProps) => state.toll
    )
    return (
        <div>
            <SimpleTabs add={true} tollData={tollData} />
        </div>
    )
}

export default CreateToll
