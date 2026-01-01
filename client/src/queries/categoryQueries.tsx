


import { useQuery } from "@tanstack/react-query";
import { type PaginatedCategoriesResponse} from "../types";
import { getCategoriesApi, getPaginatedCategoriesApi } from "../api/categoryApi";

// hooks/useGetDiscountedProducts.ts
export const useGetCategoriesByPgination= (page:number) => {
    return useQuery<PaginatedCategoriesResponse>({
      queryKey: ["paginatedCategories",page],
      queryFn:()=> getPaginatedCategoriesApi(page),
    });
  };
  export const useGetCategories= () => {
    return useQuery<PaginatedCategoriesResponse>({
      queryKey: ["categories"],
      queryFn:()=> getCategoriesApi()
    });
  };
