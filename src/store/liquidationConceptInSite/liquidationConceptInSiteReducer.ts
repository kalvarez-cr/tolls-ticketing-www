import { AnyAction } from 'redux'
import { liquidationConceptRecept } from 'types'
// /import { mockToll } from '_mockApis/toll/mockToll'

const liquidationConceptInSiteReducer = (
    state: Array<liquidationConceptRecept> | undefined = [],
    action: AnyAction
) => {
    switch (action.type) {
        case 'LIST_LIQUIDATION_CONCEPT':
            return action.payload
        case 'ADD_LIQUIDATION_CONCEPT':
            return [...state, action.payload]
        case 'UPDATE_LIQUIDATION_CONCEPT': {
            const updateliquidationConfig = state.filter(
                (employee) => employee?.id !== action.payload.id
            )

            return [action.payload, ...updateliquidationConfig]
        }
        case 'DELETE_LIQUIDATION_CONCEPT': {
            const deleteLiquidationConfig = state.filter(
                (employees) => employees?.id !== action.payload.id
            )
            return [...deleteLiquidationConfig]
        }
        default:
            return state
    }
}

export default liquidationConceptInSiteReducer
