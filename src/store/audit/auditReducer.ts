import { AnyAction } from 'redux'
import { AuditProps } from 'types'
// /import { mockToll } from '_mockApis/toll/mockToll'

const auditReducer = (
    state: Array<AuditProps> | undefined = [],
    action: AnyAction
) => {
    switch (action.type) {
        case 'LIST_AUDIT':
            return action.payload
        case 'UPDATE_AUDIT': {
            return state
        }
        default:
            return state
    }
}

export default auditReducer
