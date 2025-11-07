import discountCalc from "../utils/discountCalc";
const PriceHook = ({price,discountPercentage}:{price:number,discountPercentage?:number}) => {
    let seperatedPriceWithDiscount;
    
    if (discountPercentage) {
        const priceWithDiscount=discountCalc(price,discountPercentage )
         seperatedPriceWithDiscount=new Intl.NumberFormat("fa-IR").format(priceWithDiscount)

    }
const seperatedPrice=new Intl.NumberFormat("fa-IR").format(price)
return ({seperatedPrice,seperatedPriceWithDiscount })

}

export default PriceHook