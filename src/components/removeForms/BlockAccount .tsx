import AlertDialog from 'components/AlertDialog'

const BlockAccount = ({ open, setOpen, handleAccept, text }) => {
    return (
        <>
            <AlertDialog
                open={open}
                setOpen={setOpen}
                handleAccept={() => handleAccept()}
                title="Bloquear cuenta"
                acceptButtonText="Aceptar"
            >
                <p>{text}</p>
            </AlertDialog>
        </>
    )
}

export default BlockAccount
