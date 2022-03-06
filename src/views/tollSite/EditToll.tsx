import TollsProfile from '../../components/cardsForm'
import { useParams } from 'react-router-dom'

const EditToll = () => {
    const { id } = useParams()
    console.log(id)
    console.log('aqui desde editar ')

    return (
        <div>
            <TollsProfile cardsIdParam={id} readOnly />
        </div>
    )
}

export default EditToll
