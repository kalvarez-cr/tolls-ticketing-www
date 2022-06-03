// import { SNACKBAR_OPEN } from 'store/actions'
// import { axiosRequest } from 'store/axios'
// import { TCardsProps } from 'types/index'

import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
import { dashboard } from 'types'

export const dashboardList = (payload) => ({
    type: 'LIST_DASHBOARD',
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
export const getDashboardRequest = (reportData: dashboard) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'reports/dashboard/',
                reportData
            )
            dispatch(dashboardList(data.data))

            dispatch(snackbarOpen('Operación exitosa', 'success'))
        } catch (error) {
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

