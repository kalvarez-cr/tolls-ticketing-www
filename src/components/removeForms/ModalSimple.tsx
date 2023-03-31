import AlertDialog from 'components/AlertDialog'

const ModalSimple = ({ open, setOpen, handleAccept, children, title }) => {
    return (
        <>
            <AlertDialog
                open={open}
                setOpen={setOpen}
                handleAccept={() => handleAccept()}
                acceptButtonText="Sí, Proceder"
                title={title}
            >
                <p>{children}</p>
            </AlertDialog>
        </>
    )
}

export default ModalSimple
