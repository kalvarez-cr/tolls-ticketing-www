

// import { takingsReq } from 'types'

export const listConsolidateDataReport = (payload) => ({
    type: 'LIST_CONSOLIDATE_DATA',
    payload,
})



// async request
export const getConsolidateDataRequest = (reportData: any) => {
    return  (dispatch) => {
        dispatch(listConsolidateDataReport(reportData.data))
    }
}
