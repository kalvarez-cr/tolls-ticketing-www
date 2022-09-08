// import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'

export const listReportPeriod = (payload) => ({
    type: 'LIST_PERIOD_REPORT',
    payload,
})

// const snackbarOpen = (message, type) => {
//     return {
//         type: SNACKBAR_OPEN,
//         open: true,
//         message: message,
//         anchorOrigin: { vertical: 'top', horizontal: 'right' },
//         variant: 'alert',
//         alertSeverity: type,
//     }
// }

export const getperiodReportRequest = (body) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'work-period/get/',
                body
            )
            dispatch(listReportPeriod(data.data))

            // dispatch(snackbarOpen('Operación exitosa', 'success'))
        } catch (error) {
            // dispatch(snackbarOpen(error, 'error'))
        }
    }
}
