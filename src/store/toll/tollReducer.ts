import { AnyAction } from 'redux'
import { TTollsSite } from 'types'

// /import { mockToll } from '_mockApis/toll/mockToll'

const tollReducer = (state: TTollsSite | {} = {}, action: AnyAction) => {
    switch (action.type) {
        case 'LIST_TOLL':
            return action.payload
        
        default:
            return state
    }
}

export default tollReducer
