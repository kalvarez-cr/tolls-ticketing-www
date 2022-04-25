import { AnyAction } from 'redux'
import { fare } from 'types'
// /import { mockToll } from '_mockApis/toll/mockToll'

const FareReducer = (
    state: Array<fare> | undefined = [],
    action: AnyAction
) => {
    switch (action.type) {
        case 'LIST_FARE':
            return action.payload
        case 'ADD_FARE':
            return [action.payload, ...state]
        case 'UPDATE_FARE': {
            const deleteFleet = state.filter(
                (cards) => cards?.id !== action.payload._id
            )
            return [action.payload, ...deleteFleet]
        }
        default:
            return state
    }
}

export default FareReducer
