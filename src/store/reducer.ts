import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// reducer import
import customizationReducer from './customizationReducer'
import snackbarReducer from './snackbarReducer'
import cartReducer from './cartReducer'
import loginReducer from './login/loginReducer'
import tollsReducer from './tolls/tollsReducer'
import laneReducer from './lane/laneReducer'
import saleTagReducer from './saleTag/saleTagReducer'
import tollReducer from './toll/tollReducer'
import employeeReducer from './employee/employeeReducer'
import AccountReducer from './gestionCuentas/AccountReducer'
import VehicleTypeReducer from './vehicleType/VehicleReducer'

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    login: loginReducer,
    customization: customizationReducer,
    snackbar: snackbarReducer,
    tolls: tollsReducer,
    lanes: laneReducer,
    saleTag: saleTagReducer,
    toll: tollReducer,
    employee: employeeReducer,
    account: AccountReducer,
    Tvehicle: VehicleTypeReducer,

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
