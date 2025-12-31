

import apiClient from "../utils/axiosInstance"

const getCategoriesApi=async (page:number)=>{
    console.log(page)
    const response=await apiClient.get(`/category/page/${page}`)
    return response.data   
}






export {getCategoriesApi}