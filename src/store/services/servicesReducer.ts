import { AnyAction } from 'redux'
import { ServicesProps } from 'types'
// /import { mockToll } from '_mockApis/toll/mockToll'

const servicesReducer = (
    state: Array<ServicesProps> | undefined = [],
    action: AnyAction
) => {
    switch (action.type) {
        case 'LIST_SERVICES':
            return action.payload
        case 'ADD_SERVICES':
            return [...state, action.payload]
        case 'UPDATE_SERVICES': {
            const updateServices = state.filter(
                (service) => service?.id !== action.payload.id
            )

            return [action.payload, ...updateServices]
        }
        case 'DELETE_SERVICES': {
            const deleteServices = state.filter(
                (services) => services?.id !== action.payload.id
            )
            return [...deleteServices]
        }
        default:
            return state
    }
}

export default servicesReducer
