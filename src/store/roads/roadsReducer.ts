import { AnyAction } from 'redux'
import { RoadsProps } from 'types'
import { removeByKey, uniqueKeys } from 'utils/utils'
// /import { mockToll } from '_mockApis/toll/mockToll'

const roadsReducer = (
    state: Array<RoadsProps> | undefined = [],
    action: AnyAction
) => {
    switch (action.type) {
        case 'LIST_ROADS':
            return action.payload
        case 'ADD_ROADS':
            return [...state, action.payload]
        case 'UPDATE_ROADS': {
            // const itemsUpdated = action.payload
            const itemsUpdated = typeof action.payload === 'object' ? [{...action.payload}] : action.payload
            let updatedIds = uniqueKeys(itemsUpdated, 'id')
            const notUpdatedItems = removeByKey(state, 'id', updatedIds)
            return [...itemsUpdated, ...notUpdatedItems]
        }
        case 'DELETE_ROADS': {
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

export default roadsReducer
