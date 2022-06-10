// import { SNACKBAR_OPEN } from 'store/actions'
// import { axiosRequest } from 'store/axios'
// import { TCardsProps } from 'types/index'

import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
import { SaleTag } from 'types'

export const listTag = (payload) => ({
    type: 'LIST_TAG',
    payload,
})

export const addTag = (payload) => ({
    type: 'ADD_TAG',
    payload,
})

export const updateTag = (payload) => ({
    type: 'UPDATE_TAG',
    payload,
})

export const deleteTag = (payload) => ({
    type: 'DELETE_TAG',
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
export const getTagRequest = () => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest('post', 'registered-tag/get/', {
                _all_: true,
            })
            dispatch(listTag(data.data))
            dispatch(snackbarOpen('Operación exitosa', 'success'))
        } catch (error) {
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const createTagRequest = (tagData: SaleTag) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'registered-tag/create/',
                tagData
            )

            dispatch(addTag(data.data))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Tag creado correctamente',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'success',
            })
        } catch (error) {
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const updateTagRequest = (tagData: SaleTag) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'put',
                'registered-tag/update/',
                tagData
            )
            dispatch(updateTag(data.data))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Tag actualizado exitoso',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'success',
            })
        } catch (error) {
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const deleteTagRequest = (tagData: SaleTag) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'put',
                'registered-tag/update/',
                tagData
            )

            dispatch(deleteTag(data.data))
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
