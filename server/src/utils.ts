import { Response } from 'express'; // or fastify if you use it
import bcrypt from "bcrypt";


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
