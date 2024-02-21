// import { SNACKBAR_OPEN } from 'store/actions'
// import { axiosRequest } from 'store/axios'
// import { TCardsProps } from 'types/index'

import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
import { takingsReq } from 'types'

export const listExcelReport = (payload) => ({
    type: 'LIST_EXCEL',
    payload,
})

export const listExcelWorkReport = (payload) => ({
    type: 'LIST_EXCEL_WORK',
    payload,
})




const snackbarOpen = (message, type) => {
    return {
        type: SNACKBAR_OPEN,
        open: true,
        message: message,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        variant: 'alert',
        alertSeverity: type,
    }
}

// async request
export const getExcelReportRequest = (reportData: takingsReq) => {
    return async (dispatch) => {
        try {
            const headers: object = {
                'Content-Type': 'application/json',
            }
            const responseType = 'arraybuffer'
            const data = await axiosRequest(
                'post',
                'reports/sell_details_excel/',
                reportData,
                headers,
                responseType
            )
            const url = window.URL.createObjectURL(new Blob([data.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', `${reportData.report_title}.xlsx`)
            document.body.appendChild(link)
            link.click()
            // dispatch(listExcelReport(data.data))
            dispatch(snackbarOpen('Operación exitosa', 'success'))
            return true
        } catch (error) {
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}




export const getExcelReportWorkRequest = (reportData: takingsReq) => {
    return async (dispatch) => {
        try {
            const headers: object = {
                'Content-Type': 'application/json',
            }
            const responseType = 'arraybuffer'
            const data = await axiosRequest(
                'post',
                'reports/settlement_excel/',
                reportData,
                headers,
                responseType
            )
            const url = window.URL.createObjectURL(new Blob([data.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', `${reportData.report_title}.xlsx`)
            document.body.appendChild(link)
            link.click()
            // dispatch(listExcelReport(data.data))
            dispatch(snackbarOpen('Operación exitosa', 'success'))
            return true
        } catch (error) {
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

