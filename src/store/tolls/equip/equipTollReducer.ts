import { AnyAction } from 'redux'
import { TEquips } from 'types'
import { removeByKey, uniqueKeys } from 'utils/utils'

// /import { mockToll } from '_mockApis/toll/mockToll'

const equipTollReducer = ( state: Array<TEquips> | undefined = [], action: AnyAction) => {
    switch (action.type) {
      
        case 'LIST_EQUIP':
            return action.payload
        
        case 'ADD_EQUIP':
            return [...state, action.payload]
        case 'UPDATE_EQUIP': {
             // const itemsUpdated = action.payload
             const itemsUpdated = typeof action.payload === 'object' ? [{...action.payload}] : action.payload
             let updatedIds = uniqueKeys(itemsUpdated, 'id')
             const notUpdatedItems = removeByKey(state, 'id', updatedIds)
             return [...itemsUpdated, ...notUpdatedItems]
        }

        case 'DELETE_EQUIP': {
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

export default equipTollReducer
