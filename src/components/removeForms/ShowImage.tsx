import AlertDialog from 'components/AlertDialog'

interface ShowImageProps {
    open: boolean
    setOpen: any
    children: any
    onlyAccept?: boolean
}

const ShowImage = ({ open, setOpen, children, onlyAccept }: ShowImageProps) => {
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
                onlyAccept={onlyAccept}
            >
                {children}
            </AlertDialog>
        </>
    )
}

export default ShowImage
