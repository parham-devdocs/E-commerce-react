

import apiClient from "../utils/axiosInstance"

const getCategoriesApi=async ()=>{
    const response=await apiClient.get("/category")
    return response.data   
}






export {getCategoriesApi}