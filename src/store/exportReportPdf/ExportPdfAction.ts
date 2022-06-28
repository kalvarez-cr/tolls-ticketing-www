// import { SNACKBAR_OPEN } from 'store/actions'
// import { axiosRequest } from 'store/axios'
// import { TCardsProps } from 'types/index'

import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
import { takingsReq } from 'types'

export const listPdfReport = (payload) => ({
    type: 'LIST_PDF',
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
export const getPdfReportRequest = (reportData: takingsReq) => {
    return async (dispatch) => {
        try {
            const headers: object = {
                'Content-Type': 'application/json',
            }
            const responseType = 'arraybuffer'
            const data = await axiosRequest(
                'post',
                'reports/sell_details_pdf/',
                reportData,
                headers,
                responseType
            )
            const url = window.URL.createObjectURL(new Blob([data.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', `${reportData.report_title}.pdf`)
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
