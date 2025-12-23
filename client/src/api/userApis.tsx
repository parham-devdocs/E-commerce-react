import type z from "zod";
import type { userLoginSchema, userRegisterSchema } from "../formValidationSchemas";
import apiClient from "../utils/axiosInstance";
import {useAuth } from "../store/auth";

export type LoginFormData = z.infer<typeof userLoginSchema>;
export type RegisterFormData=z.infer<typeof userRegisterSchema>

const registerUser=async (data:RegisterFormData)=>{
    const response= await apiClient.post("/auth/register",data)
    return response.data
}
const loginUser=async (data:LoginFormData)=>{
    const response=await apiClient.post("/auth/login",data)
    useAuth.getState().login(response.data.data);
    return response.data
}

export {registerUser,loginUser}