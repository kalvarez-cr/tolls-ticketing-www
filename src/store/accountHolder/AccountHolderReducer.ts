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
                (cards) => cards?.id !== action.payload.id
            )
            return [...deleteAccount, action.payload]
        }

        case 'DELETE_ACCOUNT_HOLDER': {
            const deleteAccount = state.filter(
                (account) => account?.id !== action.payload.id
            )
            return [...deleteAccount]
        }

        case 'ADD_ACCOUNT':
            //@ts-ignore
            const deleteAccountHolder = state.filter(
                (account) => account.id !== action.payload.userId
            )
            const accountHolder = state.find(
                (account) => account.id === action.payload.userId
            )
            const newAccountHolder = {
                ...accountHolder,
                //@ts-ignore
                vehicles: [...accountHolder?.vehicles, action.payload],
            }
            return [...deleteAccountHolder, newAccountHolder]

        case 'UPDATE_ACCOUNT': {
            //@ts-ignore
            const deleteAccountHolder = state.filter(
                (account) => account.id !== action.payload.userId
            )
            const accountHolder = state.find(
                (account) => account.id === action.payload.userId
            )
            const deleteVehicle = accountHolder?.vehicles?.filter(
                (vehicle) => vehicle.id !== action.payload.id
            )
            const newAccountHolder = {
                ...accountHolder,
                //@ts-ignore
                vehicles: [...deleteVehicle, action.payload],
            }

            return [...deleteAccountHolder, newAccountHolder]
        }

        case 'DELETE_ACCOUNT': {
            //@ts-ignore
            const deleteAccountHolder = state.filter(
                (account) => account.id !== action.payload.userId
            )
            const accountHolder = state.find(
                (account) => account.id === action.payload.userId
            )
            const deleteVehicle = accountHolder?.vehicles?.filter(
                (vehicle) => vehicle.id !== action.payload.id
            )
            const newAccountHolder = {
                ...accountHolder,
                //@ts-ignore
                vehicles: [...deleteVehicle],
            }

            return [...deleteAccountHolder, newAccountHolder]
        }
        default:
            return state
    }
}

export default AccountHolderReducer
