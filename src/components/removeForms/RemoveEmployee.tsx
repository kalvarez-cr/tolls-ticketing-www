import AlertDialog from 'components/AlertDialog'
import { useDispatch } from 'react-redux'
import { deleteEmployeesRequest } from 'store/employee/employeeActions'

const RemoveEmployee = ({ open, setOpen, selectedId }) => {
    const dispatch = useDispatch()

    const handleAccept = () => {
        dispatch(
            deleteEmployeesRequest({
                id: selectedId,
                is_deleted: true,
            })
        )
        setOpen(false)
    }

    return (
        <>
            <AlertDialog
                open={open}
                setOpen={setOpen}
                handleAccept={() => handleAccept()}
                title="Eliminar Empleado"
                acceptButtonText="Sí, Proceder"
            >
                <p>¿Estas seguro que quieres eliminar al empleado?</p>
            </AlertDialog>
        </>
    )
}

export default RemoveEmployee
