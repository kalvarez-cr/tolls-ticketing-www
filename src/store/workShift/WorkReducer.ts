import { AnyAction } from 'redux'
import { workRes } from 'types'
// /import { mockToll } from '_mockApis/toll/mockToll'

const WorkReducer = (
    state: Array<workRes> | undefined = [],
    action: AnyAction
) => {
    switch (action.type) {
        case 'LIST_WORK_REPORT':
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

export default WorkReducer
