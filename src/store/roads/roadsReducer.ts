import { AnyAction } from 'redux'
import { RoadsProps } from 'types'
// /import { mockToll } from '_mockApis/toll/mockToll'

const roadsReducer = (
    state: Array<RoadsProps> | undefined = [],
    action: AnyAction
) => {
    switch (action.type) {
        case 'LIST_ROADS':
            return action.payload
        case 'ADD_ROADS':
            return [...state, action.payload]
        case 'UPDATE_ROADS': {
            const updateRoad = state.filter(
                (road) => road?.id !== action.payload.id
            )

            return [action.payload, ...updateRoad]
        }
        case 'DELETE_ROADS': {
            const deleteRoad = state.filter(
                (road) => road?.id !== action.payload.id
            )
            return [...deleteRoad]
        }
        default:
            return state
    }
}

export default roadsReducer
