import { AnyAction } from 'redux'

const transitReducer = (
    state: Array<any> | undefined = [],
    action: AnyAction
) => {
    switch (action.type) {
        case 'LIST_TRANSIT_DETAILS':
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

export default transitReducer
