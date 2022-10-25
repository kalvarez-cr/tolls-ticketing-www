import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
import { ServicesProps } from 'types'
import { listCountPage } from 'store/commons/commonsActions'

export const listServices = (payload) => ({
    type: 'LIST_SERVICES',
    payload,
})

export const addServices = (payload) => ({
    type: 'ADD_SERVICES',
    payload,
})

export const updateServices = (payload) => ({
    type: 'UPDATE_SERVICES',
    payload,
})

export const deleteServices = (payload) => ({
    type: 'DELETE_SERVICES',
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
export const getServicesRequest = (body) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest('post', 'service/get/', body)
            dispatch(listServices(data.data))
            dispatch(listCountPage(data.count_page))

            // dispatch(snackbarOpen('Operación exitosa', 'success'))
        } catch (error) {
            dispatch(listServices([]))
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const createServicesRequest = (servicesData: ServicesProps) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'service/create/',
                servicesData
            )

            dispatch(addServices(data.data))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Servicio creado correctamente',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'success',
            })
        } catch (error) {
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const updateServicesRequest = (servicesData: ServicesProps) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'put',
                'service/update/',
                servicesData
            )
            dispatch(updateServices(data.data))
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

export const deleteServicesRequest = (servicesData: ServicesProps) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'put',
                'service/update/',
                servicesData
            )

            dispatch(deleteServices(data.data))
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
