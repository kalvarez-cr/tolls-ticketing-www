import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'

export const listToll = (payload) => ({
    type: 'LIST_TOLL',
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

export const getTollsALLRequest = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest('post', 'site/complete_data/', {
                id,
            })
            dispatch(listToll(data.data))

            dispatch(snackbarOpen('Operación exitosa', 'success'))
        } catch (error) {
            dispatch(snackbarOpen('Error de conexión', 'error'))
        }
    }
}
