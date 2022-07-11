import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
import { account } from 'types'
import { listCountPage } from 'store/commons/commonsActions'


export const listVehicle = (payload) => ({
    type: 'LIST_ACCOUNT',
    payload,
})

export const addVehicle = (payload) => ({
    type: 'ADD_ACCOUNTS',
    payload,
})

export const updateVehicle = (payload) => ({
    type: 'UPDATE_ACCOUNTS',
    payload,
})

export const deleteVehicle = (payload) => ({
    type: 'DELETE_ACCOUNTS',
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
export const getVehiclesRequest = (vehicles) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'registered-vehicle/get/',
                vehicles
            )
            dispatch(listVehicle(data.data))
            dispatch(listCountPage(data.count_page))

            dispatch(snackbarOpen('Operación exitosa', 'success'))
        } catch (error) {
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const createVehiclesRequest = (tollData: account) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'registered-vehicle/create/',
                tollData
            )

            dispatch(addVehicle(data.data))
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

export const updateVehiclesRequest = (tollData: account) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'put',
                'registered-vehicle/update/',
                tollData
            )
            dispatch(updateVehicle(data.data))
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

export const deleteVehicleRequest = (tollData: account) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'put',
                'registered-vehicle/update/',
                tollData
            )

            dispatch(deleteVehicle(data.data))
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
