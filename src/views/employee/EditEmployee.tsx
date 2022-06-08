import EmployeeIndex from '../../components/EmployeeForm/EmployeeIndex'
import { useParams } from 'react-router'

const EditEmployee = () => {
    const { id } = useParams()
    return (
        <>
            <EmployeeIndex fleetId={id} readOnly />
        </>
    )
}

export default EditEmployee
