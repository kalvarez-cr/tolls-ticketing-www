import { AnyAction } from 'redux'
import { LiquidationConfigProps } from 'types'
// /import { mockToll } from '_mockApis/toll/mockToll'

const liquidationConfigReducer = (
    state: Array<LiquidationConfigProps> | undefined = [],
    action: AnyAction
) => {
    switch (action.type) {
        case 'LIST_LIQUIDATION_CONFIG':
            return action.payload
        case 'ADD_LIQUIDATION_CONFIG':
            return [...state, action.payload]
        case 'UPDATE_LIQUIDATION_CONFIG': {
            const updateliquidationConfig = state.filter(
                (employee) => employee?.id !== action.payload.id
            )

            return [action.payload, ...updateliquidationConfig]
        }
        case 'DELETE_LIQUIDATION_CONFIG': {
            const deleteLiquidationConfig = state.filter(
                (employees) => employees?.id !== action.payload.id
            )
            return [...deleteLiquidationConfig]
        }
        default:
            return state
    }
}

export default liquidationConfigReducer
