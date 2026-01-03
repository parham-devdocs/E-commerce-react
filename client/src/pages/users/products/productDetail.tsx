import Price from "../../../components/productDetails/price";
import Gallery from "../../../components/productDetails/gallery";
import Details from "../../../components/productDetails/details";
import {  useParams } from "react-router-dom";
import { useGetSingleProduct } from "../../../queries/productsQueries";
import Loader from "../../../components/loader";

const ProductDetailPage = () => {
  const { id } = useParams() as {id:string}


  const {isError,isLoading,error,data}=useGetSingleProduct(id)
// Optional: Define a refined type for your translated key-value pair
console.log(id)
interface TranslatedKeyValuePair {
  key: string;
  value: string; 
}

// Now build the array
const attributesArray: TranslatedKeyValuePair[] = Object.entries(data?.attributes || {}).map(([key, value]) => {
  let displayValue: string;

  if (typeof value === 'boolean') {
    displayValue = value ? 'دارد' : 'ندارد';
  } else {
    displayValue = String(value);
  }

  return { key, value: displayValue };
});
  if (!data ||isLoading) {
    return (
      <div className="space-y-3 dark:bg-gradient-to-br p-5 rounded-md bg-white bg-gradient- dark:from-gray-900 dark:to-gray-950">
        <div className="flex w-full h-full justify-center items-center">
          <Loader size="lg" />
        </div>
      </div>
    );
  }

  if (!data || isError) {
    return (
      <div className="space-y-3 dark:bg-gradient-to-br p-5 rounded-md bg-white bg-gradient- dark:from-gray-900 dark:to-gray-950">
        <div className="h-64 flex items-center justify-center text-red-500">
          Failed to load recent products: {error?.message}
        </div>
      </div>
    );
  }
  return (
    <div className=" w-full flex items-center justify-center">
      <div className=" flex items-center justify-center flex-col gap-5 w-full md:w-[700px] ">
        <Price
          title="گوشی هوشمند سامسونگ گلکسی S24"
          id={String(id)}
          image={data?.images[0]  }
          colors={["#1e2939", "#4a5565"]}
          price={data.price}
          discountPercentage={20}
        />
        <Gallery images={data.images} />
        <Details attributes={attributesArray} />
      </div>
    </div>
  );
};

export default ProductDetailPage
