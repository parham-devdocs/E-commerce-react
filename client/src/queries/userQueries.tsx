// queries/userQueries.ts
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/userApis";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import type { userRegisterSchema } from "../formValidationSchemas";
import queryErrorHandler from "../utils/queryErrorHandler";

// Helper type (optional but clean)
interface ApiErrorResponse {
  message?: string | string[];
  error?: string;
  statusCode?: number;
}

interface ApiResponseWrapper {
  data?: ApiErrorResponse;
  message?: string;
  // Add other top-level props if needed
}

export const useRegisterUser = () => {
  return useMutation<void, AxiosError,typeof userRegisterSchema>({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("ثبت‌نام با موفقیت انجام شد!");
    },
    onError: (error) => {
   queryErrorHandler(error)
    },
  });
};