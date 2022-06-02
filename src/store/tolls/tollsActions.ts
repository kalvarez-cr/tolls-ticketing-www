// import { SNACKBAR_OPEN } from 'store/actions'
// import { axiosRequest } from 'store/axios'
// import { TCardsProps } from 'types/index'

import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
// import { TTollsSite } from 'types'

export const listTolls = (payload) => ({
    type: 'LIST_TOLLS',
    payload,
})

export const addTolls = (payload) => ({
    type: 'ADD_TOLLS',
    payload,
})

export const updateTolls = (payload) => ({
    type: 'UPDATE_TOLLS',
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
export const getTollsRequest = (body) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest('post', 'site/get/', body)
            dispatch(listTolls(data.data))

            // dispatch(snackbarOpen('Operación exitosa', 'success'))
        } catch (error) {
            // dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const createTollsRequest = (tollData: any) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'site/create/',
                tollData
            )

            dispatch(addTolls(data.data))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Peaje creado correctamente',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'success',
            })
        } catch (error) {
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const updateTollRequest = (tollData: any) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest('put', 'site/update/', tollData)
            dispatch(updateTolls(data.data))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Peaje actualizado exitoso',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'success',
            })
        } catch (error) {
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}
