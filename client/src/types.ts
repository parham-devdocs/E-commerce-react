import type { ColumnDef } from "@tanstack/react-table"
import type { ReactNode } from "react"
import type z from "zod"
import type { userLoginSchema, userRegisterSchema } from "./formValidationSchemas"


export type ProductCardType={
       id:string,
    src:string,
    name:string,
    shortDescription:string,
    price:number,
    discountPercentage:number,
    inStock:boolean
    numbersAvailable?:number
}
export type ProductPopUp={
  id:string
  count:string
  discountPercentage:string
  price:string
}

export type ProductCardInCart={
    img:string,productName:string,price:number,discountPercentage:number,defaultNumberOfProducts:number,id:string
}

 export type ProductCartData  = {
    id:string
    numberOfProducts?:number

 }

 export type LoginInput = {
    email: string
    password: string
  }
  

  export interface TableProps<T> {
   columns: ColumnDef<T>[];
   data: T[];
 }
 type UserRole = 'admin' | 'customer' | 'vendor' 
type Gender = 'male' | 'female' | 'other';

interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: Gender;
  age: number;
  role: UserRole;
  totalOrders: number;
  totalSpent: number; // in currency units
  address: Address;
  avatar: string; // URL to profile picture
 
}


export interface DropDownType {
   header?: string;
   defaultValue:string

   options: {
     label: string;
     value: string | number;
     disabled?: boolean;    
     icon?: ReactNode      
   }[];
   placeholder?: string;           
   disabled?: boolean;             
   onChange: (value: string ) => void; 
   className?: string;             
   id?: string;                    
   name?: string;                 
   size?: 'sm' | 'md' | 'lg';    

 }


 export type LoginFormData = z.infer<typeof userLoginSchema>;
 export type RegsiterFormData = z.infer<typeof userRegisterSchema>;




 export interface Product{
  id:string
  name:string
  brand:string
  category:string
  price:number
  priceWithDiscount:number
  discountPercentage:number
  attributes:{[key: string]: string}
  inStock:boolean
  count:number
  images:string[]
  description:string
}

export interface CategoryProduct {
  _id: string;
  name: string;
  images: string[];
}

export interface CategoryItem {
  _id: string;
  title?: string;   
  name?: string;    
  description: string;
  image:string
  products: CategoryProduct[];
  __v?: number;     
}

export interface PaginatedCategoriesResponse {
  data: CategoryItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}