import { AnyAction } from 'redux'
import { siteRes } from 'types'
// /import { mockToll } from '_mockApis/toll/mockToll'

const LiquidationSiteReducer = (
    state: Array<siteRes> | undefined = [],
    action: AnyAction
) => {
    switch (action.type) {
        case 'LIST_LIQUIDATION_SITE_REPORT':
            return action.payload
        // case 'ADD_ACCOUNTS':
        //     const deleteFleet = state.filter(
        //         (cards) => cards?.id !== action.payload._id
        //     )
        //     return [action.payload, ...deleteFleet]
        // case 'UPDATE_ACCOUNTS': {
        //     const deleteFleet = state.filter(
        //         (cards) => cards?.id !== action.payload._id
        //     )
        //     return [action.payload, ...deleteFleet]
        // }
        default:
            return state
    }
}

export default LiquidationSiteReducer
