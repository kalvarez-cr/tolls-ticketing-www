// import { SNACKBAR_OPEN } from 'store/actions'
// import { axiosRequest } from 'store/axios'
// import { TCardsProps } from 'types/index'

import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'

export const listVehicleType = (payload) => ({
    type: 'LIST_VEHICLE_TYPE',
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
export const getVehicleTypeRequest = () => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'vehicle-category/get/',
                {
                    _all_: true,
                }
            )
            dispatch(listVehicleType(data.data))
            dispatch(snackbarOpen('Operación exitosa', 'success'))
        } catch (error) {
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}
