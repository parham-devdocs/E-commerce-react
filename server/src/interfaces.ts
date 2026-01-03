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
     refreshToken:string
      exp: number }

      export interface ProductInCart {
        price: number,
        name: string,
        discountPercentage: number,
        id:string,
        image: string,
        quantity: number
      }

      export interface CooikeType{refreshToken:string,accessToken:string}