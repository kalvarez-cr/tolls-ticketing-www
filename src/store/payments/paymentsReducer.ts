import { AnyAction } from 'redux'
import { PaymentsProps } from 'types'
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
            const updatePayments = state.filter(
                (employee) => employee?.id !== action.payload.id
            )

            return [action.payload, ...updatePayments]
        }
        case 'DELETE_PAYMENTS': {
            const deletePayments = state.filter(
                (employees) => employees?.id !== action.payload.id
            )
            return [...deletePayments]
        }
        default:
            return state
    }
}

export default paymentsReducer
