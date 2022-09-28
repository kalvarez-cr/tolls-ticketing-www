import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
import { listCountPage } from 'store/commons/commonsActions'

export const listMonitoring = (payload) => ({
    type: 'LIST_MONITORING',
    payload,
})

export const updateMonitoring = (payload) => ({
    type: 'UPDATE_MONITORING',
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
export const getMonitoringRequest = (monitoring) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'monitor/by_site/',
                monitoring
            )
            dispatch(listMonitoring(data.data))
            dispatch(listCountPage(data.count_page))
            dispatch(snackbarOpen('Operación exitosa', 'success'))
            return true
        } catch (error) {
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

// async request
export const updateMonitoringRequest = (monitoring) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'put',
                'monitor/update_location/',
                monitoring
            )
            dispatch(updateMonitoring(data.data))
            // dispatch(listCountPage(data.count_page))
            dispatch(snackbarOpen('Operación exitosa', 'success'))
            return true
        } catch (error) {
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}
