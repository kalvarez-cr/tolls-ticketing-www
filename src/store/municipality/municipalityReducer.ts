import { AnyAction } from 'redux'
import { municipality } from 'types'
// /import { mockToll } from '_mockApis/toll/mockToll'

const municipalityReducer = (
    state: Array<municipality> | undefined = [],
    action: AnyAction
) => {
    switch (action.type) {
        case 'LIST_MUNICIPIES':
            return action.payload
        // case 'ADD_TOLLS':
        //     const deleteFleet = state.filter(
        //         (cards) => cards?.id !== action.payload._id
        //     )
        //     return [action.payload, ...deleteFleet]
        // case 'UPDATE_TOLLS': {
        //     const deleteFleet = state.filter(
        //         (cards) => cards?.id !== action.payload._id
        //     )
        //     return [action.payload, ...deleteFleet]
        // }
        default:
            return state
    }
}

export default municipalityReducer
