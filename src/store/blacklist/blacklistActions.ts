import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
import { blacklist } from 'types'
import { listCountPage } from 'store/commons/commonsActions'

export const listBlacklist = (payload) => ({
    type: 'LIST_BLACKLIST',
    payload,
})

export const addBlacklist = (payload) => ({
    type: 'ADD_BLACKLIST',
    payload,
})

export const updateBlacklist = (payload) => ({
    type: 'UPDATE_BLACKLIST',
    payload,
})

export const deleteBlacklist = (payload) => ({
    type: 'DELETE_BLACKLIST',
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
export const getBlacklistRequest = (body) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'blacklist-criteria/get/',
                body
            )
            dispatch(listBlacklist(data.data))
            dispatch(listCountPage(data.count_page))

            // dispatch(snackbarOpen('Operación exitosa', 'success'))
        } catch (error) {
            dispatch(listBlacklist([]))
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const createBlacklistRequest = (companyData: blacklist) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'blacklist-criteria/create/',
                companyData
            )

            dispatch(addBlacklist(data.data))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'creado correctamente',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'success',
            })
        } catch (error) {
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const updateBlacklistRequest = (companyData: blacklist) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'put',
                'blacklist-criteria/update/',
                companyData
            )
            dispatch(updateBlacklist(data.data))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Actualización exitosa',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'success',
            })
        } catch (error) {
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const deleteBlacklistRequest = (companyData: blacklist) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'put',
                'blacklist-criteria/update/',
                companyData
            )

            dispatch(deleteBlacklist(data.data))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Eliminado con éxito',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'success',
            })
        } catch (error) {
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}
