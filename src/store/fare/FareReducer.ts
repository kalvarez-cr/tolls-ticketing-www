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
        case 'LIST_ALL_FARES':
            return action.payload
        case 'ADD_FARE':
            return [action.payload, ...state]
        case 'UPDATE_FARE': {
            const updateFare = state.filter(
                (fares) => fares?.id !== action.payload.id
            )
            return [action.payload, ...updateFare]
        }
        case 'DELETE_FARE': {
            const deleteFare = state.filter(
                (fares) => fares?.id !== action.payload.id
            )

            return [...deleteFare]
        }
        default:
            return state
    }
}

export default FareReducer
