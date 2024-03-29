import { AnyAction } from 'redux'
import { CompanyProps } from 'types'
import { removeByKey, uniqueKeys } from "../../utils/utils";
// /import { mockToll } from '_mockApis/toll/mockToll'

const companyReducer = (
    state: Array<CompanyProps> | undefined = [],
    action: AnyAction
) => {
    switch (action.type) {
        case 'LIST_COMPANIES':
            return action.payload
        case 'ADD_COMPANIES':
            return [...state, action.payload]
        case 'UPDATE_COMPANIES': {
            // // const itemsUpdated = action.payload;
            const itemsUpdated = typeof action.payload === 'object' ? [{...action.payload}] : action.payload
            const updatedIds = uniqueKeys(itemsUpdated, "id");
            const notUpdatedItems = removeByKey(state, "id", updatedIds);
            return [ ...notUpdatedItems, ...itemsUpdated];
            
        }
        case 'DELETE_COMPANIES': {
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

export default companyReducer
