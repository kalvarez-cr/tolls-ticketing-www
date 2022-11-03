import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
import { LiquidationConfigProps } from 'types'
import { listCountPage } from 'store/commons/commonsActions'

export const listLiquidationConfig = (payload) => ({
    type: 'LIST_LIQUIDATION_CONFIG',
    payload,
})

export const addLiquidationConfig = (payload) => ({
    type: 'ADD_LIQUIDATION_CONFIG',
    payload,
})

export const updateLiquidationConfig = (payload) => ({
    type: 'UPDATE_LIQUIDATION_CONFIG',
    payload,
})

export const deleteLiquidationConfig = (payload) => ({
    type: 'DELETE_LIQUIDATION_CONFIG',
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
export const getLiquidationConfigRequest = (body) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'settlement-criteria/get/',
                body
            )
            dispatch(listLiquidationConfig(data.data))
            dispatch(listCountPage(data.count_page))

            // dispatch(snackbarOpen('Operación exitosa', 'success'))
        } catch (error) {
            dispatch(listLiquidationConfig([]))
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const createLiquidationConfigRequest = (
    LiquidationConfigData: LiquidationConfigProps
) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'settlement-criteria/create/',
                LiquidationConfigData
            )

            dispatch(addLiquidationConfig(data.data))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Liquidación creada correctamente',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'success',
            })
        } catch (error) {
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const updateLiquidationConfigRequest = (
    LiquidationConfigData: LiquidationConfigProps
) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'put',
                'settlement-criteria/update/',
                LiquidationConfigData
            )
            dispatch(updateLiquidationConfig(data.data))
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

export const deleteLiquidationConfigRequest = (
    LiquidationConfigData: LiquidationConfigProps
) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'put',
                'settlement-criteria/update/',
                LiquidationConfigData
            )

            dispatch(deleteLiquidationConfig(data.data))
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
