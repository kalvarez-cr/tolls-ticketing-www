import AlertDialog from 'components/AlertDialog'
import { useDispatch } from 'react-redux'
import { deleteEquipRequest, getEquipRequest } from 'store/tolls/equip/equipTollAction'


const RemoveEquip = ({ open, setOpen, selectedId, dataToll }) => {
    const dispatch = useDispatch()

    const handleAccept = () => {
        dispatch(
            deleteEquipRequest({
                id: selectedId,
                is_deleted: true,
            })
        )
        setOpen(false)
        getEquipRequest({
            parent_site: dataToll ,
            per_page: 1,
            page: 10,
        })
    }

    return (
        <>
            <AlertDialog
                open={open}
                setOpen={setOpen}
                handleAccept={() => handleAccept()}
                title="Eliminar Nodo"
                acceptButtonText="Sí, Proceder"
            >
                <p>¿Estas seguro que quieres eliminar el nodo?</p>
            </AlertDialog>
        </>
    )
}

export default RemoveEquip
