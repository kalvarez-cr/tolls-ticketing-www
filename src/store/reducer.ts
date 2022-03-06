import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// reducer import
import customizationReducer from './customizationReducer'
import snackbarReducer from './snackbarReducer'
import cartReducer from './cartReducer'
import loginReducer from './login/loginReducer'
import tollsReducer from './tolls/tollsReducer'

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    login: loginReducer,
    customization: customizationReducer,
    snackbar: snackbarReducer,
    tolls: tollsReducer,

    cart: persistReducer(
        {
            key: 'cart',
            storage,
            keyPrefix: 'berry-',
        },
        cartReducer
    ),
})

export default reducer
