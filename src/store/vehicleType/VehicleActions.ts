// import { SNACKBAR_OPEN } from 'store/actions'
// import { axiosRequest } from 'store/axios'
// import { TCardsProps } from 'types/index'

import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
import { Tvehicle } from 'types'

export const listVehicle = (payload) => ({
    type: 'LIST_VEHICLE',
    payload,
})

export const addTag = (payload) => ({
    type: 'ADD_TAG',
    payload,
})

export const updateTag = (payload) => ({
    type: 'UPDATE_TAG',
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
export const getVehicleRequest = () => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'toll_vehicle_category/get/',
                {
                    _all_: true,
                }
            )
            dispatch(listVehicle(data.content))
            dispatch(snackbarOpen('Operación exitosa', 'success'))
        } catch (error) {
            dispatch(snackbarOpen('Error de conexión', 'error'))
        }
    }
}

export const createTagRequest = (tagData: Tvehicle) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'registered_tag/create/',
                tagData
            )

            dispatch(addTag(data.content))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Tag creado correctamente',
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

export const updateTagRequest = (tagData: Tvehicle) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'put',
                'registered_tag/update/',
                tagData
            )
            dispatch(updateTag(data.content))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Tag actualizado exitoso',
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
