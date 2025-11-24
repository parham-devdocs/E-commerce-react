import { Response } from 'express'; // or fastify if you use it



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