import AlertDialog from 'components/AlertDialog'
import { useDispatch } from 'react-redux'
import { removeLoginRequest } from 'store/login/loginActions'

interface logoutProps {
    open: boolean
    setOpen: any
    children?: any
    onlyAccept?: boolean
}

const LogoutForm = ({ open, setOpen }: logoutProps) => {
    const dispatch = useDispatch()
    const handleAccept = () => {
        dispatch(removeLoginRequest())
        setOpen(false)
        window.location.reload()
    }

    return (
        <>
            <AlertDialog
                open={open}
                setOpen={setOpen}
                handleAccept={() => handleAccept()}
                title="Importante"
                acceptButtonText="Aceptar"
            >
                <p>¿Desea usted cerrar sesión?</p>
            </AlertDialog>
        </>
    )
}

export default LogoutForm
