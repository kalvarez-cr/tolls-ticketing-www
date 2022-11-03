import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
import { liquidationConcept } from 'types'
import { listCountPage } from 'store/commons/commonsActions'

export const listLiquidationConcept = (payload) => ({
    type: 'LIST_LIQUIDATION_CONCEPT',
    payload,
})

export const addLiquidationConcept = (payload) => ({
    type: 'ADD_LIQUIDATION_CONCEPT',
    payload,
})

export const updateLiquidationConcept = (payload) => ({
    type: 'UPDATE_LIQUIDATION_CONCEPT',
    payload,
})

export const deleteLiquidationConcept = (payload) => ({
    type: 'DELETE_LIQUIDATION_CONCEPT',
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
export const getLiquidationConceptRequest = (body) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest('post', 'settlement/get/', body)
            dispatch(listLiquidationConcept(data.data))
            dispatch(listCountPage(data.count_page))

            // dispatch(snackbarOpen('Operación exitosa', 'success'))
        } catch (error) {
            dispatch(listLiquidationConcept([]))
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const createLiquidationConceptRequest = (
    LiquidationConfigData: liquidationConcept
) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'settlement/create/',
                LiquidationConfigData
            )

            dispatch(addLiquidationConcept(data.data))
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

export const updateLiquidationConceptRequest = (
    LiquidationConfigData: liquidationConcept
) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'put',
                'settlement/update/',
                LiquidationConfigData
            )
            dispatch(updateLiquidationConcept(data.data))
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

export const deleteLiquidationConceptRequest = (
    LiquidationConfigData: liquidationConcept
) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'put',
                'settlement/update/',
                LiquidationConfigData
            )

            dispatch(deleteLiquidationConcept(data.data))
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
