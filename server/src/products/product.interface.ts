

 export interface Product{
    name:string
    brand:string
    category:string
    price:string
    discountPercentage:number
    attributes:{[key: string]: string}
    inStock:boolean
    count:number
    images:string[]
    description:string
  }