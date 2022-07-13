import { AnyAction } from 'redux'
import { filter } from 'types'

const FilteredReducer = (
    state: Array<filter> | undefined = [],
    action: AnyAction
) => {
    switch (action.type) {
        case 'LIST_FILTERED_DATA':
            return action.payload
        default:
            return state
    }
}

export default FilteredReducer
