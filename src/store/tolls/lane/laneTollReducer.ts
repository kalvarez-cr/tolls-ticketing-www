import { AnyAction } from 'redux'
import { TLanes } from 'types'
import { removeByKey, uniqueKeys } from 'utils/utils'

// /import { mockToll } from '_mockApis/toll/mockToll'

const laneTollReducer = ( state: Array<TLanes> | undefined = [], action: AnyAction) => {
    switch (action.type) {
        case 'LIST_LANES':
            return action.payload
        case 'LIST_STATE_LANES':
            return action.payload
        
        case 'ADD_LANES':
            return [...state, action.payload]
        case 'UPDATE_LANES': {
             // const itemsUpdated = action.payload
             const itemsUpdated = typeof action.payload === 'object' ? [{...action.payload}] : action.payload
             let updatedIds = uniqueKeys(itemsUpdated, 'id')
             const notUpdatedItems = removeByKey(state, 'id', updatedIds)
             return [...itemsUpdated, ...notUpdatedItems]
        }

        case 'DELETE_LANES': {
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

export default laneTollReducer




















