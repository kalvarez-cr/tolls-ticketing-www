import axios from 'axios'

// console.log('REACT_APP_BASE_API_URL =', process.env.REACT_APP_BASE_API_URL)
// console.log('REACT_APP_API_TIMEOUT =', process.env.REACT_APP_API_TIMEOUT)

export const axiosRequest = async (
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    path: string,
    axiosData?: object
) => {
    try {
        const data = await axios({
            withCredentials: true,
            method: method,
            timeout: Number.parseInt(
                process.env.REACT_APP_API_TIMEOUT || '10000'
            ),
            url: `${process.env.REACT_APP_BASE_API_URL}/${path}`,
            data: axiosData,
        })
        return data
    } catch (error) {
        // @ts-ignore
        // console.log('Error: ', error.response.data.return_code)

        // Finds the right error message in ERROR_MESSAGES and returns its respective message and code

        const message = ERROR_MESSAGES.find(
            // @ts-ignore
            (find) => find.code === error.response.data.return_code
        )
        throw `${message?.message} (${message?.code})`
    }
}

const ERROR_MESSAGES = [
    {
        message: 'Operación Exitosa',
        code: '9000',
        string_code: 'SUCCESS',
    },

    {
        message: 'Objeto no encontrado',
        code: '9001',
        string_code: 'OBJECT_DOES_NOT_EXIST',
    },

    {
        message: 'Múltiples objetos retornados',
        code: '9002',
        string_code: 'MULTIPLE_OBJECTS_RETURNED ',
    },

    {
        message: 'Datos inválidos',
        code: '9003',
        string_code: 'INVALID_DATA',
    },

    {
        message: 'Origen de datos vacío',
        code: '9404',
        string_code: 'DATA_SOURCE_EMPTY',
    },

    {
        message: 'Error inesperado',
        code: '9999',
        string_code: 'UNEXPECTED_ERROR',
    },

    {
        message: 'Parámetros de llamada no válidos',
        code: '9700',
        string_code: 'INVALID_REQUEST_PARAMETERS',
    },

    {
        message: 'Usuario ya existe',
        code: '9005',
        string_code: 'USER_ALREADY_EXIST',
    },
    {
        message: 'Error indefinido',
        string_code: 'DEFAULT_MESSAGE_CODE',
    },
]
