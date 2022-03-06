import { AnyAction } from 'redux'
import { mockToll } from '_mockApis/toll/mockToll'

const tollsReducer = (state: any | undefined = mockToll, action: AnyAction) => {
    switch (action.type) {
        case 'LIST_TOLLS':
            return action.payload
        case 'ADD_TOLLS':
            return [action.payload, ...state]
        case 'UPDATE_TOLLS': {
            const deleteFleet = state.filter(
                (cards) => cards?.id !== action.payload.id
            )
            return [action.payload, ...deleteFleet]
        }
        default:
            return state
    }
}

export default tollsReducer
