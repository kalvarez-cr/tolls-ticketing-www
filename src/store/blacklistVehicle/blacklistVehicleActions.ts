import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
import { VehicleBlacklist } from 'types'
import { listCountPage } from 'store/commons/commonsActions'

export const listVehicleBlacklist = (payload) => ({
    type: 'LIST_BLACKLIST_VEHICLE',
    payload,
})

export const addVehicleBlacklist = (payload) => ({
    type: 'ADD_BLACKLIST_VEHICLE',
    payload,
})

export const updateVehicleBlacklist = (payload) => ({
    type: 'UPDATE_BLACKLIST_VEHICLE',
    payload,
})

export const deleteVehicleBlacklist = (payload) => ({
    type: 'DELETE_BLACKLIST_VEHICLE',
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
export const getVehicleBlacklistRequest = (body) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'blacklist-vehicle/get/',
                body
            )
            dispatch(listVehicleBlacklist(data.data))
            dispatch(listCountPage(data.count_page))

            // dispatch(snackbarOpen('Operación exitosa', 'success'))
        } catch (error) {
            dispatch(listVehicleBlacklist([]))
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const createVehicleBlacklistRequest = (
    companyData: VehicleBlacklist
) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'blacklist-vehicle/create/',
                companyData
            )

            dispatch(addVehicleBlacklist(data.data))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'creado correctamente',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'success',
            })
        } catch (error) {
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const updateVehicleBlacklistRequest = (
    companyData: VehicleBlacklist
) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'put',
                'blacklist-vehicle/update/',
                companyData
            )
            dispatch(updateVehicleBlacklist(data.data))
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

export const deleteVehicleBlacklistRequest = (
    companyData: VehicleBlacklist
) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'put',
                'blacklist-vehicle/update/',
                companyData
            )

            dispatch(deleteVehicleBlacklist(data.data))
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
