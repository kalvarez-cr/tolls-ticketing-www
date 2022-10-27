import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
import { RoadsProps } from 'types'
import { listCountPage } from 'store/commons/commonsActions'

export const listRoads = (payload) => ({
    type: 'LIST_ROADS',
    payload,
})

export const addRoads = (payload) => ({
    type: 'ADD_ROADS',
    payload,
})

export const updateRoads = (payload) => ({
    type: 'UPDATE_ROADS',
    payload,
})

export const deleteRoads = (payload) => ({
    type: 'DELETE_ROADS',
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
export const getRoadsRequest = (body) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest('post', 'highway/get/', body)
            dispatch(listRoads(data.data))
            dispatch(listCountPage(data.count_page))

            // dispatch(snackbarOpen('Operación exitosa', 'success'))
        } catch (error) {
            dispatch(listRoads([]))
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const createRoadsRequest = (roadData: RoadsProps) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'highway/create/',
                roadData
            )

            dispatch(addRoads(data.data))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Vía creada correctamente',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'success',
            })
        } catch (error) {
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const updateRoadsRequest = (roadData: RoadsProps) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'put',
                'highway/update/',
                roadData
            )
            dispatch(updateRoads(data.data))
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

export const deleteRoadsRequest = (roadData: RoadsProps) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'put',
                'highway/update/',
                roadData
            )

            dispatch(deleteRoads(data.data))
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
