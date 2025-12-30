

import apiClient from "../utils/axiosInstance"

const getCategoriesApi=async (page:number)=>{
    const response=await apiClient.get(`/category/page/${page}`)
    return response.data   
}






export {getCategoriesApi}