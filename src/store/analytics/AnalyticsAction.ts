import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
import { analytics } from 'types'

export const listAnalyticsReport = (payload) => ({
    type: 'LIST_ANALYTICS_REPORT',
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
export const getAnalyticsReportRequest = (reportData: analytics) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'reports/analytics/',
                reportData
            )
            dispatch(listAnalyticsReport(data.data))
            dispatch(snackbarOpen('Operación exitosa', 'success'))
            return true
        } catch (error) {
            dispatch(snackbarOpen('Error de conexión', 'error'))
        }
    }
}
