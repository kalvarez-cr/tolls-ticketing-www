import AlertDialog from 'components/AlertDialog'
import { useDispatch } from 'react-redux'
import { deleteCarRequest } from 'store/accountHolder/AccountHolderActions'

const RemoveEmployee = ({ open, setOpen, selectedId, userId }) => {
    const dispatch = useDispatch()

    const handleAccept = () => {
        dispatch(
            deleteCarRequest(
                {
                    id: selectedId,
                    is_deleted: true,
                },
                userId
            )
        )
        setOpen(false)
    }

    return (
        <>
            <AlertDialog
                open={open}
                setOpen={setOpen}
                handleAccept={() => handleAccept()}
                title="Eliminar Vehiculo"
                acceptButtonText="Sí,Proceder"
            >
                <p>¿Estas seguro que quieres eliminar este vehiculo?</p>
            </AlertDialog>
        </>
    )
}

export default RemoveEmployee
