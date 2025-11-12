import discountCalc from "../utils/discountCalc";
const PriceHook = ({priceOrDiscount,discountPercentage}:{priceOrDiscount:number,discountPercentage?:number}) => {
    let seperatedPriceWithDiscount;
    
    if (discountPercentage) {
        const priceWithDiscount=discountCalc(priceOrDiscount,discountPercentage )
         seperatedPriceWithDiscount=new Intl.NumberFormat("fa-IR").format(priceWithDiscount)

    }
const seperatedPrice=new Intl.NumberFormat("fa-IR").format(priceOrDiscount)
return ({seperatedPrice,seperatedPriceWithDiscount })

}

export default PriceHook