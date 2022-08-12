import { AnyAction } from 'redux'
import { takingsRes } from 'types'
// /import { mockToll } from '_mockApis/toll/mockToll'

const DetailReducer = (
    state: Array<takingsRes> | undefined = [],
    action: AnyAction
) => {
    switch (action.type) {
        case 'LIST_DETAILS':
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

export default DetailReducer
