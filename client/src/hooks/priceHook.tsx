import { useState, useEffect } from "react";
import discountCalc from "../utils/discountCalc";

const PriceHook = ({priceOrDiscount, discountPercentage}:{priceOrDiscount:number, discountPercentage?:number}) => {
    const [refetch, setRefetch] = useState(0);
    
    // Calculate the actual prices (numbers)
    const priceWithDiscount = discountPercentage 
        ? discountCalc(priceOrDiscount, discountPercentage) 
        : priceOrDiscount;
    
    // Format for display (strings)
    const seperatedPrice = new Intl.NumberFormat("fa-IR").format(priceOrDiscount);
    const seperatedPriceWithDiscount = discountPercentage
        ? new Intl.NumberFormat("fa-IR").format(priceWithDiscount)
        : undefined;

    return {
        seperatedPrice, 
        seperatedPriceWithDiscount, 
        priceWithDiscount: priceWithDiscount, // Keep the actual number
        originalPrice: priceOrDiscount
    };
}

export default PriceHook;