import axios from 'axios'

console.log('REACT_APP_BASE_API_URL =', process.env.REACT_APP_BASE_API_URL)
console.log('REACT_APP_API_TIMEOUT =', process.env.REACT_APP_API_TIMEOUT)

export const axiosRequest = async (
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    path: string,
    axiosData?: object
) =>
    await axios({
        withCredentials: true,
        method: method,
        timeout: Number.parseInt(process.env.REACT_APP_API_TIMEOUT || '10000'),
        url: `${process.env.REACT_APP_BASE_API_URL}/${path}`,
        data: axiosData,
    })
