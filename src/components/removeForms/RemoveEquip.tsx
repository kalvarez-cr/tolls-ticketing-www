import AlertDialog from 'components/AlertDialog'
import { useDispatch } from 'react-redux'
import { deleteEquipRequest } from 'store/toll/tollActions'

const RemoveEquip = ({ open, setOpen, selectedId }) => {
    const dispatch = useDispatch()

    const handleAccept = () => {
        dispatch(
            deleteEquipRequest({
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
                title="Eliminar Nodo"
                acceptButtonText="Aceptar"
            >
                <p>¿Estas seguro que quieres eliminar el nodo?</p>
            </AlertDialog>
        </>
    )
}

export default RemoveEquip
