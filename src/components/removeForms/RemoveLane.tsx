import AlertDialog from 'components/AlertDialog'
import { useDispatch } from 'react-redux'
import { deleteLaneRequest } from 'store/toll/tollActions'

const RemoveLane = ({ open, setOpen, selectedId }) => {
    const dispatch = useDispatch()

    const handleAccept = () => {
        dispatch(
            deleteLaneRequest({
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
                title="Eliminar canal"
                acceptButtonText="Sí,Proceder"
            >
                <p>¿Estas seguro que quieres eliminar este canal ?</p>
            </AlertDialog>
        </>
    )
}

export default RemoveLane
