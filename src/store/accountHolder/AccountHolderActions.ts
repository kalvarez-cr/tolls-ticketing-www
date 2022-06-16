// import { SNACKBAR_OPEN } from 'store/actions'
// import { axiosRequest } from 'store/axios'
// import { TCardsProps } from 'types/index'

import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
import { accountHolder, account } from 'types'

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
export const getAccountHolderRequest = () => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest('post', 'account-holder/get/', {
                _all_: true,
            })
            dispatch(listAccountHolder(data.data))

            dispatch(snackbarOpen('Operación exitosa', 'success'))
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
