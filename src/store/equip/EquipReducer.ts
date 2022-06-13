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
                (cards) => cards?.id !== action.payload.id
            )
            return [action.payload, ...deleteFleet]
        }
        case 'DELETE_EQUIP': {
            const deleteEquips = state.filter(
                (employees) => employees?.id !== action.payload.id
            )
            return [...deleteEquips]
        }
        default:
            return state
    }
}

export default EquipReducer
