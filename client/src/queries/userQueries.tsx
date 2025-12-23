// queries/userQueries.ts
import { useMutation } from "@tanstack/react-query";
import { registerUser,loginUser } from "../api/userApis";
import { AxiosError } from "axios";
import { toast } from "sonner";
import queryErrorHandler from "../utils/queryErrorHandler";
import type { LoginFormData, RegsiterFormData } from "../types";



export const useRegisterUser = () => {
  return useMutation<void, AxiosError,RegsiterFormData>({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("ثبت‌نام با موفقیت انجام شد!");

    },
    onError: (error) => {
   queryErrorHandler(error)
    },
  });
};
export const useLoginUser = () => {
  return useMutation<void, AxiosError,LoginFormData>({
    mutationFn: loginUser,
    onSuccess: () => {
      toast.success('ورود با موفقیت انجام شد');
    },
    onError: (error) => {
      queryErrorHandler(error);
    },
  });
};