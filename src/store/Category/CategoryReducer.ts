import { AnyAction } from 'redux'
import { employees } from 'types'
// /import { mockToll } from '_mockApis/toll/mockToll'

const CategoryReducer = (
    state: Array<employees> | undefined = [],
    action: AnyAction
) => {
    switch (action.type) {
        case 'LIST_CATEGORY':
            return action.payload
        case 'ADD_CATEGORY':
            const deleteFleet = state.filter(
                (cards) => cards?.id !== action.payload._id
            )
            return [action.payload, ...deleteFleet]
        case 'UPDATE_CATEGORY': {
            const deleteFleet = state.filter(
                (cards) => cards?.id !== action.payload._id
            )
            return [action.payload, ...deleteFleet]
        }
        default:
            return state
    }
}

export default CategoryReducer
