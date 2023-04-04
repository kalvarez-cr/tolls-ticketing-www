
import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'

export const listTransitDetailsReport = (payload) => ({
    type: 'LIST_TRANSIT_DETAILS',
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
export const getConsolidateTagReportRequest = (reportData: any) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'reports/transit-details/',
                reportData
            )
            dispatch(listTransitDetailsReport(data.data))
            dispatch(snackbarOpen('Operación exitosa', 'success'))
            return true
        } catch (error) {
            dispatch(snackbarOpen('Error de conexión', 'error'))
        }
    }
}
