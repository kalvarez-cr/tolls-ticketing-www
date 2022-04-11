import CategoryIndex from 'components/categoryForm/CategoryIndex'
import { useParams } from 'react-router-dom'

const EditFares = () => {
    const { id } = useParams()
    console.log(id)
    console.log('aqui desde editar ')

    return (
        <div>
            <CategoryIndex fleetId={id} readOnly />
        </div>
    )
}

export default EditFares
