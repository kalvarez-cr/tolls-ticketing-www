import { AnyAction } from 'redux'

const generateReportReducer = (
    state: Array<any> | undefined = [],
    action: AnyAction
) => {
    switch (action.type) {
        case 'LIST_GENERATE_REPORT':
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

export default generateReportReducer
