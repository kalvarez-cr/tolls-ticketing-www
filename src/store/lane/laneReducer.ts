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

        default:
            return state
    }
}

export default laneReducer
