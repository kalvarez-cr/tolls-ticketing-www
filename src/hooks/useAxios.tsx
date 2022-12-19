import axios from 'axios'

export const useAxios = (path: string) => {
    const requester = axios.create({
        baseURL: `${process.env.REACT_APP_BASE_API_URL}/${path}`,
        withCredentials: true,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })

    return { requester }
}
