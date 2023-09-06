import { AnyAction } from 'redux'
import { removeByKey, uniqueKeys } from 'utils/utils';

// /import { mockToll } from '_mockApis/toll/mockToll'

const employeeTollReducer = (state: any = [], action: AnyAction) => {
    switch (action.type) {
      

        case 'DELETE_EMPLOYEES': {
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

export default employeeTollReducer
