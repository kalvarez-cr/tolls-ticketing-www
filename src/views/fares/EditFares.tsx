import FareIndex from 'components/fareForm/FareIndex'
import { useParams } from 'react-router-dom'

const EditFares = () => {
    const { id } = useParams()
    console.log(id)
    console.log('aqui desde editar ')

    return (
        <div>
            <FareIndex fleetId={id} readOnly />
        </div>
    )
}

export default EditFares
