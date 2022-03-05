// import { SNACKBAR_OPEN } from 'store/actions'
// import { axiosRequest } from 'store/axios'
// import { TCardsProps } from 'types/index'

export const listTolls = (payload) => ({
    type: 'LIST_TOLLS',
    payload,
})

export const addTolls = (payload) => ({
    type: 'ADD_TOLLS',
    payload,
})

export const updateTolls = (payload) => ({
    type: 'UPDATE_TOLLS',
    payload,
})
// const snackbarOpen = (message, type ) => {
//     return {
//         type: SNACKBAR_OPEN,
//         open: true,
//         message: message,
//         anchorOrigin: { vertical: 'top', horizontal: 'right' },
//         variant: 'alert',
//         alertSeverity: type,
//     }
// }

// async request
// export const getCardsRequest = () => {
//     return async (dispatch) => {
//         try {
//         //     const { data } = await axiosRequest('post', 'card_category/get/', {
//         //         _all_: true,
//         //     })
//             // if(data.message === 'Operación Exitosa')
//             dispatch(snackbarOpen('Reporte creado con exito', 'success'))
//         } catch (error) {
//             dispatch(snackbarOpen('Reporte creado con exito', 'error'))
//         }
//     }
// }

// export const createCardsRequest = (cardsData: TCardsProps) => {
//     return async (dispatch) => {
//         try{

//             console.log('cardsData', cardsData)
//             const { data } = await axiosRequest('post', 'card_category/create/', cardsData)

//             dispatch(addCards( data.content))
//             dispatch({
//                 type: SNACKBAR_OPEN,
//                 open: true,
//                 message: 'Tarjeta creada correctamente',
//                 anchorOrigin: { vertical: 'top', horizontal: 'right' },
//                 variant: 'alert',
//                 alertSeverity: 'success',
//             })
//         } catch (error) {
//             dispatch({
//                 type: SNACKBAR_OPEN,
//                 open: true,
//                 message: 'Error de conexion',
//                 anchorOrigin: { vertical: 'top', horizontal: 'right' },
//                 variant: 'alert',
//                 alertSeverity: 'error',
//             })
//         }
//     }
// }

// export const updateCardsRequest = (cardsData: TCardsProps) => {
//     return async (dispatch) => {
//         try {
//             const { data } = await axiosRequest('put', 'card_category/update/', cardsData)
//             dispatch(updateCards(data.content))
//             dispatch({
//                 type: SNACKBAR_OPEN,
//                 open: true,
//                 message: 'Tarjeta actualizada correctamente',
//                 anchorOrigin: { vertical: 'top', horizontal: 'right' },
//                 variant: 'alert',
//                 alertSeverity: 'success',
//             })
//         } catch (error) {
//             console.log('error update ', error)

//             dispatch({
//                 type: SNACKBAR_OPEN,
//                 open: true,
//                 message: 'Error de conexion',
//                 anchorOrigin: { vertical: 'top', horizontal: 'right' },
//                 variant: 'alert',
//                 alertSeverity: 'error',
//             })
//         }
//     }
// }
