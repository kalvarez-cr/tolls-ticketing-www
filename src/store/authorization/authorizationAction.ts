import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'

export const listCode = (payload) => ({
    type: 'LIST_CODE',
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

export const getAuthorizationRequest = (codes) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'account-holder/verificate-account/',
                codes
            )
            dispatch(listCode(data.data))

            dispatch(snackbarOpen('Operación exitosa', 'success'))
            return { result: true }
        } catch (error) {
            dispatch(snackbarOpen(error, 'error'))
            return { result: false }
        }
    }
}
