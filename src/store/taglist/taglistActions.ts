import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
import { TagList } from 'types'
import { listCountPage } from 'store/commons/commonsActions'

export const lisTaglist = (payload) => ({
    type: 'LIST_TAGLIST',
    payload,
})

export const addTaglist = (payload) => ({
    type: 'ADD_TAGLIST',
    payload,
})

export const updateTaglist = (payload) => ({
    type: 'UPDATE_TAGLIST',
    payload,
})

export const deleteTaglist = (payload) => ({
    type: 'DELETE_TAGLIST',
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
export const getTaglistRequest = (body) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'blacklist-tag/get/',
                body
            )
            dispatch(lisTaglist(data.data))
            dispatch(listCountPage(data.count_page))

            // dispatch(snackbarOpen('Operación exitosa', 'success'))
        } catch (error) {
            dispatch(lisTaglist([]))
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const createTaglistRequest = (companyData: TagList) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'blacklist-tag/create/',
                companyData
            )

            dispatch(addTaglist(data.data))
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

export const updateTaglistRequest = (companyData: TagList) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'put',
                'blacklist-tag/update/',
                companyData
            )
            dispatch(updateTaglist(data.data))
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

export const deleteTaglistRequest = (companyData: TagList) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'put',
                'blacklist-tag/update/',
                companyData
            )

            dispatch(deleteTaglist(data.data))
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
