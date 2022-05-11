import { AnyAction } from 'redux'
import { accountHolder } from 'types'
// /import { mockToll } from '_mockApis/toll/mockToll'

const AccountHolderReducer = (
    state: Array<accountHolder> | undefined = [],
    action: AnyAction
) => {
    switch (action.type) {
        case 'LIST_ACCOUNT_HOLDER':
            return action.payload
        case 'ADD_ACCOUNT_HOLDER':
            const deleteFleet = state.filter(
                (cards) => cards?.id !== action.payload._id
            )
            return [action.payload, ...deleteFleet]
        case 'UPDATE_ACCOUNT_HOLDER': {
            const deleteFleet = state.filter(
                (cards) => cards?.id !== action.payload._id
            )
            return [action.payload, ...deleteFleet]
        }
        default:
            return state
    }
}

export default AccountHolderReducer
