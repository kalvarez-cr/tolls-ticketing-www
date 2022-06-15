import AlertDialog from 'components/AlertDialog'
import { useDispatch } from 'react-redux'
import { deleteAccountRequest } from 'store/accountHolder/AccountHolderActions'

const RemoveEmployee = ({ open, setOpen, selectedId }) => {
    const dispatch = useDispatch()

    const handleAccept = () => {
        dispatch(
            deleteAccountRequest({
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
                title="Eliminar Usuario"
                acceptButtonText="Aceptar"
            >
                <p>¿Estas seguro que quieres eliminar este usuario?</p>
            </AlertDialog>
        </>
    )
}

export default RemoveEmployee
