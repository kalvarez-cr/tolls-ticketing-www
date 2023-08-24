import { AnyAction } from 'redux'
import { ServicesProps } from 'types'
import { removeByKey, uniqueKeys } from 'utils/utils'
// /import { mockToll } from '_mockApis/toll/mockToll'

const servicesReducer = (
    state: Array<ServicesProps> | undefined = [],
    action: AnyAction
) => {
    switch (action.type) {
        case 'LIST_SERVICES':
            return action.payload
        case 'ADD_SERVICES':
            return [...state, action.payload]
            case 'UPDATE_SERVICES': {
                // const itemsUpdated = action.payload
                const itemsUpdated = typeof action.payload === 'object' ? [{...action.payload}] : action.payload
                let updatedIds = uniqueKeys(itemsUpdated, 'id')
                const notUpdatedItems = removeByKey(state, 'id', updatedIds)
                return [...itemsUpdated, ...notUpdatedItems]
            }
            case 'DELETE_SERVICES': {
                // const deleteRecords = action.payload;
                const deleteRecords = typeof action.payload === 'object' ? [{...action.payload}] : action.payload
                let deleteRecordsId = uniqueKeys(deleteRecords, "id");
                const result = removeByKey(state, "id", deleteRecordsId);
                return [...result];
            }
        default:
            return state
    }
}

export default servicesReducer
