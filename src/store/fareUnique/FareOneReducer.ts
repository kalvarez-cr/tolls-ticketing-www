import { AnyAction } from 'redux'
import { fares } from 'types'
// /import { mockToll } from '_mockApis/toll/mockToll'

const FareOneReducer = (
    state: Array<fares> | undefined = [],
    action: AnyAction
) => {
    switch (action.type) {
        case 'LIST_ALL_FARES':
            return action.payload
        // case 'ADD_FARE':
        //     return [action.payload, ...state]
        // case 'UPDATE_FARE': {
        //     const deleteFleet = state.filter(
        //         (cards) => cards?.id !== action.payload._id
        //     )
        //     return [action.payload, ...deleteFleet]
        // }
        default:
            return state
    }
}

export default FareOneReducer
