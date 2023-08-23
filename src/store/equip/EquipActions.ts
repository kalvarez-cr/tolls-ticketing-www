// import { SNACKBAR_OPEN } from 'store/actions'
// import { axiosRequest } from 'store/axios'
// import { TCardsProps } from 'types/index'

import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
import { TEquips } from 'types'

export const listEquip = (payload) => ({
    type: 'LIST_EQUIP',
    payload,
})

export const addEquip = (payload) => ({
    type: 'ADD_EQUIP',
    payload,
})

export const updateEquip = (payload) => ({
    type: 'UPDATE_EQUIP',
    payload,
})

export const deleteEquip = (payload) => ({
    type: 'DELETE_EQUIP',
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
export const getEquipRequest = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest('post', 'node/get/', id)
            dispatch(listEquip(data.data))

            dispatch(snackbarOpen('Operación exitosa', 'success'))
        } catch (error) {
            dispatch(listEquip([]))
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const createEquipRequest = (tollData: TEquips) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'node/create/',
                tollData
            )

            dispatch(addEquip(data.data))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Equipo creado con éxito',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'success',
            })
        } catch (error) {
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const updateEquipRequest = (tollData: TEquips) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest('put', 'node/update/', tollData)
            dispatch(updateEquip(data.data))
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

export const deleteEquipRequest = (tollData: TEquips) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest('put', 'node/update/', tollData)
            dispatch(deleteEquip(data.data))
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
