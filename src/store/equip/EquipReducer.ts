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
       
       
        default:
            return state
    }
}

export default EquipReducer
