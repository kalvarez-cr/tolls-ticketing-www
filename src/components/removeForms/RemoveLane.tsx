import AlertDialog from 'components/AlertDialog'
import { useDispatch } from 'react-redux'
import { updateLaneRequest } from 'store/lane/laneActions'

const RemoveLane = ({ open, setOpen, selectedId }) => {
    const dispatch = useDispatch()

    const handleAccept = () => {
        dispatch(
            updateLaneRequest({
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
                acceptButtonText="Aceptar"
            >
                <p>¿Estas seguro que quieres eliminar este canal ?</p>
            </AlertDialog>
        </>
    )
}

export default RemoveLane
