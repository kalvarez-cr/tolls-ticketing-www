import axios from "axios";


// Config timeout
let timeout = Number.parseInt(process.env.REACT_APP_API_TIMEOUT || '')
if (!Number.isInteger(timeout)) {
  timeout = 5000
}

export const axiosRequest = async (
  method: "get" | "post" | "put" | "patch" | "delete",
  path: string,
  axiosData?: object,
  headers?: object,
  responseType?: any
) => {
  // const front_url = window.location.hostname.replace('www.', '')
  // const api_urls =  JSON.parse(process.env.REACT_APP_BASE_API_URL as string)
  // const url_base = api_urls.find((url) => url.includes(front_url))
  // const url = `${url_base}/${path}`
  const url = `${process.env.REACT_APP_BASE_API_URL}/${path}`

 

  try {
    return await axios({
      withCredentials: true,
      method,
      timeout,
      url,
      data: axiosData,
      headers: headers,
      responseType: responseType,
    });

  } catch (error) {
    //@ts-ignore
    if (error?.response?.status === 403 && !error?.response?.request?.responseURL?.includes('login')) {
      localStorage.removeItem("login-login");
      window.location.reload();
    }
    // Finds the right error message in ERROR_MESSAGES and returns its respective message and code
    // @ts-ignore
    if (error.response) {
      if (
        // @ts-ignore
        error.response.data.return_code === "9003" ||
        // @ts-ignore

        error.response.data.return_code === "9004" 

      
      ) {
        // @ts-ignore
        throw error.response.data.data
      } else {
        // @ts-ignore
        throw getErrorMessage(error.response.data.return_code)
      }
    }
    throw getErrorMessage("9");
  }
};

const getErrorMessage = (statusCode) => {
  switch (statusCode) {
    case "9000": {
      return "Operación Exitosa (9000)";
    }
    case "9001": {
      return "Objeto no encontrado (9001)";
    }
    case "9002": {
      return "Múltiples objetos retornados (9002)";
    }
    case "9003": {
      return "Datos inválidos (9003)";
    }
    case "9004": {
      return "Datos inválidos (9004)";
    }
    case "9404": {
      return "Origen de datos vacío (9404)";
    }
    case "9999": {
      return "Error inesperado (9999)";
    }
    case "9700": {
      return "Parámetros de llamada no válidos (9700)";
    }
    case "9005": {
      return "Usuario ya existe (9005)";
    }

    default: {
      return "Error indefinido";
    }
  }
};

// const ERROR_MESSAGES = [
//     {
//         message: 'Operación Exitosa',
//         code: '9000',
//         string_code: 'SUCCESS',
//     },

//     {
//         message: 'Objeto no encontrado',
//         code: '9001',
//         string_code: 'OBJECT_DOES_NOT_EXIST',
//     },

//     {
//         message: 'Múltiples objetos retornados',
//         code: '9002',
//         string_code: 'MULTIPLE_OBJECTS_RETURNED ',
//     },

//     {
//         message: 'Datos inválidos',
//         code: '9003',
//         string_code: 'INVALID_DATA',
//     },

//     {
//         message: 'Origen de datos vacío',
//         code: '9404',
//         string_code: 'DATA_SOURCE_EMPTY',
//     },

//     {
//         message: 'Error inesperado',
//         code: '9999',
//         string_code: 'UNEXPECTED_ERROR',
//     },

//     {
//         message: 'Parámetros de llamada no válidos',
//         code: '9700',
//         string_code: 'INVALID_REQUEST_PARAMETERS',
//     },

//     {
//         message: 'Usuario ya existe',
//         code: '9005',
//         string_code: 'USER_ALREADY_EXIST',
//     },
//     {
//         message: 'Error indefinido',
//         string_code: 'DEFAULT_MESSAGE_CODE',
//     },
// ]
