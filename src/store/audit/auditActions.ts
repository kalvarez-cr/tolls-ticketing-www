import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
import { AuditProps } from 'types'
import { listCountPage } from 'store/commons/commonsActions'

export const listAudits = (payload) => ({
    type: 'LIST_AUDIT',
    payload,
})

export const updateAudits = (payload) => ({
    type: 'UPDATE_AUDITS',
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
            const { data } = await axiosRequest('post', 'grey-list/get/', body)
            dispatch(listAudits(data.data))
            dispatch(listCountPage(data.count_page))

            // dispatch(snackbarOpen('Operación exitosa', 'success'))
        } catch (error) {
            dispatch(listAudits([]))
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const updateAuditsRequest = (auditsData: Array<AuditProps>) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'put',
                'company/update/',
                auditsData
            )
            dispatch(updateAudits(data.data))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Actualización exitosa',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'success',
            })
        } catch (error) {
            dispatch(updateAudits([]))
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}
