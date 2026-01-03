import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { addItemToCartApi, getActiveCart, getWholeCart } from "../api/cartApi";
import {type CartResponse, type ActiveCart, type CartData } from "../types";
import { toast } from "sonner";
import queryErrorHandler from "../utils/queryErrorHandler";


export const useAddToCart = (data:CartData) => {
    return useMutation<void, AxiosError>({
      mutationFn:()=> addItemToCartApi(data),
      onSuccess: () => {
        toast.success('آیتم به کارت اضافه شد');
      },
      onError: (error) => {
        queryErrorHandler(error);
      },
    });
  };
  

  export const useFindActiveCart = () => {
      return useQuery<ActiveCart>({
        queryKey: ["activeCart"],
        queryFn:()=> getActiveCart()
      });
    }
  
  
    export const useFindWholeCart=()=>{
      return useQuery<CartResponse>({
        queryKey:["wholeCart"],
        queryFn:getWholeCart,
        
      })
    }