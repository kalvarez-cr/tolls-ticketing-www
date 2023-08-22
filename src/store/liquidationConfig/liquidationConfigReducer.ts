import { AnyAction } from 'redux'
import { LiquidationConfigProps } from 'types'
import { removeByKey, uniqueKeys } from 'utils/utils'
// /import { mockToll } from '_mockApis/toll/mockToll'

const liquidationConfigReducer = (
    state: Array<LiquidationConfigProps> | undefined = [],
    action: AnyAction
) => {
    switch (action.type) {
        case 'LIST_LIQUIDATION_CONFIG':
            return action.payload
        case 'ADD_LIQUIDATION_CONFIG':
            return [...state, action.payload]
        case 'UPDATE_LIQUIDATION_CONFIG': {
            const itemsUpdated = action.payload
            let updatedIds = uniqueKeys(itemsUpdated, 'id')
            const notUpdatedItems = removeByKey(state, 'id', updatedIds)
            return [...itemsUpdated, ...notUpdatedItems]
        }
        case 'DELETE_LIQUIDATION_CONFIG': {
            const deleteRecords = action.payload;
            let deleteRecordsId = uniqueKeys(deleteRecords, "id");
            const result = removeByKey(state, "id", deleteRecordsId);
            return [...result];
        }
        default:
            return state
    }
}

export default liquidationConfigReducer
