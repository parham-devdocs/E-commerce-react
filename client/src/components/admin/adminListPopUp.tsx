import Header from "../header";
import { MdClose } from "react-icons/md";
import Button from "../button";
import { useState } from "react";
import Input from "./input";
import type { ProductPopUp } from "../../types";
import usePrice from "../../hooks/priceHook";

const AdminListPopUp = ({
  productInfo,
  closeHandler,
}: {
  productInfo: ProductPopUp;
  closeHandler: () => void;
}) => {
  const [discountPercentage, setDiscountPercentage] = useState<number>(
    +productInfo.discountPercentage || 0
  );
  const [price, setPrice] = useState<number>(+productInfo.price);
  const [count, setCount] = useState<number>(+productInfo.count || 0);

  const { seperatedPriceWithDiscount } = usePrice({
    priceOrDiscount: price,
    discountPercentage:
      +discountPercentage || +productInfo.discountPercentage || 0,
  });
  console.log(discountPercentage, price, count, seperatedPriceWithDiscount);
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setPrice(isNaN(value) ? 0 : value);
    console.log("price changed");
  };

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setDiscountPercentage(isNaN(value) ? 0 : Math.max(0, Math.min(100, value))); // Ensure discount is between 0-100
  };

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setCount(isNaN(value) ? 0 : Math.max(0, value)); // Ensure count is not negative
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0  bg-opacity-50 backdrop-blur-[5px]"
        onClick={closeHandler}
      ></div>

      <div className="relative z-10 w-full max-w-md bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="relative">
          <button
            onClick={closeHandler}
            className="absolute -top-2 -left-2 p-1 bg-white dark:bg-neutral-700 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-neutral-600 transition-colors duration-200"
            aria-label="Close modal"
          >
            <MdClose className="text-gray-800 dark:text-white" size={24} />
          </button>

          <Header title={`${productInfo.id} ویرایش محصول شماره`} />
        </div>

        <form className="mt-6 space-y-5">
          <div className="w-full">
            <Input
              value={price.toString()}
              onChangeHandler={handlePriceChange}
              placeHolder="قیمت"
              id="price"
              type="text"
            />
          </div>

          <div className="w-full">
            <Input
              value={discountPercentage.toString()}
              onChangeHandler={handleDiscountChange}
              placeHolder="تخفیف (درصد)"
              id="discountPercentage"
              type="number"
            />
          </div>

          <div className="w-full">
            <Input
              value={count.toString()}
              onChangeHandler={handleCountChange}
              placeHolder="تعداد"
              id="count"
              type="text"
            />
          </div>

          <div className="w-full p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-right">
            <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">
              قیمت با احتساب تخفیف: {seperatedPriceWithDiscount} تومان
            </p>
          </div>

          <div className="pt-4">
            <Button
              btn={{
                text: "ویرایش",
                fn: (e) => {
                  e.preventDefault();
                  console.log({ price, discountPercentage, count });
                },
                type: "submit",
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminListPopUp;
