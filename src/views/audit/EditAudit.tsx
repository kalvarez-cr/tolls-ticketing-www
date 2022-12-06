import CompanyIndex from '../../components/CompanyForm/CompanyIndex'
import { useParams } from 'react-router'

const EditAudit = () => {
    const { id } = useParams()
    return (
        <>
            <CompanyIndex fleetId={id} readOnly />
        </>
    )
}

export default EditAudit
