import axios from 'axios'

// const baseUrl = 'http://192.168.0.107:11088/api'
// const base = 'http://192.168.0.165:11089/api'
const baseUrl = 'http://api.regional-toll-qa.local:11089/api'
// const base = 'http://api.ticketing-crm-qa.local:11088'

// interface axiosRequestArg {
//     method
//     path: string
//     axiosData: object
// }

export const axiosRequest = async (
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    path: string,
    axiosData?: object
) =>
    await axios({
        withCredentials: true,
        method: method,
        url: `${baseUrl}/${path}  `,
        data: axiosData,
    })
