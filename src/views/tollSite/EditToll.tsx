import { useParams } from 'react-router-dom'
import SimpleTabs from 'components/tollsSite/SimpleTabs'
// import { DefaultRootStateProps } from 'types'
import {  useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'

const EditToll = () => {
    const { id } = useParams()
   

    const tolls = useSelector((state: DefaultRootStateProps) => state.tolls)
    const tollData = tolls.find((toll) => toll.id === id)


 

    return (
        <div>
           
                <SimpleTabs 
                    tollIdParam={id}
                    tollData={tollData}
                    add={false}
                    readOnly
                />
          
        </div>
    )
}

export default EditToll
