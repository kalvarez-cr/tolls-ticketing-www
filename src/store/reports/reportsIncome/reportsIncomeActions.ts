import { SNACKBAR_OPEN } from 'store/actions'
// import { axiosRequest } from 'store/axios'
import { TIncomeReports } from 'types/index'

export const ListDetailsReportsIncome= (payload) => ({
    type: 'LIST_DETAILS_REPORTS_INCOME',
    payload,
})

// export const addCards = (payload) => ({
//     type: 'ADD_CARDS',
//     payload,
// })

// export const updateCards = (payload) => ({
//     type: 'UPDATE_CARDS',
//     payload,
// })
const snackbarOpen = (message, type ) => {
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

export const getDetailsReportsIncomeRequest = ( item: TIncomeReports) => {
    return async (dispatch) => {
        try {
            
            // const { data }  = await axiosRequest('post', 'report/send_report/' , item)
            // console.log("html",data)
            // if(data.message === 'Operación Exitosa'){
            dispatch(ListDetailsReportsIncome({}))
            dispatch(snackbarOpen('Reporte creado con exito', 'success'))
        } catch (error) {
            dispatch(snackbarOpen('Error de conexion', 'error'))
        }
    }
}



