// import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'

export const listMunicipality = (payload) => ({
    type: 'LIST_MUNICIPIES',
    payload,
})

// const snackbarOpen = (message, type) => {
//     return {
//         type: SNACKBAR_OPEN,
//         open: true,
//         message: message,
//         anchorOrigin: { vertical: 'top', horizontal: 'right' },
//         variant: 'alert',
//         alertSeverity: type,
//     }
// }

export const getMunicipalityRequest = (states) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'municipality/get/',
                states
            )
            dispatch(listMunicipality(data.data))

            // dispatch(snackbarOpen('Operación exitosa', 'success'))
        } catch (error) {
            // dispatch(snackbarOpen(error, 'error'))
        }
    }
}
