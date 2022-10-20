import { AnyAction } from 'redux'
import { employees } from 'types'
// /import { mockToll } from '_mockApis/toll/mockToll'

const employeeReducer = (
    state: Array<employees> | undefined = [],
    action: AnyAction
) => {
    switch (action.type) {
        case 'LIST_EMPLOYEES':
            return action.payload
        case 'ADD_EMPLOYEES':
            return [action.payload, ...state]
        case 'UPDATE_EMPLOYEES': {
            const updateEmployee = state.filter(
                (employee) => employee?.id !== action.payload.id
            )

            return [action.payload, ...updateEmployee]
        }
        case 'DELETE_EMPLOYEES2': {
            const deleteEmployees = state.filter(
                (employees) => employees?.id !== action.payload.id
            )
            return [...deleteEmployees]
        }
        default:
            return state
    }
}

export default employeeReducer
