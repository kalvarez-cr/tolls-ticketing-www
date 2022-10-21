import LiquidationIndex from 'components/LiquidationForm/LiquidationIndex'
import { useParams } from 'react-router-dom'

const EditFares = () => {
    const { id } = useParams()

    return (
        <div>
            <LiquidationIndex fleetId={id} readOnly />
        </div>
    )
}

export default EditFares
