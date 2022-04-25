// import { SNACKBAR_OPEN } from 'store/actions'
// import { axiosRequest } from 'store/axios'
// import { TCardsProps } from 'types/index'

import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
import { category } from 'types'

export const listCategory = (payload) => ({
    type: 'LIST_CATEGORY',
    payload,
})

export const addCategory = (payload) => ({
    type: 'ADD_CATEGORY',
    payload,
})

export const updateCategory = (payload) => ({
    type: 'UPDATE_CATEGORY',
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
export const getCategoryRequest = () => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'vehicle-category/get/',
                {
                    _all_: true,
                }
            )
            dispatch(listCategory(data.data))

            dispatch(snackbarOpen('Operación exitosa', 'success'))
        } catch (error) {
            dispatch(snackbarOpen('Error de conexión', 'error'))
        }
    }
}

export const createCategoryRequest = (tollData: category) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'vehicle-category/create/',
                tollData
            )

            dispatch(addCategory(data.data))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Categoria creada correctamente',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'success',
            })
        } catch (error) {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Error de conexion',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'error',
            })
        }
    }
}

export const updateCategoryRequest = (tollData: category) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'put',
                'vehicle-category/update/',
                tollData
            )
            dispatch(updateCategory(data.data))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Categoria actualizada exitoso',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'success',
            })
        } catch (error) {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Error de conexion',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'error',
            })
        }
    }
}
