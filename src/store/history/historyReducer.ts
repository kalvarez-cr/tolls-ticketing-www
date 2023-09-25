import { AnyAction } from 'redux'
import { ThistoryProps } from 'types'



const historyReducer = (
    state: Array<ThistoryProps> | undefined = [],
    action: AnyAction
) => {
    switch (action.type) {
        case 'LIST_ HISTORY':
            return action.payload
       
        default:
            return state
    }
}

export default historyReducer
