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
export type Product={
  id:string;
  src:string ;
  name:string,
    shortDescription?:string,
    price:number,
    discountPercentage:number,
    numbersAvailable:number}

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
