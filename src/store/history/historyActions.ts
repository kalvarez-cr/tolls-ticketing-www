import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
import { listCountPage } from 'store/commons/commonsActions'

export const listHistory = (payload) => ({
    type: 'LIST_ HISTORY',
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
export const ListHistoryRequest = (body) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest('post', 'history-of-changes/get/', body)
            dispatch(listHistory(data.data))
            dispatch(listCountPage(data.count_page))

            // dispatch(snackbarOpen('Operación exitosa', 'success'))
        } catch (error) {
            dispatch(listHistory([]))
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

