export interface  ENV {
    PORT:string
    MONGOOSE_CONNECTION_URI:string
  }

  export interface Cookie{
    key:string
    value:string
    maxAge:number
  }

  export interface tokenType{ 
    email: string,
     iat: number,
      exp: number }