import { AnyAction } from 'redux'
import { TagList } from 'types'
// /import { mockToll } from '_mockApis/toll/mockToll'

const taglistReducer = (
    state: Array<TagList> | undefined = [],
    action: AnyAction
) => {
    switch (action.type) {
        case 'LIST_TAGLIST':
            return action.payload
        case 'ADD_TAGLIST':
            return [...state, action.payload]
        case 'UPDATE_TAGLIST': {
            const updateBlacklist = state.filter(
                (employee) => employee?.id !== action.payload.id
            )

            return [action.payload, ...updateBlacklist]
        }
        case 'DELETE_TAGLIST': {
            const deleteBlacklist = state.filter(
                (employees) => employees?.id !== action.payload.id
            )
            return [...deleteBlacklist]
        }
        default:
            return state
    }
}

export default taglistReducer
