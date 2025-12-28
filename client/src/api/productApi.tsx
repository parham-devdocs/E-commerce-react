import apiClient from "../utils/axiosInstance"

const getProductsWithDiscount=async ()=>{
    const response=await apiClient.get("products/discount")
    return response.data   
}






export {getProductsWithDiscount}