import { AnyAction } from 'redux'
import { account } from 'types'
// /import { mockToll } from '_mockApis/toll/mockToll'

const AccountReducer = (
    state: Array<account> | undefined = [],
    action: AnyAction
) => {
    switch (action.type) {
        case 'LIST_ACCOUNT':
            return action.payload
        case 'ADD_ACCOUNTS':
            const deleteFleet = state.filter(
                (cards) => cards?.id !== action.payload._id
            )
            return [...deleteFleet, action.payload]
        case 'UPDATE_ACCOUNTS': {
            const deleteFleet = state.filter(
                (cards) => cards?.id !== action.payload._id
            )
            return [...deleteFleet, action.payload]
        }
        case 'DELETE_ACCOUNTS': {
            const deleteAccounts = state.filter(
                (accounts) => accounts?.id !== action.payload.id
            )
            return [...deleteAccounts]
        }
        default:
            return state
    }
}

export default AccountReducer
