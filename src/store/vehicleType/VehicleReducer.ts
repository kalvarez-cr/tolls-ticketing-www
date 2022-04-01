import { AnyAction } from 'redux'
import { SaleTag } from 'types'
// /import { mockToll } from '_mockApis/toll/mockToll'

const VehicleTypeReducer = (
    state: Array<SaleTag> | undefined = [],
    action: AnyAction
) => {
    switch (action.type) {
        case 'LIST_VEHICLE':
            return action.payload
        case 'ADD_TAG':
            const deleteFleet = state.filter(
                (cards) => cards?.id !== action.payload._id
            )
            return [action.payload, ...deleteFleet]
        case 'UPDATE_TAG': {
            const deleteFleet = state.filter(
                (cards) => cards?.id !== action.payload._id
            )
            return [action.payload, ...deleteFleet]
        }
        default:
            return state
    }
}

export default VehicleTypeReducer
