import { AnyAction } from 'redux'
import { TLanes } from 'types'
// /import { mockToll } from '_mockApis/toll/mockToll'

const laneReducer = (
    state: Array<TLanes> | undefined = [],
    action: AnyAction
) => {
    switch (action.type) {
        case 'LIST_LANES':
            return action.payload
        case 'LIST_STATE_LANES':
            return action.payload

        case 'ADD_LANES':
            const deleteFleet = state.filter(
                (cards) => cards?.id !== action.payload.id
            )
            return [action.payload, ...deleteFleet]
        case 'UPDATE_LANES': {
            const deleteFleet = state.filter(
                (cards) => cards?.id !== action.payload.id
            )
            return [action.payload, ...deleteFleet]
        }

        case 'DELETE_LANES': {
            const deleteLane = state.filter(
                (cards) => cards?.id !== action.payload.id
            )
            return [...deleteLane]
        }
        default:
            return state
    }
}

export default laneReducer
