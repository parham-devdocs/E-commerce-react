


import { useQuery } from "@tanstack/react-query";
import { type Category} from "../types";
import { getCategoriesApi } from "../api/categoryApi";

// hooks/useGetDiscountedProducts.ts
export const useGetCategories= () => {
    return useQuery<Category[]>({
      queryKey: ["categories"],
      queryFn: getCategoriesApi,
    });
  };