import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
import { CategorySiteProps } from 'types'
import { listCountPage } from 'store/commons/commonsActions'

export const listCategorySite = (payload) => ({
    type: 'LIST_CATEGORY_SITE',
    payload,
})

export const addCategorySite = (payload) => ({
    type: 'ADD_CATEGORY_SITE',
    payload,
})

export const updateCategorySite = (payload) => ({
    type: 'UPDATE_CATEGORY_SITE',
    payload,
})

export const deleteCategorySite = (payload) => ({
    type: 'DELETE_CATEGORY_SITE',
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
export const getCategorySiteRequest = (body) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'site-category/get/',
                body
            )
            dispatch(listCategorySite(data.data))
            dispatch(listCountPage(data.count_page))

            // dispatch(snackbarOpen('Operación exitosa', 'success'))
        } catch (error) {
            dispatch(listCategorySite([]))
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const createCategorySiteRequest = (
    CategorySiteData: CategorySiteProps
) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'site-category/create/',
                CategorySiteData
            )

            dispatch(addCategorySite(data.data))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Empresa creada correctamente',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'success',
            })
        } catch (error) {
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const updateCategorySiteRequest = (
    CategorySiteData: CategorySiteProps
) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'put',
                'site-category/update/',
                CategorySiteData
            )
            dispatch(updateCategorySite(data.data))
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

export const deleteCategorySiteRequest = (
    CategorySiteData: CategorySiteProps
) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'put',
                'site-category/update/',
                CategorySiteData
            )

            dispatch(deleteCategorySite(data.data))
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
