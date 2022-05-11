// import { SNACKBAR_OPEN } from 'store/actions'
// import { axiosRequest } from 'store/axios'
// import { TCardsProps } from 'types/index'

import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
import { accountHolder } from 'types'

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
            dispatch(snackbarOpen('Error de conexión', 'error'))
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
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Error de conexion',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'error',
            })
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
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Error de conexion',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'error',
            })
        }
    }
}
