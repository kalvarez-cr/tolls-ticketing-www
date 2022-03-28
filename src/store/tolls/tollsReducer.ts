import { AnyAction } from 'redux'
import { TTollsSite } from 'types'
// /import { mockToll } from '_mockApis/toll/mockToll'

const tollsReducer = (
    state: Array<TTollsSite> | undefined = [],
    action: AnyAction
) => {
    switch (action.type) {
        case 'LIST_TOLLS':
            return action.payload
        case 'ADD_TOLLS':
            const deleteFleet = state.filter(
                (cards) => cards?.id !== action.payload._id
            )
            return [action.payload, ...deleteFleet]
        case 'UPDATE_TOLLS': {
            const deleteFleet = state.filter(
                (cards) => cards?.id !== action.payload._id
            )
            return [action.payload, ...deleteFleet]
        }
        default:
            return state
    }
}

export default tollsReducer
