import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
import { CompanyProps } from 'types'
import { listCountPage } from 'store/commons/commonsActions'

export const listCompanies = (payload) => ({
    type: 'LIST_COMPANIES',
    payload,
})

export const addCompanies = (payload) => ({
    type: 'ADD_COMPANIES',
    payload,
})

export const updateCompanies = (payload) => ({
    type: 'UPDATE_COMPANIES',
    payload,
})

export const deleteCompanies = (payload) => ({
    type: 'DELETE_COMPANIES',
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
export const getCompaniesRequest = (body) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest('post', 'company/get/', body)
            dispatch(listCompanies(data.data))
            dispatch(listCountPage(data.count_page))

            // dispatch(snackbarOpen('Operación exitosa', 'success'))
        } catch (error) {
            dispatch(listCompanies([]))
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const createCompaniesRequest = (companyData: CompanyProps) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'company/create/',
                companyData
            )

            dispatch(addCompanies(data.data))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Empresa creada correctamente',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'success',
            })
        } catch (error) {
            dispatch(addCompanies([]))
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const updateCompaniesRequest = (companyData: CompanyProps) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'put',
                'company/update/',
                companyData
            )
            dispatch(updateCompanies(data.data))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Actualización exitosa',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'success',
            })
        } catch (error) {
            dispatch(updateCompanies([]))
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const deleteCompaniesRequest = (companyData: CompanyProps) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'put',
                'company/update/',
                companyData
            )

            dispatch(deleteCompanies(data.data))
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
