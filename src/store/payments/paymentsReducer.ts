import { AnyAction } from 'redux'
import { PaymentsProps } from 'types'
import { removeByKey, uniqueKeys } from 'utils/utils'
// /import { mockToll } from '_mockApis/toll/mockToll'

const paymentsReducer = (
    state: Array<PaymentsProps> | undefined = [],
    action: AnyAction
) => {
    switch (action.type) {
        case 'LIST_PAYMENTS':
            return action.payload
        case 'ADD_PAYMENTS':
            return [...state, action.payload]
        case 'UPDATE_PAYMENTS': {
            // const itemsUpdated = action.payload
            const itemsUpdated = typeof action.payload === 'object' ? [{...action.payload}] : action.payload
            let updatedIds = uniqueKeys(itemsUpdated, 'id')
            const notUpdatedItems = removeByKey(state, 'id', updatedIds)
            return [...itemsUpdated, ...notUpdatedItems]
        }
        case 'DELETE_PAYMENTS': {
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

export default paymentsReducer
