// import React from 'react';

// material-ui
import { useTheme } from '@material-ui/core/styles'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
} from '@material-ui/core'

// ===============================|| UI DIALOG - SWEET ALERT ||=============================== //

export default function AlertDialog({
    open,
    setOpen,
    title,
    handleAccept,
    acceptButtonText,
    children,
}) {
    const theme = useTheme()

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <Dialog
                maxWidth="xs"
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{ p: 3 }}
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Typography variant="body2" component="span">
                            {children}
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ pr: 2.5 }}>
                    <Button
                        sx={{
                            color: theme.palette.error.dark,
                            borderColor: theme.palette.error.dark,
                        }}
                        onClick={handleClose}
                        color="secondary"
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={handleAccept}
                        autoFocus
                    >
                        {acceptButtonText}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
