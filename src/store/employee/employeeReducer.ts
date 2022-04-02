import { AnyAction } from 'redux'
import { employees } from 'types'
// /import { mockToll } from '_mockApis/toll/mockToll'

const employeeReducer = (
    state: Array<employees> | undefined = [],
    action: AnyAction
) => {
    switch (action.type) {
        case 'LIST_EMPLOYEES':
            return action.payload
        case 'ADD_EMPLOYEES':
            const deleteFleet = state.filter(
                (cards) => cards?.id !== action.payload._id
            )
            return [action.payload, ...deleteFleet]
        case 'UPDATE_EMPLOYEES': {
            const deleteFleet = state.filter(
                (cards) => cards?.id !== action.payload._id
            )
            return [action.payload, ...deleteFleet]
        }
        default:
            return state
    }
}

export default employeeReducer
