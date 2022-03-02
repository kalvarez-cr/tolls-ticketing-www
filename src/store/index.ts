import { createStore, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'
import reducer from './reducer'
import { compose } from 'redux'
import thunk from 'redux-thunk'
// import { GetCooskieWebConfig } from './loginActions'
// import { axiosRequest } from './axios'
// import { loginRequest } from './loginActions'
// // import { type } from 'os'
// import { SNACKBAR_OPEN } from './actions'
// import { logoutRequest } from './loginActions'

// ==============================|| REDUX - MAIN STORE ||============================== //

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))
const persister = persistStore(store)

// export const webConfigError= (payload: any) => {
//     return {
//         type: SNACKBAR_OPEN,
//         open: true,
//         message: 'Error de conexion',
//         anchorOrigin: { vertical: 'top', horizontal: 'right' },
//         variant: 'alert',
//         alertSeverity: 'error',
//     }
// }

// const middlewareWebConfig : any = ( ) => {
//     const isLoggedIn = localStorage.getItem('isLoggedIn')
//     if (window.performance) {
//         if (performance.navigation.type == 1 && isLoggedIn) {
//             return async function(dispatch){
//                 return await axiosRequest('get', 'get_cookie_web_config/',{ _all_: true })
//                     .then( result => dispatch(loginRequest(result.data)) )
//                     .catch( error =>  dispatch(webConfigError(error)) )
//             }
//         } else {
//             return async function(dispatch){
//                 return dispatch(logoutRequest({}))
//             }
//         }
//     }
// }

// store.dispatch()

export { store, persister }
