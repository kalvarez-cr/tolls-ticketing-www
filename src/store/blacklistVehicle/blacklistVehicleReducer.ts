import { AnyAction } from 'redux'
import { VehicleBlacklist } from 'types'
// /import { mockToll } from '_mockApis/toll/mockToll'

const blacklistVehicleReducer = (
    state: Array<VehicleBlacklist> | undefined = [],
    action: AnyAction
) => {
    switch (action.type) {
        case 'LIST_BLACKLIST_VEHICLE':
            return action.payload
        case 'ADD_BLACKLIST_VEHICLE':
            return [...state, action.payload]
        case 'UPDATE_BLACKLIST_VEHICLE': {
            const updateBlacklist = state.filter(
                (employee) => employee?.id !== action.payload.id
            )

            return [action.payload, ...updateBlacklist]
        }
        case 'DELETE_BLACKLIST_VEHICLE': {
            const deleteBlacklist = state.filter(
                (employees) => employees?.id !== action.payload.id
            )
            return [...deleteBlacklist]
        }
        default:
            return state
    }
}

export default blacklistVehicleReducer
