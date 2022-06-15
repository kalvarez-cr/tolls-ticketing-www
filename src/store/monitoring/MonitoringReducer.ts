import { AnyAction } from 'redux'
import { monitoring } from 'types'
// /import { mockToll } from '_mockApis/toll/mockToll'

const MonitoringReducer = (
    state: Array<monitoring> | undefined = [],
    action: AnyAction
) => {
    switch (action.type) {
        case 'LIST_MONITORING':
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

export default MonitoringReducer
