import { axiosRequest } from "store/axios"

export const getImageLight = async () => {
   try {
    const { data } = await axiosRequest(
        "get",
        "crm-light-logo/",
        {

        }
    )

    return data
   } catch (error) {
    console.log(error)
   }
}

export const getImageDark = async () => {
   try {
    const { data } = await axiosRequest(
        "get",
        "crm-dark-logo/  ",
        {

        }
    )
    return data
   } catch (error) {
    console.log(error)
   }

    
}