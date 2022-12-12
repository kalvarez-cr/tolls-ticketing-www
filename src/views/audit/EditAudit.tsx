import AuditIndex from '../../components/auditForm/AuditIndex'
import { useParams } from 'react-router'

const EditAudit = () => {
    const { id } = useParams()
    return (
        <>
            <AuditIndex auditId={id} readOnly />
        </>
    )
}

export default EditAudit
