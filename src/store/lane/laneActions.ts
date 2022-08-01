// import { SNACKBAR_OPEN } from 'store/actions'
// import { axiosRequest } from 'store/axios'
// import { TCardsProps } from 'types/index'

import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
import { TLanes } from 'types'

export const listLanes = (payload) => ({
    type: 'LIST_LANES',
    payload,
})

export const listStateLanes = (payload) => ({
    type: 'LIST_STATE_LANES',
    payload,
})

export const addlanes = (payload) => ({
    type: 'ADD_LANES',
    payload,
})

export const updateLanes = (payload) => ({
    type: 'UPDATE_LANES',
    payload,
})
export const deleteLanes = (payload) => ({
    type: 'DELETE_LANES',
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
export const getLaneRequest = () => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest('post', 'lane/get/', {
                _all_: true,
            })
            dispatch(listLanes(data.data))
            dispatch(snackbarOpen('Operación exitosa', 'success'))
        } catch (error) {
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const getLaneStateRequest = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest('post', 'lane/by_site/', id)
            dispatch(listStateLanes(data.data))
            // dispatch(snackbarOpen('Operación exitosa', 'success'))
        } catch (error) {
            // dispatch(snackbarOpen('Error de conexión', 'error'))
        }
    }
}

export const createLaneRequest = (tollData: TLanes) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'lane/create/',
                tollData
            )

            dispatch(addlanes(data.data))

            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Canal creado correctamente',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'success',
            })
        } catch (error) {
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const updateLaneRequest = (tollData: TLanes) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest('put', 'lane/update/', tollData)
            dispatch(updateLanes(data.data))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Actualización exitosa',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'success',
            })
        } catch (error) {
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const deleteLaneRequest = (tollData: TLanes) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest('put', 'lane/update/', tollData)
            dispatch(deleteLanes(data.data))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Actualización exitosa',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'success',
            })
        } catch (error) {
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}
