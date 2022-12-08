import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
import { ServicesProps, servicesUpdateProps } from 'types'
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
            const formData = new FormData()

            Object.entries({ icon: servicesData.icon }).forEach(
                ([key, value]) => {
                    //@ts-ignore
                    formData.append(key, value)
                    formData.append('name', servicesData.name)
                    formData.append('price', servicesData.price.toString())
                    formData.append('service_code', servicesData.service_code)
                    formData.append('description', servicesData.description)
                }
            )

            const url = `${process.env.REACT_APP_BASE_API_URL}/service/create/`

            const response = await fetch(url, {
                method: 'POST',
                body: formData,
                credentials: 'include',
            })
            const data = await response.json()
            if (response.status >= 400) {
                throw data.data
            }
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

export const updateServicesRequest = (servicesData: servicesUpdateProps) => {
    return async (dispatch) => {
        try {
            const formData = new FormData()

            Object.entries({ icon: servicesData.icon }).forEach(
                ([key, value]) => {
                    //@ts-ignore
                    formData.append(key, value)
                    formData.append('id', servicesData.id)
                    formData.append('name', servicesData.name)
                    formData.append('price', servicesData.price.toString())
                    formData.append('service_code', servicesData.service_code)
                    formData.append('description', servicesData.description)
                }
            )

            const url = `${process.env.REACT_APP_BASE_API_URL}/service/update/`

            const response = await fetch(url, {
                method: 'PUT',
                body: formData,
                credentials: 'include',
            })
            const data = await response.json()
            if (response.status >= 400) {
                throw data.data
            }
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
            console.log('update error=====>', error)
            //@ts-ignore
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
