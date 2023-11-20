import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
// import { axiosRequest } from 'store/axios'
import { TLoginDataProps } from 'types'

// const initialValues = {
//     email: 'info@codedthemes.com',
//     password: '123456',
//     submit: null
// }
export const loginRequest = (payload: any) => {
    return {
        type: 'LOGIN_REQUEST',
        info: {
            ...payload,
            isLoggedIn: true,
            // username:'prueba@gmail.com',
            // user:'prueba',
        },
    }
}

export const logoutRequest = (payload: any) => {
    return {
        type: 'LOGOUT_REQUEST',
        info: null,
        // info: {
        //     ...payload,

        //      isLoggedIn: false,
        //     user: null,
        // },
    }
}

const snackbarAlert = (message, type) => {
    return {
        type: SNACKBAR_OPEN,
        open: true,
        message: message,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        variant: 'alert',
        alertSeverity: type,
    }
}

export const getLoginRequest = (auth: TLoginDataProps) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest('post', 'login/', {
                ...auth,
            })
            dispatch(loginRequest(data))
            dispatch(snackbarAlert('Operación exitosa', 'success'))
        } catch (error) {
            dispatch(snackbarAlert('Error de login', 'error'))
        }
    }
}
export const removeLoginRequest = () => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest('post', 'logout/')
            dispatch(logoutRequest(data))
        } catch (error) {
            dispatch(snackbarAlert('Error de logout', 'error'))
        }
    }
}
