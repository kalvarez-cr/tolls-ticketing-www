import { AnyAction } from 'redux'
import { RESPONSE} from '_mockApis/summary_criterias/reports'

const reportsIncomeReducer = (state = RESPONSE, action: AnyAction) => {
    switch (action.type) {
        case 'LIST_DETAILS_REPORTS_INCOME':
            return action.payload
        // case 'ADD_DETAILS':
        //     return [action.payload, ...state]
        // case 'UPDATE_CARDS': {
        //     const deleteFleet = state.filter(
        //         (cards) =>
        //             cards?.id !== action.payload.id
        //     )
        //     return [action.payload, ...deleteFleet ]
        // }
        default:
            return state
    }
}

export default reportsIncomeReducer