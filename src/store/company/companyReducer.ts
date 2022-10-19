import { AnyAction } from 'redux'
import { employees } from 'types'
// /import { mockToll } from '_mockApis/toll/mockToll'

const companyReducer = (
    state: Array<employees> | undefined = [],
    action: AnyAction
) => {
    switch (action.type) {
        case 'LIST_COMPANIES':
            return action.payload
        case 'ADD_COMPANIES':
            return [action.payload, ...state]
        case 'UPDATE_COMPANIES': {
            const updateCompany = state.filter(
                (employee) => employee?.id !== action.payload.id
            )

            return [action.payload, ...updateCompany]
        }
        case 'DELETE_COMPANIES': {
            const deleteCompany = state.filter(
                (employees) => employees?.id !== action.payload.id
            )
            return [...deleteCompany]
        }
        default:
            return state
    }
}

export default companyReducer
