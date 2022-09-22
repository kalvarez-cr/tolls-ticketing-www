import React from 'react'
import { Grid, TextField, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import AlertDialog from 'components/AlertDialog'
import { useDispatch } from 'react-redux'
import { getAuthorizationRequest } from 'store/authorization/authorizationAction'
import { useNavigate } from 'react-router'
import { getAccountHolderRequest } from 'store/accountHolder/AccountHolderActions'

interface Inputs {
    id?: string
    email?: string
    open: boolean
    setOpen: any
}

const useStyles = makeStyles((theme: Theme) => ({
    alertIcon: {
        height: '16px',
        width: '16px',
        marginRight: '5px',
        verticalAlign: 'text-bottom',
        marginTop: '15px',
        marginLeft: '-15px',
    },
    userAvatar: {
        height: '80px',
        width: '80px',
    },
    input: {
        opacity: 0,
        position: 'absolute',
        zIndex: 1,
        padding: 0.5,
        cursor: 'pointer',
        width: '30%',
    },
    searchControl: {
        width: '100%',
        '& input': {
            background: 'transparent !important',
        },
        '& .Mui-focused input': {
            boxShadow: 'none',
        },
        ' & .css-1xu5ovs-MuiInputBase-input-MuiOutlinedInput-input': {
            color: '#6473a8',
        },
        [theme.breakpoints.down('lg')]: {
            width: '250px',
        },
        [theme.breakpoints.down('md')]: {
            width: '100%',
            marginLeft: '4px',
        },
    },
}))

const Authorization = ({ open, setOpen, email, id }: Inputs) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [code, setCode] = React.useState<string>('')

    const handleCode = (e) => {
        const value = e.target.value
        setCode(value)
    }

    const handleAccept = async () => {
        const data = await dispatch(
            getAuthorizationRequest({
                email: email,
                code: code,
            })
        )
        // setOpen(false)
        // @ts-ignore
        if (data.result) {
            dispatch(
                getAccountHolderRequest({
                    id: id,
                })
            )
            navigate(
                //@ts-ignore
                `/gestion-de-cuentas-usuarios/editar/${id}`
            )
        } else {
        }
    }

    return (
        <>
            <AlertDialog
                open={open}
                setOpen={setOpen}
                handleAccept={() => handleAccept()}
                title="Introduzca el código recibido"
                acceptButtonText="Aceptar"
            >
                <Grid container spacing={2} sx={{ marginTop: '5px' }}>
                    <Grid item xs={12} className={classes.searchControl}>
                        <TextField
                            label="Código"
                            size="small"
                            value={code}
                            onChange={handleCode}
                            autoComplete="off"
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </AlertDialog>
        </>
    )
}

export default Authorization
