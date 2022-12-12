import { AnyAction } from 'redux'
import { blacklist } from 'types'
// /import { mockToll } from '_mockApis/toll/mockToll'

const blacklistReducer = (
    state: Array<blacklist> | undefined = [],
    action: AnyAction
) => {
    switch (action.type) {
        case 'LIST_BLACKLIST':
            return action.payload
        case 'ADD_BLACKLIST':
            return [...state, action.payload]
        case 'UPDATE_BLACKLIST': {
            const updateBlacklist = state.filter(
                (employee) => employee?.id !== action.payload.id
            )

            return [action.payload, ...updateBlacklist]
        }
        case 'DELETE_BLACKLIST': {
            const deleteBlacklist = state.filter(
                (employees) => employees?.id !== action.payload.id
            )
            return [...deleteBlacklist]
        }
        default:
            return state
    }
}

export default blacklistReducer
