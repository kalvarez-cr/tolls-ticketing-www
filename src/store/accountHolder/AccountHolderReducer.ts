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
            return [...state, action.payload]
        case 'UPDATE_ACCOUNT_HOLDER': {
            const deleteAccount = state.filter(
                (cards) => cards?.id !== action.payload._id
            )
            return [...deleteAccount, action.payload]
        }

        case 'DELETE_ACCOUNT_HOLDER': {
            const deleteAccount = state.filter(
                (account) => account?.id !== action.payload.id
            )
            return [...deleteAccount]
        }
        default:
            return state
    }
}

export default AccountHolderReducer
