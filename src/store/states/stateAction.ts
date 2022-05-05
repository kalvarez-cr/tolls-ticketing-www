import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'

export const listState = (payload) => ({
    type: 'LIST_STATES',
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

export const getStatesRequest = () => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest('post', 'state/get/', {
                _all_: true,
            })
            dispatch(listState(data.data))

            dispatch(snackbarOpen('Operación exitosa', 'success'))
        } catch (error) {
            dispatch(snackbarOpen('Error de conexión', 'error'))
        }
    }
}
