import AlertDialog from 'components/AlertDialog'

const BlockAccount = ({ open, setOpen, handleAccept, text, title }) => {
    return (
        <>
            <AlertDialog
                open={open}
                setOpen={setOpen}
                handleAccept={() => handleAccept()}
                title={title}
                acceptButtonText="Sí, Proceder"
            >
                <p>{text}</p>
            </AlertDialog>
        </>
    )
}

export default BlockAccount
