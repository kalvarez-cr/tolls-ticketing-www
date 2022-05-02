// import { SNACKBAR_OPEN } from 'store/actions'
// import { axiosRequest } from 'store/axios'
// import { TCardsProps } from 'types/index'

import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
import { takingsReq } from 'types'

export const listTakingReport = (payload) => ({
    type: 'LIST_TAKING',
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
export const getTakingReportRequest = (reportData: takingsReq) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'sell_detail/takings/',
                reportData
            )
            dispatch(listTakingReport(data.data))
            dispatch(snackbarOpen('Operación exitosa', 'success'))
            return true
        } catch (error) {
            dispatch(snackbarOpen('Error de conexión', 'error'))
        }
    }
}
