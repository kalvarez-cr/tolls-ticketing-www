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
            return [...state, action.payload.holder]
        case 'UPDATE_ACCOUNT_HOLDER': {
            const deleteAccount = state.filter(
                (cards) => cards?.id !== action.payload.id
            )
            return [...deleteAccount, action.payload]
        }

        case 'DELETE_ACCOUNT_HOLDER': {
            const deleteAccount = state.filter(
                (account) => account?.id !== action.payload[0].id
            )
            return [...deleteAccount]
        }

        case 'RECHARGE_ACCOUNT_HOLDER': {
            const accounts = state.filter(
                (account) =>
                    account?.account_number !== action.payload.account_number
            )
            const findAccount = state.find(
                (account) =>
                    account?.account_number == action.payload.account_number
            )
            const data = {
                nominal_balance: (
                    Number(findAccount?.account_detail?.nominal_balance) +
                    Number(action.payload.nominal_amount)
                ).toString(),
                account_iso_code: findAccount?.account_detail?.nominal_iso_code,
                last_use_tag: findAccount?.account_detail?.last_use_tag,
                last_use_date: findAccount?.account_detail?.last_use_date,
                status: findAccount?.account_detail?.status,
            }
            // @ts-ignore
            findAccount.account_detail = data
            return [findAccount, ...accounts]
        }

        case 'CANCEL_ACCOUNT_HOLDER': {
            const cancelAccount = state.filter(
                (account) =>
                    account?.account_number !== action.payload.account_number
            )

            return [action.payload, ...cancelAccount]
        }

        case 'BLOCK_ACCOUNT_HOLDER': {
            const blockAccount = state.filter(
                (account) =>
                    account?.account_number !== action.payload.account_number
            )
            return [action.payload, ...blockAccount]
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
