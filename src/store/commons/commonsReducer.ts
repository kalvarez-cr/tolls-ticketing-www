import { AnyAction } from 'redux'
import { TCommons } from 'types'

const commonsReducer = (
    state: TCommons = { countPage: 0 },
    action: AnyAction
) => {
    switch (action.type) {
        case 'LIST_COUNT_PAGE':
            return { ...state, countPage: action.payload }
        default:
            return state
    }
}

export default commonsReducer
