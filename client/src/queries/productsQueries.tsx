import { useQuery } from "@tanstack/react-query";
import { getProducts, getProductsWithDiscount, getRecentProducts } from "../api/productApi";
import { type PaginatedDiscountedProducts, type PaginatedRecentProducts } from "../types";

// hooks/useGetDiscountedProducts.ts
export const useGetDiscountedProducts = (page:number=1,limit:number=10) => {
  
    return useQuery<PaginatedDiscountedProducts>({
      
      queryKey: ["discountedProducts",page,limit],
      queryFn: ()=>getProductsWithDiscount(page),
    });
  };

  export const useGetProducts = (page:number=1,limit:number=10) => {
  
    return useQuery<PaginatedDiscountedProducts>({
      
      queryKey: ["products",page,limit],
      queryFn: ()=>getProducts(page),
    });
  };

  export const useGetRecentProducts = (page?:number) => {
    return useQuery<PaginatedRecentProducts>({
      queryKey: ["recentProducts"],
      queryFn: ()=>getRecentProducts(page),
    });
  };