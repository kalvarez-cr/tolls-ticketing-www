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
            return [action.payload, ...state]
        case 'UPDATE_CATEGORY': {
            const deleteCategory = state.filter(
                (cards) => cards?.id !== action.payload._id
            )
            return [action.payload, ...deleteCategory]
        }
        default:
            return state
    }
}

export default CategoryReducer
