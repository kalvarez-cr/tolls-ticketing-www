// import { SNACKBAR_OPEN } from 'store/actions'
// import { axiosRequest } from 'store/axios'
// import { TCardsProps } from 'types/index'

import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
import { employees } from 'types'

export const listEmployee = (payload) => ({
    type: 'LIST_EMPLOYEES',
    payload,
})

export const addEmployee = (payload) => ({
    type: 'ADD_EMPLOYEES',
    payload,
})

export const updateEmployee = (payload) => ({
    type: 'UPDATE_EMPLOYEES',
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
export const getEmployeesRequest = () => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest('post', 'employee/get/', {
                _all_: true,
            })
            dispatch(listEmployee(data.data))

            dispatch(snackbarOpen('Operación exitosa', 'success'))
        } catch (error) {
            dispatch(snackbarOpen('Error de conexión', 'error'))
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
                message: 'Empleado actualizado exitoso',
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
