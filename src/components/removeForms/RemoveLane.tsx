import AlertDialog from 'components/AlertDialog'
import { useDispatch } from 'react-redux'
import { deleteLaneRequest,  getLaneStateRequest } from 'store/tolls/lane/laneTollAction'


const RemoveLane = ({ open, setOpen, selectedId, dataToll }) => {
    const dispatch = useDispatch()

    const handleAccept = () => {
        dispatch(
            deleteLaneRequest({
                id: selectedId,
                is_deleted: true,
            })
        )
        setOpen(false)
        dispatch(
            getLaneStateRequest({
                site_id: dataToll ,
                per_page: 1,
                page: 10,
            })
        )
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
