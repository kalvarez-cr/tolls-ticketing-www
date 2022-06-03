import AlertDialog from 'components/AlertDialog'
import { useDispatch } from 'react-redux'
import { updateFareRequest } from 'store/fare/FareActions'

const RemoveFare = ({ open, setOpen, selectedId }) => {
    const dispatch = useDispatch()

    const handleAccept = () => {
        dispatch(
            updateFareRequest({
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
                title="Eliminar Tarifa"
                acceptButtonText="Aceptar"
            >
                <p>¿Estas seguro que quieres eliminar esta tarifa?</p>
            </AlertDialog>
        </>
    )
}

export default RemoveFare
