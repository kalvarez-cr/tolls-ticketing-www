import { AnyAction } from 'redux'
import { employees } from 'types'
import { removeByKey, uniqueKeys } from 'utils/utils'
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
            const itemsUpdated = action.payload
            let updatedIds = uniqueKeys(itemsUpdated, 'id')
            const notUpdatedItems = removeByKey(state, 'id', updatedIds)
            return [...itemsUpdated, ...notUpdatedItems]
        }
        default:
            return state
    }
}

export default CategoryReducer
