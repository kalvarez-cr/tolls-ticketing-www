import AlertDialog from 'components/AlertDialog'

const ShowImage = ({ open, setOpen, children }) => {
    const handleAccept = () => {
        setOpen(false)
    }

    return (
        <>
            <AlertDialog
                open={open}
                setOpen={setOpen}
                handleAccept={() => handleAccept()}
                title="Imagen"
                acceptButtonText="Aceptar"
            >
                {children}
            </AlertDialog>
        </>
    )
}

export default ShowImage
