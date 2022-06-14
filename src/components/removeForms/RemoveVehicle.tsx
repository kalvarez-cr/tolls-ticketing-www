import AlertDialog from 'components/AlertDialog'
import { useDispatch } from 'react-redux'
import { deleteVehicleRequest } from 'store/gestionCuentas/AccountActions'

const RemoveEmployee = ({ open, setOpen, selectedId }) => {
    const dispatch = useDispatch()

    const handleAccept = () => {
        dispatch(
            deleteVehicleRequest({
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
                title="Eliminar Vehiculo"
                acceptButtonText="Aceptar"
            >
                <p>¿Estas seguro que quieres eliminar este vehiculo?</p>
            </AlertDialog>
        </>
    )
}

export default RemoveEmployee
