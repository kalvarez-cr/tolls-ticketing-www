// import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
// import { filter } from 'types'

export const listFilteredData = (payload) => ({
    type: 'LIST_FILTERED_DATA',
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

// async request
export const getFilteredRequest = (filters) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'reports/select/',
                filters
            )
            dispatch(listFilteredData(data.data))
            // dispatch(snackbarOpen('Operación exitosa', 'success'))
           return data.data
        } catch (error) {
            // dispatch(snackbarOpen('Error de conexión', 'error'))
        }
    }
}
