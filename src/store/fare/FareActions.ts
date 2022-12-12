import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
import { fare } from 'types'
import { listCountPage } from 'store/commons/commonsActions'

export const listFare = (payload) => ({
    type: 'LIST_FARE',
    payload,
})

export const listAllFares = (payload) => ({
    type: 'LIST_ALL_FARES',
    payload,
})

export const addFare = (payload) => ({
    type: 'ADD_FARE',
    payload,
})

export const updateFare = (payload) => ({
    type: 'UPDATE_FARE',
    payload,
})

export const deleteFare = (payload) => ({
    type: 'DELETE_FARE',
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
export const getFareRequest = (fares) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'fare-product/get/',
                fares
            )
            dispatch(listFare(data.data))
            dispatch(listCountPage(data.count_page))

            dispatch(snackbarOpen('Operación exitosa', 'success'))
        } catch (error) {
            dispatch(listFare([]))
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const getFareByTollId = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'fare-product/by_site/',
                id
            )
            dispatch(listAllFares(data.data))
            dispatch(listCountPage(data.count_page))

            // dispatch(snackbarOpen('Operación exitosa', 'success'))
        } catch (error) {
            dispatch(listAllFares([]))
            // dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const createFareRequest = (tollData: fare) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'fare-product/create/',
                tollData
            )

            dispatch(addFare(data.data))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Creado con éxito',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'success',
            })
        } catch (error) {
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const updateFareRequest = (tollData: fare) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'put',
                'fare-product/update/',
                tollData
            )
            dispatch(updateFare(data.data))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Actualizado con éxito',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'success',
            })
        } catch (error) {
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const DeleteFareRequest = (tollData: fare) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'put',
                'fare-product/update/',
                tollData
            )
            dispatch(deleteFare(data.data))

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
