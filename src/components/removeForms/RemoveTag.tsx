import AlertDialog from 'components/AlertDialog'
import { useDispatch } from 'react-redux'
import { deleteTagRequest } from 'store/saleTag/saleTagActions'

const RemoveTag = ({ open, setOpen, selectedId }) => {
    const dispatch = useDispatch()

    const handleAccept = () => {
        dispatch(
            deleteTagRequest({
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
                title="Eliminar Tag"
                acceptButtonText="Aceptar"
            >
                <p>¿Estas seguro que quieres eliminar este tag ?</p>
            </AlertDialog>
        </>
    )
}

export default RemoveTag
