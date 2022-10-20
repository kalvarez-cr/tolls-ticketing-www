import LiquidationConceptIndex from 'components/LiquidationConceptForm/LiquidationConceptIndex'
import { useParams } from 'react-router-dom'

const EditFares = () => {
    const { id } = useParams()

    return (
        <div>
            <LiquidationConceptIndex fleetId={id} readOnly />
        </div>
    )
}

export default EditFares
