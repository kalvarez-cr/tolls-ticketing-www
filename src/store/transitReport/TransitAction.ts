// import { SNACKBAR_OPEN } from 'store/actions'
// import { axiosRequest } from 'store/axios'
// import { TCardsProps } from 'types/index'

import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
import { transitRes } from 'types'

export const lisTransitReport = (payload) => ({
    type: 'LIST_TRANSIT_REPORT',
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
export const getTransitReportRequest = (reportData: transitRes) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'reports/detailed_reports/',
                reportData
            )
            dispatch(lisTransitReport(data.data))
            dispatch(snackbarOpen('Operación exitosa', 'success'))
            return true
        } catch (error) {
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}
