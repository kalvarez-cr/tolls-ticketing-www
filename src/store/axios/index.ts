import axios from 'axios'

export const axiosRequest = async (
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    path: string,
    axiosData?: object
) =>
    await axios({
        withCredentials: true,
        method: method,
        url: `${process.env.REACT_APP_BASE_API_URL}/${path}`,
        data: axiosData,
    })
