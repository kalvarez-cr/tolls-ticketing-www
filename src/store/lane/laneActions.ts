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

export const addlanes = (payload) => ({
    type: 'ADD_LANES',
    payload,
})

export const updateLanes = (payload) => ({
    type: 'UPDATE_LANES',
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
            dispatch(snackbarOpen('Error de conexión', 'error'))
        }
    }
}

export const createLaneRequest = (tollData: TLanes) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'toll_lane/create/',
                tollData
            )

            dispatch(addlanes(data.content))

            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Canal creado correctamente',
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

export const updateLaneRequest = (tollData: TLanes) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'put',
                'toll_lane/update/',
                tollData
            )
            dispatch(updateLanes(data.content))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'canal actualizado exitoso',
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
