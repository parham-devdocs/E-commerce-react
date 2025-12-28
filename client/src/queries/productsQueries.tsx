import { useQuery } from "@tanstack/react-query";
import { getProductsWithDiscount } from "../api/productApi";
import { type Product } from "../types";

// hooks/useGetDiscountedProducts.ts
export const useGetDiscountedProducts = () => {
    return useQuery<Product[]>({
      queryKey: ["discountedProducts"],
      queryFn: getProductsWithDiscount,
    });
  };