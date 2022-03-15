import { AnyAction } from 'redux'
import { mockToll } from '_mockApis/toll/mockToll'

const tollsReducer = (state: any | undefined = mockToll, action: AnyAction) => {
    switch (action.type) {
        case 'LIST_TOLLS':
            return action.payload
        case 'ADD_TOLLS':
            console.log(action.payload)
            const deleteFleet = state.filter(
                (cards) => cards?._id !== action.payload._id
            )
            return [action.payload, ...deleteFleet]
        case 'UPDATE_TOLLS': {
            const deleteFleet = state.filter(
                (cards) => cards?._id !== action.payload._id
            )
            return [action.payload, ...deleteFleet]
        }
        default:
            return state
    }
}

export default tollsReducer
