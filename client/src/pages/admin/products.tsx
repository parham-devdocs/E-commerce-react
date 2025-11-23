import Table from "../../components/admin/table";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import type { Product } from "../../types";
import Button from "../../components/button";
import discountPercentage from "../../utils/discountCalc";
import iphone14 from "../../../public/iPhone_14_Blue_PDP_Image_Position-1A__WWEN.webp";
import Header from "../../components/header";
import { useState } from "react";
import AdminListPopUp from "../../components/admin/adminListPopUp";
import Pagination from "../../components/pagination";

const products: Product[] = [
  {
    id: "1",
    src: iphone14,
    name: "Ultra Slim Laptop",
    price: 1299.99,
    discountPercentage: 0,
    numbersAvailable: 25,
  },
  {
    id: "2",
    src: iphone14,
    name: "Wireless Noise-Canceling Headphones",
    price: 299.99,
    discountPercentage: 20,
    numbersAvailable: 50,
  },
  {
    id: "3",
    src: iphone14,
    name: "Latest Model Smartphone",
    price: 899.99,
    discountPercentage: 10,
    numbersAvailable: 0,
  },
  {
    id: "4",
    src: iphone14,
    name: "Smart Fitness Watch",
    price: 249.99,
    discountPercentage: 25,
    numbersAvailable: 7,
  },
  {
    id: "5",
    src: iphone14,
    name: "10-inch Tablet",
    price: 449.99,
    discountPercentage: 5,
    numbersAvailable: 30,
  },
];

type ModifiedProductType = Product & {
  removeProduct: () => void;
  updateProduct: (id: number) => void;
  totalPrice?: any;
};

const Products = () => {
  const [productIdForUpdation, setProductIdForUpdation] = useState<
    null | number
  >(null);
  const columnHelper = createColumnHelper<ModifiedProductType>();

  const createModifiedData = (products: Product[]): ModifiedProductType[] => {
    return products.map((product) => ({
      ...product,
      removeProduct: () => {
        console.log(`Removing product: ${product.id}`);
      },
      updateProduct: (id: number) => {
        setProductIdForUpdation(id);
        console.log(`Updating product: ${product.id}`);
      },
    }));
  };
  const modifiedData: ModifiedProductType[] = createModifiedData(products);

  const columns: ColumnDef<ModifiedProductType, any>[] = [
    columnHelper.accessor("name", {
      header: "نام",
      cell: (info) => (
        <div className="flex items-center gap-3">
          <img
            src={info.row.original.src}
            alt={info.getValue()}
            className="w-8 rounded-full object-cover"
          />
          <p>{info.row.original.name}</p>
        </div>
      ),
    }),
    columnHelper.accessor("numbersAvailable", {
      header: "تعداد",
      cell: (info) => {
        return <p>{info.row.original.numbersAvailable}</p>;
      },
    }),
    columnHelper.accessor("price", {
      header: "قیمت بدون تخفیف",
      cell: (info) => {
        return <p>{info.row.original.price}</p>;
      },
    }),
    columnHelper.accessor("discountPercentage", {
      header: "درصد تخفیف",
      cell: (info) => {
        return <p>{info.row.original.discountPercentage}</p>;
      },
    }),
    columnHelper.accessor("totalPrice", {
      header: "قیمت کل",
      cell: (info) => {
        const calculatedPriceWithDiscount = discountPercentage(
          info.row.original.price,
          info.row.original.discountPercentage
        );
        const formatedPrice = Intl.NumberFormat("fa-IR").format(
          calculatedPriceWithDiscount
        );
        return <p>{formatedPrice}</p>;
      },
    }),
    columnHelper.accessor("removeProduct", {
      header: "حذف کالا",
      cell: (info) => {
        return (
          <Button
            style={{ size: "sm" }}
            btn={{
              fn: info.row.original.removeProduct,
              text: "حذف محصول",
              type: "button",
            }}
          />
        );
      },
    }),
    columnHelper.accessor("updateProduct", {
      header: "ویرایش محصول",
      cell: (info) => {
        return (
          <Button
            style={{ size: "sm" }}
            btn={{
              fn: () => info.row.original.updateProduct(+info.row.original.id),
              text: "ویرایش محصول",
              type: "button",
            }}
          />
        );
      },
    }),
  ];

  return (
    <div className=" flex flex-col gap-10 ">
      {productIdForUpdation && (
        <AdminListPopUp
          productInfo={{
            id: String(productIdForUpdation),
            price: "2000000",
            discountPercentage: "20",
            count: "20",
          }}
          closeHandler={() => {
            setProductIdForUpdation(null);
          }}
        />
      )}
      <Header title="لیست محصولات" />
      <div className="w-full h-full gap-10 flex flex-col items-center justify-center">
        <Table data={modifiedData} columns={columns} />
        <Pagination pages={10} onClickHandler={(e)=>{console.log(e)}}/>
      </div>
    </div>
  );
};

export default Products;
