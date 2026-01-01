

import apiClient from "../utils/axiosInstance"

const getPaginatedCategoriesApi=async (page:number)=>{
    console.log(page)
    const response=await apiClient.get(`/category/page/${page}`)
    return response.data   
}
const getCategoriesApi=async ()=>{
    const response=await apiClient.get(`/category/products`)
    return response.data   
}




export {getCategoriesApi,getPaginatedCategoriesApi}