import CompanyIndex from '../../components/CompanyForm/CompanyIndex'
import { useParams } from 'react-router'

const EditEmployee = () => {
    const { id } = useParams()
    return (
        <>
            <CompanyIndex fleetId={id} readOnly />
        </>
    )
}

export default EditEmployee
