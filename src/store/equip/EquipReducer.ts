import { AnyAction } from 'redux'
import { TEquips } from 'types'
// /import { mockToll } from '_mockApis/toll/mockToll'

const EquipReducer = (
    state: Array<TEquips> | undefined = [],
    action: AnyAction
) => {
    switch (action.type) {
        case 'LIST_EQUIP':
            return action.payload
        case 'ADD_EQUIP':
            return [action.payload, ...state]
        case 'UPDATE_EQUIP': {
            const deleteFleet = state.filter(
                (cards) => cards?.id !== action.payload._id
            )
            return [action.payload, ...deleteFleet]
        }
        default:
            return state
    }
}

export default EquipReducer
