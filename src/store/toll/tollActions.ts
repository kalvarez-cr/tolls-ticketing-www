// import { SNACKBAR_OPEN } from 'store/actions'
import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
import { employees, TEquips, TLanes } from 'types'

export const listToll = (payload) => ({
    type: 'LIST_TOLL',
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

export const addEmployee = (payload) => ({
    type: 'ADD_EMPLOYEES',
    payload,
})
export const updateEmployee = (payload) => ({
    type: 'UPDATE_EMPLOYEES',
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

export const addlanes = (payload) => ({
    type: 'ADD_LANES',
    payload,
})

export const updateLanes = (payload) => ({
    type: 'UPDATE_LANES',
    payload,
})

export const deleteLanes = (payload) => ({
    type: 'DELETE_LANES',
    payload,
})
export const getTollsALLRequest = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest('post', 'site/complete_data/', {
                id,
            })
            dispatch(listToll(data.data))

            // dispatch(snackbarOpen('Operación exitosa', 'success'))
        } catch (error) {
            // dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const createEmployeesRequest = (tollData: employees) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'employee/create/',
                tollData
            )

            dispatch(addEmployee(data.data))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Empleado creado correctamente',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'success',
            })
        } catch (error) {
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const updateEmployeesRequest = (tollData: employees) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'put',
                'employee/update/',
                tollData
            )
            dispatch(updateEmployee(data.data))
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

export const createLaneRequest = (tollData: TLanes) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'lane/create/',
                tollData
            )

            dispatch(addlanes(data.data))

            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Canal creado correctamente',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'success',
            })
        } catch (error) {
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const updateLaneRequest = (tollData: TLanes) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest('put', 'lane/update/', tollData)
            dispatch(updateLanes(data.data))
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

export const deleteLaneRequest = (tollData: TLanes) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest('put', 'lane/update/', tollData)
            dispatch(updateLanes(data.data))
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
