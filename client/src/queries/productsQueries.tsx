import { useQuery } from "@tanstack/react-query";
import { getProducts, getProductsWithDiscount, getRecentProducts, getSingleProduct } from "../api/productApi";
import { type PaginatedProducts, type Product } from "../types";

// hooks/useGetDiscountedProducts.ts
export const useGetDiscountedProducts = (page:number=1,limit:number=10) => {
  
    return useQuery<PaginatedProducts>({
      
      queryKey: ["discountedProducts",page,limit],
      queryFn: ()=>getProductsWithDiscount(page),
    });
  };

  export const useGetProducts = (page:number=1,limit:number=10) => {
  
    return useQuery<PaginatedProducts[]>({
      
      queryKey: ["products",page,limit],
      queryFn: ()=>getProducts(page),
    });
  };

  export const useGetRecentProducts = (page?:number) => {
    return useQuery<PaginatedProducts>({
      queryKey: ["recentProducts"],
      queryFn: ()=>getRecentProducts(page),
    });
  };

  export const useGetSingleProduct = (id:string) => {
    return useQuery<Product>({
      queryKey: ["singleProduct"],
      queryFn: ()=>getSingleProduct(id),
    });
  };