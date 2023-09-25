import AlertDialog from 'components/AlertDialog'

interface ShowImageProps {
    open: boolean
    setOpen: any
    children: any
    onlyAccept?: boolean
    title: string
}

const HistoryDetails = ({ open, setOpen, children, onlyAccept, title }: ShowImageProps) => {
    const handleAccept = () => {
        setOpen(false)
    }

    return (
        <>
            <AlertDialog
                open={open}
                setOpen={setOpen}
                handleAccept={() => handleAccept()}
                title={title}
                acceptButtonText="Aceptar"
                onlyAccept={onlyAccept}
            >
                {children}
            </AlertDialog>
        </>
    )
}

export default HistoryDetails
