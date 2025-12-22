import apiClient from "../utils/axiosInstance";
const registerUser=async (data:any)=>{
    const response= await apiClient.post("/auth/register",data)
    return response.data
}

export {registerUser}