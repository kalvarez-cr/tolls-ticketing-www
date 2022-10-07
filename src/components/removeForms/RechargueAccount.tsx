import React from 'react'
import { Grid, MenuItem, TextField, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import AlertDialog from 'components/AlertDialog'
import { useDispatch } from 'react-redux'
import { RechargeAccountRequest } from 'store/accountHolder/AccountHolderActions'

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
const payments = [
    {
        name: 'cash',
        label: 'Efectivo',
    },
    {
        name: 'debit/credit',
        label: 'Débito/Crédito',
    },
    {
        name: 'post-payment',
        label: 'Postpago',
    },
]

const RechargueAccount = ({ open, setOpen, account }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [payment, setPayment] = React.useState('')
    const [nominal, setNominal] = React.useState<number>()

    const handlePayment = (e) => {
        const value = e.target.value
        setPayment(value)
    }

    const handleNominal = (e) => {
        const value = e.target.value
        setNominal(value)
    }

    const handleAccept = () => {
        const fetchData = async () =>
            await dispatch(
                RechargeAccountRequest({
                    external_reference_id: '001020',
                    account_number: account,
                    recharge_id: '9632587410',
                    facial_amount: nominal,
                    facial_iso_code: '928',
                    nominal_amount: nominal,
                    nominal_iso_code: '928',
                    issuer: 'recharge',
                    payment_method: payment,
                    created_from_ip_address: '192.168.1.107',
                })
            )
        fetchData()
        setOpen(false)
    }

    return (
        <>
            <AlertDialog
                open={open}
                setOpen={setOpen}
                handleAccept={() => handleAccept()}
                title="Recargar cuenta"
                acceptButtonText="Sí, Proceder"
            >
                <Grid container spacing={2} sx={{ marginTop: '5px' }}>
                    <Grid item xs={12} className={classes.searchControl}>
                        <TextField
                            label="Método de pago"
                            select
                            value={payment}
                            onChange={handlePayment}
                            size="small"
                            autoComplete="off"
                            className={classes.searchControl}
                        >
                            {payments.map((option) => (
                                <MenuItem key={option.name} value={option.name}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} className={classes.searchControl}>
                        <TextField
                            label="Monto de recarga"
                            size="small"
                            value={nominal}
                            onChange={handleNominal}
                            autoComplete="off"
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </AlertDialog>
        </>
    )
}

export default RechargueAccount
