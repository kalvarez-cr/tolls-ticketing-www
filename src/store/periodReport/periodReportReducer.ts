import { AnyAction } from 'redux'
import { Tperiod } from 'types'
// /import { mockToll } from '_mockApis/toll/mockToll'

const periodReportReducer = (
    state: Array<Tperiod> | undefined = [],
    action: AnyAction
) => {
    switch (action.type) {
        case 'LIST_PERIOD_REPORT':
            return action.payload
        // case 'ADD_TOLLS':
        //     const deleteFleet = state.filter(
        //         (cards) => cards?.id !== action.payload._id
        //     )
        //     return [action.payload, ...deleteFleet]
        // case 'UPDATE_TOLLS': {
        //     const deleteFleet = state.filter(
        //         (cards) => cards?.id !== action.payload._id
        //     )
        //     return [action.payload, ...deleteFleet]
        // }
        default:
            return state
    }
}

export default periodReportReducer
