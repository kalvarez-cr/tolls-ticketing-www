import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
import { accountHolder, account } from 'types'
import { listCountPage } from 'store/commons/commonsActions'

export const listAccountHolder = (payload) => ({
    type: 'LIST_ACCOUNT_HOLDER',
    payload,
})

export const addAccountHolder = (payload) => ({
    type: 'ADD_ACCOUNT_HOLDER',
    payload,
})

export const updateAccountHolder = (payload) => ({
    type: 'UPDATE_ACCOUNT_HOLDER',
    payload,
})

export const deleteAccountHolder = (payload) => ({
    type: 'DELETE_ACCOUNT_HOLDER',
    payload,
})

export const rechargeAccountHolder = (payload) => ({
    type: 'RECHARGE_ACCOUNT_HOLDER',
    payload,
})

export const cancelAccountHolder = (payload) => ({
    type: 'CANCEL_ACCOUNT_HOLDER',
    payload,
})

export const blockAccountHolder = (payload) => ({
    type: 'BLOCK_ACCOUNT_HOLDER',
    payload,
})

export const addCar = (payload) => ({
    type: 'ADD_ACCOUNT',
    payload,
})

export const updateCar = (payload) => ({
    type: 'UPDATE_ACCOUNT',
    payload,
})

export const deleteCar = (payload) => ({
    type: 'DELETE_ACCOUNT',
    payload,
})
const snackbarOpen = (message, type) => {
    return {
        type: SNACKBAR_OPEN,
        open: true,
        message: message,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        variant: 'alert',
        alertSeverity: type,
    }
}

// async request
export const getAccountHolderRequest = (holders) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'account-holder/get/',
                holders
            )
            dispatch(listAccountHolder(data.data))
            dispatch(listCountPage(data.count_page))

            // dispatch(snackbarOpen('Operación exitosa', 'success'))
        } catch (error) {
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const createAccountHolderRequest = (tollData: accountHolder) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'account-holder/create/',
                tollData
            )

            dispatch(addAccountHolder(data.data))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'usuario creado correctamente',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'success',
            })
            return data.data
        } catch (error) {
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const updateAccountHolderRequest = (tollData: accountHolder) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'put',
                'account-holder/update/',
                tollData
            )
            dispatch(updateAccountHolder(data.data))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Usuario actualizado exitoso',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'success',
            })
        } catch (error) {
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const deleteAccountRequest = (tollData: accountHolder) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'put',
                'account-holder/update/',
                tollData
            )

            dispatch(deleteAccountHolder(data.data))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Eliminado con éxito',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'success',
            })
        } catch (error) {
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const RechargeAccountRequest = (tollData) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'recharge-module/create/',
                tollData
            )
            console.log(data)

            dispatch(rechargeAccountHolder(data.data))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Su recarga ha sido realizada',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'success',
            })
        } catch (error) {
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const blockAccountRequest = (tollData: accountHolder) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'account/block/',
                tollData
            )

            dispatch(blockAccountHolder(data.data))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Su cuenta ha sido bloqueada',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'success',
            })
        } catch (error) {
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const cancelAccountRequest = (tollData: accountHolder) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'account/cancel/',
                tollData
            )

            dispatch(cancelAccountHolder(data.data))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Su cuenta ha sido cancelada',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'success',
            })
        } catch (error) {
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const createCarRequest = (tollData: account, userId?: string) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'registered-vehicle/create/',
                tollData
            )
            console.log()

            dispatch(addCar({ ...data.data, userId }))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Vehiculo asociado exitoso',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'success',
            })
        } catch (error) {
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const updateCarRequest = (tollData: account, userId?: string) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'put',
                'registered-vehicle/update/',
                tollData
            )
            dispatch(updateCar({ ...data.data, userId }))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Vehiculo actualizado exitoso',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'success',
            })
        } catch (error) {
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const deleteCarRequest = (tollData: account, userId?: string) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'put',
                'registered-vehicle/update/',
                tollData
            )

            dispatch(deleteCar({ ...data.data, userId }))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Eliminado con éxito',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'success',
            })
        } catch (error) {
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}
