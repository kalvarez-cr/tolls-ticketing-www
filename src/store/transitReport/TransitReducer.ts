import { AnyAction } from 'redux'
import { transitRes } from 'types'
// /import { mockToll } from '_mockApis/toll/mockToll'

const TransitReducer = (
    state: Array<transitRes> | undefined = [],
    action: AnyAction
) => {
    switch (action.type) {
        case 'LIST_TRANSIT_REPORT':
            return action.payload
        // case 'ADD_ACCOUNTS':
        //     const deleteFleet = state.filter(
        //         (cards) => cards?.id !== action.payload._id
        //     )
        //     return [action.payload, ...deleteFleet]
        // case 'UPDATE_ACCOUNTS': {
        //     const deleteFleet = state.filter(
        //         (cards) => cards?.id !== action.payload._id
        //     )
        //     return [action.payload, ...deleteFleet]
        // }
        default:
            return state
    }
}

export default TransitReducer
