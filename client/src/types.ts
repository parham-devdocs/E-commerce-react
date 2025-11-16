

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

export type ProductCardInCart={
    img:string,productName:string,price:number,discountPercentage:number,defaultNumberOfProducts:number,id:string
}

 export type ProductCartData  = {
    id:string
    numberOfProducts?:number

 }