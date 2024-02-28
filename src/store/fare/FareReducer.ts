import { AnyAction } from 'redux'
import { fare } from 'types'
import { removeByKey, uniqueKeys } from 'utils/utils'
// /import { mockToll } from '_mockApis/toll/mockToll'

const FareReducer = (
    state: Array<fare> | undefined = [],
    action: AnyAction
) => {
    switch (action.type) {
        case 'LIST_FARE':
            return action.payload
        case 'LIST_ALL_FARES':
            return action.payload
        case 'ADD_FARE':
            return [action.payload, ...state]
        case 'UPDATE_FARE': {
            // const itemsUpdated = action.payload
            const itemsUpdated = typeof action.payload === 'object' ? [{...action.payload}] : action.payload
            let updatedIds = uniqueKeys(itemsUpdated, 'id')
            const notUpdatedItems = removeByKey(state, 'id', updatedIds)
            return [...itemsUpdated, ...notUpdatedItems]
        }
        case 'DELETE_FARE': {
            // const deleteRecords = action.payload;
            const deleteRecords = typeof action.payload === 'object' ? [{...action.payload}] : action.payload
            let deleteRecordsId = uniqueKeys(deleteRecords, "id");
            const result = removeByKey(state, "id", deleteRecordsId);
            return [...result];
        }
        case 'UPDATE_FARE_GENERAL':
            return [action.payload, ...state]
        default:
            return state
    }
}

export default FareReducer
