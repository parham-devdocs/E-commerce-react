


import { useQuery } from "@tanstack/react-query";
import { type PaginatedCategoriesResponse} from "../types";
import { getCategoriesApi } from "../api/categoryApi";

// hooks/useGetDiscountedProducts.ts
export const useGetCategories= (page:number) => {
    return useQuery<PaginatedCategoriesResponse>({
      queryKey: ["categories"],
      queryFn:()=> getCategoriesApi(page),
    });
  };