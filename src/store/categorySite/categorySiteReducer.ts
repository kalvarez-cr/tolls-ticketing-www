import { AnyAction } from 'redux'
import { CategorySiteProps } from 'types'
// /import { mockToll } from '_mockApis/toll/mockToll'

const categorySiteReducer = (
    state: Array<CategorySiteProps> | undefined = [],
    action: AnyAction
) => {
    switch (action.type) {
        case 'LIST_CATEGORY_SITE':
            return action.payload
        case 'ADD_CATEGORY_SITE':
            return [...state, action.payload]
        case 'UPDATE_CATEGORY_SITE': {
            const updateCategorySite = state.filter(
                (category) => category?.id !== action.payload.id
            )

            return [action.payload, ...updateCategorySite]
        }
        case 'DELETE_CATEGORY_SITE': {
            const deleteCategorySite = state.filter(
                (category) => category?.id !== action.payload.id
            )
            return [...deleteCategorySite]
        }
        default:
            return state
    }
}

export default categorySiteReducer
