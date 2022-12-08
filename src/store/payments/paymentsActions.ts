import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
import { PaymentsProps } from 'types'
import { listCountPage } from 'store/commons/commonsActions'

export const listPayments = (payload) => ({
    type: 'LIST_PAYMENTS',
    payload,
})

export const addPayments = (payload) => ({
    type: 'ADD_PAYMENTS',
    payload,
})

export const updatePayments = (payload) => ({
    type: 'UPDATE_PAYMENTS',
    payload,
})

export const deletePayments = (payload) => ({
    type: 'DELETE_PAYMENTS',
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
export const getPaymentsRequest = (body) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'payment-method/get/',
                body
            )
            dispatch(listPayments(data.data))
            dispatch(listCountPage(data.count_page))

            // dispatch(snackbarOpen('Operación exitosa', 'success'))
        } catch (error) {
            dispatch(listPayments([]))
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const createPaymentsRequest = (companyData: PaymentsProps) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'payment-method/create/',
                companyData
            )

            dispatch(addPayments(data.data))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Creado correctamente',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'success',
            })
        } catch (error) {
            dispatch(addPayments([]))
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const updatePaymentsRequest = (companyData: PaymentsProps) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'put',
                'payment-method/update/',
                companyData
            )
            dispatch(updatePayments(data.data))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Actualización exitosa',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'success',
            })
        } catch (error) {
            dispatch(updatePayments([]))
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const deletePaymentsRequest = (companyData: PaymentsProps) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'put',
                'payment-method/update/',
                companyData
            )

            dispatch(deletePayments(data.data))
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
