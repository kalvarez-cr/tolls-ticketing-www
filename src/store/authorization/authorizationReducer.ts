import { AnyAction } from 'redux'
import { TAthorization } from 'types'
// /import { mockToll } from '_mockApis/toll/mockToll'

const authorizationReducer = (
    state: Array<TAthorization> | undefined = [],
    action: AnyAction
) => {
    switch (action.type) {
        case 'LIST_CODE':
            return action.payload
        // case 'ADD_TOLLS':
        //     const deleteFleet = state.filter(
        //         (cards) => cards?.id !== action.payload._id
        //     )
        //     return [action.payload, ...deleteFleet]
        // case 'UPDATE_TOLLS': {
        //     const deleteFleet = state.filter(
        //         (cards) => cards?.id !== action.payload._id
        //     )
        //     return [action.payload, ...deleteFleet]
        // }
        default:
            return state
    }
}

export default authorizationReducer
