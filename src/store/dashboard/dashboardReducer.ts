import { AnyAction } from 'redux'
import { dashboard } from 'types'
// /import { mockToll } from '_mockApis/toll/mockToll'

const DashboardReducer = (
    state: Array<dashboard> | undefined = [],
    action: AnyAction
) => {
    switch (action.type) {
        case 'LIST_DASHBOARD':
			return action.payload
		
			default:
				return state
        }
    }


export default DashboardReducer
