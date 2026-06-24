import Table from "../../components/admin/table";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import type { PaginatedProducts, Product } from "../../types";
import Button from "../../components/button";
import discountPercentage from "../../utils/discountCalc";
import Header from "../../components/header";
import { useState } from "react";
import AdminListPopUp from "../../components/admin/adminListPopUp";
import Pagination from "../../components/pagination";
import { useGetProducts } from "../../queries/productsQueries";
import Loader from "../../components/loader";



type ModifiedProductType = PaginatedProducts[] & {
  removeProduct: () => void;
  updateProduct: (id: number) => void;
  totalPrice?: any;
};

const Products = () => {
  const [productIdForUpdation, setProductIdForUpdation] = useState<null | number >(null);
  const [pageNumber,setPageNumber]=useState(1)
    const {data,isError,isLoading}=useGetProducts(pageNumber)

    if (isLoading ) {
      return <Loader size="lg"/>
    }
    if (isError && !data) {
      return <p>something is wrong with server</p>
    }

  const columnHelper = createColumnHelper<ModifiedProductType>();

  const createModifiedData = (products: PaginatedProducts): ModifiedProductType[] => {
    return products.data.map((product) => ({
      ...product,
      removeProduct: () => {
        console.log(`Removing product`);
      },
      updateProduct: (id: number) => {
        setProductIdForUpdation(id);
        console.log(`Updating producs`);
      },
    }));
  };
  const modifiedData: ModifiedProductType[] =data && createModifiedData(data) 

  const columns: ColumnDef<ModifiedProductType, any>[] = [
    columnHelper.accessor("data.name", {
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
    columnHelper.accessor("data.count", {
      header: "تعداد",
      cell: (info) => {
        return <p>{info.getValue}</p>;
      },
    }),
    columnHelper.accessor("data.price", {
      header: "قیمت بدون تخفیف",
      cell: (info) => {
        return <p>{info.row.original.price}</p>;
      },
    }),
    columnHelper.accessor("data.discountPercentage", {
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
        <Pagination pages={10} onClickHandler={(e)=>{setPageNumber(e)}}/>
      </div>
    </div>
  );
};

export default Products;
