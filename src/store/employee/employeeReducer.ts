import { AnyAction } from 'redux'
import { employees } from 'types'
import { removeByKey, uniqueKeys } from 'utils/utils'
// /import { mockToll } from '_mockApis/toll/mockToll'

const employeeReducer = (
    state: Array<employees> | undefined = [],
    action: AnyAction
) => {
    switch (action.type) {
        case 'LIST_EMPLOYEES':
            return action.payload
            case 'ADD_EMPLOYEES':
                return [action.payload, ...state]
            case 'UPDATE_EMPLOYEES': {
                
                // const itemsUpdated = action.payload
                const itemsUpdated = typeof action.payload === 'object' ? [{...action.payload}] : action.payload
                let updatedIds = uniqueKeys(itemsUpdated, 'id')
                const notUpdatedItems = removeByKey(state, 'id', updatedIds)
                return [...itemsUpdated, ...notUpdatedItems]
            }
            case 'DELETE_EMPLOYEES2': {
              
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

export default employeeReducer
