import AlertDialog from "components/AlertDialog";

const ActiveStatus = ({ open, setOpen, text, handleAccept }) => {
  return (
    <>
      <AlertDialog
        open={open}
        setOpen={setOpen}
        handleAccept={() => handleAccept()}
        title="Cambiar estatus"
        acceptButtonText="Sí, proceder"
      >
        {text}
      </AlertDialog>
    </>
  );
};

export default ActiveStatus;
