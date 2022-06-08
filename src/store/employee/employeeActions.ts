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

export const deleteEmployee = (payload) => ({
    type: 'DELETE_EMPLOYEES',
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
export const getEmployeesRequest = (body) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest('post', 'employee/get/', body)
            dispatch(listEmployee(data.data))

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
            console.log('data', data.data)

            // dispatch(addEmployee(data.data))
            // dispatch({
            //     type: SNACKBAR_OPEN,
            //     open: true,
            //     message: 'Empleado creado correctamente',
            //     anchorOrigin: { vertical: 'top', horizontal: 'right' },
            //     variant: 'alert',
            //     alertSeverity: 'success',
            // })
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
            console.log(data)
            // dispatch(updateEmployee(data.data))
            // dispatch({
            //     type: SNACKBAR_OPEN,
            //     open: true,
            //     message: 'Actualización exitosa',
            //     anchorOrigin: { vertical: 'top', horizontal: 'right' },
            //     variant: 'alert',
            //     alertSeverity: 'success',
            // })
        } catch (error) {
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const deleteEmployeesRequest = (tollData: employees) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'put',
                'employee/update/',
                tollData
            )
            console.log(tollData)
            dispatch(deleteEmployee(data.data))
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
