import { Request, Response } from 'express'; // or fastify if you use it
import bcrypt from "bcrypt";
import { DateTime } from 'luxon';


export function dateComparison(date:string) {
    const dt1 = DateTime.fromISO(date);
const now = DateTime.fromISO(DateTime.now().toISO())
    const startOfLastWeek=dt1.startOf("day").minus({days:6})
    const endOfLastWeek=now.startOf("day")

    const normalizedDt1 = dt1.startOf('day');

    const comparison=normalizedDt1>=startOfLastWeek && normalizedDt1<=endOfLastWeek

    return comparison


    
}


export const setAuthCookie = (
  res: Response,
  value: string,
  key: string = 'auth_token',
  tokenType:"refreshToken" | "accessToken"
) => {
const token=  res.cookie(key, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge:tokenType==="accessToken" ? 60 * 60 * 1000 : 60 *60 *1000* 24*7, 
    path: '/',
  })
  return token
};

export const getAuthCookie = (
  req: Request,
):Record<string,any> => {
const token=  req.cookies
  return token
};

export const hashPassword=async(plainPassword:string) =>{
  const saltRounds = 12; 
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  return hashedPassword 
}

export const dehashPassword=async(hashedPassword:string,password:string) =>{
  const saltRounds = 12; 
  const decryptedPassword = await bcrypt.compare(password,hashedPassword);
  return decryptedPassword
}

export const calculateTotalPrice = (priceList: number[]) => {
  return priceList.reduce((acc, productPrice) => acc + productPrice, 0);
};

export const calculateDicount=(discountPercentage:number,price:number)=>{
  const modifiedPercentage=discountPercentage/100
  const discount=price * modifiedPercentage
return discount
}


export const calculatePriceWithDiscount=(discountPercentage:number,price:number)=>{
  const modifiedPercentage=discountPercentage/100
const appliedDiscount=price-(price*modifiedPercentage)
return appliedDiscount
}