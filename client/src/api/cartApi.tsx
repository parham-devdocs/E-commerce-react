import apiClient from "../utils/axiosInstance"



const addItemToCartApi=async (data:{quantity:number,productId:string})=>{
    const response=await apiClient.post(`/cart`,data)
    return response.data   
}

const getActiveCart=async ()=>{
    const response=await apiClient.get(`/cart`)
    return response.data   
}
const getWholeCart=async ()=>{
    const response=await apiClient.get(`/cart/products`)
    return response.data   
}
export {addItemToCartApi,getActiveCart,getWholeCart}