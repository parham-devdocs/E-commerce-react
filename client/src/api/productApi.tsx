import apiClient from "../utils/axiosInstance"

const getProductsWithDiscount = async (page?: number) => {
    const pageNum = page ?? 1; 
    const response = await apiClient.get(`products/discount/${pageNum}`);
    return response.data 
  };

const getRecentProducts=async (page?:number)=>{
    const response=await apiClient.get(`products/recent/${page}`)
    return response.data  
}

const getProducts=async (page?:number)=>{
  const response=await apiClient.get(`/products/pagination/${page}`)
  return response.data  
}


const getSingleProduct=async (id:string)=>{
  const response=await apiClient.get(`/products/${id}`)
  return response.data.data
}




export {getProductsWithDiscount,getRecentProducts,getProducts,getSingleProduct}