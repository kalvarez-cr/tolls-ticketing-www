import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
import { employees } from 'types'
import { listCountPage } from 'store/commons/commonsActions'

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
    type: 'DELETE_EMPLOYEES2',
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
            dispatch(listCountPage(data.count_page))

            // dispatch(snackbarOpen('Operación exitosa', 'success'))
        } catch (error) {
            dispatch(listEmployee([]))
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const createAllEmployeesRequest = (tollData: employees) => {
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

export const updateAllEmployeesRequest = (tollData: employees) => {
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

export const deleteEmployeesRequest = (tollData: employees) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'put',
                'employee/update/',
                tollData
            )
            console.log(data)
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
            console.log('==============>', error)
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}
