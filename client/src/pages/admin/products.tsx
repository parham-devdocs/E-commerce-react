import Table from '../../components/table'
import { createColumnHelper,type ColumnDef } from '@tanstack/react-table';
import type { Product } from '../../types';
import Button from '../../components/button';
import discountPercentage from '../../utils/discountCalc';
import iphone14 from "../../../public/iPhone_14_Blue_PDP_Image_Position-1A__WWEN.webp";
import { useState, useCallback, useEffect } from 'react';
  
type EdittableProductType=Partial<Pick<Product, "id" | "price" | 'discountPercentage' | 'numbersAvailable'>>
  const products: Product[] = [
    {
      id: "1",
      src: iphone14,
      name: "Ultra Slim Laptop",
      price: 1299.99,
      discountPercentage: 0,
      numbersAvailable: 25
    },
    {
      id: "2",
      src: iphone14,
      name: "Wireless Noise-Canceling Headphones",
      price: 299.99,
      discountPercentage: 20,
      numbersAvailable: 50
    },
    {
      id: "3",
      src: iphone14,
      name: "Latest Model Smartphone",
      price: 899.99,
      discountPercentage: 10,
      numbersAvailable: 0
    },
    {
      id: "4",
      src: iphone14,
      name: "Smart Fitness Watch",
      price: 249.99,
      discountPercentage: 25,
      numbersAvailable: 7
    },
    {
      id: "5",
      src: iphone14,
      name: "10-inch Tablet",
      price: 449.99,
      discountPercentage: 5,
      numbersAvailable: 30
    }
  ];
  
  type ModifiedProductType=Product & {removeProduct:any, updateNumbersAvailable:(value:number) => void, updatePrice:(value:number) => void, updateDiscount:(value:number) => void, totalPrice:any}
  
  const columnHelper = createColumnHelper<ModifiedProductType>();
  
  const createModifiedData = (products: Product[], updateProduct: (id: string, field: keyof EdittableProductType, value: number) => void, edittedValues: EdittableProductType[]): ModifiedProductType[] => {
    return products.map(product => {
      // Find if there's an edited version of this product
      const editedProduct = edittedValues.find(item => item.id === product.id);
      
      return {
        ...product,
        // Use edited values if they exist, otherwise use original values
        price: editedProduct?.price ?? product.price,
        discountPercentage: editedProduct?.discountPercentage ?? product.discountPercentage,
        numbersAvailable: editedProduct?.numbersAvailable ?? product.numbersAvailable,
        
        removeProduct: () => {
          console.log(`Removing product: ${product.id}`);
        },
        updateNumbersAvailable: (value: number) => {
          updateProduct(product.id, 'numbersAvailable', value);
        },
        updatePrice: (value: number) => {
          updateProduct(product.id, 'price', value);
        },
        updateDiscount: (value: number) => {
          updateProduct(product.id, 'discountPercentage', value);
        },
        totalPrice:()=>{
          console.log('total price')
        }
      };
    });
  };
  
  const Products = () => {
    const [edittedValues, setEdittedValues] = useState<EdittableProductType[]>([]);

    const updateProduct = useCallback((id: string, field: keyof EdittableProductType, value: number) => {
      setEdittedValues(prev => {
        const existingIndex = prev.findIndex(item => item.id === id);
        
        if (existingIndex >= 0) {
          // Update existing item
          const updated = [...prev];
          updated[existingIndex] = { ...updated[existingIndex], [field]: value };
          return updated;
        } else {
          // Add new item
          return [...prev, { id, [field]: value }];
        }
      });
    }, []);

    const modifiedData: ModifiedProductType[] = createModifiedData(products, updateProduct, edittedValues);

    const columns: ColumnDef<ModifiedProductType, any>[] = [
      columnHelper.accessor("id", {
        header: "ID",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("name", {
        header: "نام",
        cell: (info) => (
          <div className="flex items-center gap-3">
            <img 
              src={info.row.original.src} 
              alt={info.getValue()} 
              className="w-8 rounded-full object-cover"
            />
            <p >{info.row.original.name}</p>
          </div>
        ),
      }),
      columnHelper.accessor("numbersAvailable", {
        header: "تعداد",
        cell: (info) => {
          // Find the edited value for this product
          const editedValue = edittedValues.find(item => item.id === info.row.original.id)?.numbersAvailable;
          const displayValue = editedValue ?? info.row.original.numbersAvailable;
          
          return (
            <TableInput 
              value={displayValue} 
              onChange={(value) => {
                info.row.original.updateNumbersAvailable(value);
              }}
              id={info.row.original.id}
            />
          );
        },
      }),
      columnHelper.accessor("price", {
        header: "قیمت بدون تخفیف",
        cell: (info) => {
          // Find the edited value for this product
          const editedValue = edittedValues.find(item => item.id === info.row.original.id)?.price;
          const displayValue = editedValue ?? info.row.original.price;
          
          return (
            <TableInput  
              value={displayValue} 
              onChange={(value) => {
                info.row.original.updatePrice(value);
              }}
              id={info.row.original.id}
            />
          );
        }
      }), 
      columnHelper.accessor("discountPercentage", {
        header: "درصد تخفیف",
        cell: (info) => {
          // Find the edited value for this product
          const editedValue = edittedValues.find(item => item.id === info.row.original.id)?.discountPercentage;
          const displayValue = editedValue ?? info.row.original.discountPercentage;
          
          return (
            <TableInput 
              value={displayValue} 
              onChange={(value) => {
                info.row.original.updateDiscount(value);
              }}
              id={info.row.original.id}
            />
          );
        },
      }),
      columnHelper.accessor("totalPrice", {
        header: "قیمت کل",
        cell: (info) => {
          // Use the effective price (original or edited)
          const editedProduct = edittedValues.find(item => item.id === info.row.original.id);
          const effectivePrice = editedProduct?.price ?? info.row.original.price;
          const effectiveDiscount = editedProduct?.discountPercentage ?? info.row.original.discountPercentage;
          
          const calculatedPriceWithDiscount = discountPercentage(effectivePrice, effectiveDiscount);
          const formatedPrice = Intl.NumberFormat("fa-IR").format(calculatedPriceWithDiscount);
          return <p>{formatedPrice}</p>
        } 
      }),
      columnHelper.accessor("removeProduct", {
        header: "حذف کالا",
        cell: (info) => {
          return <Button style={{size:"sm"}} btn={{fn(e) {console.log(info.getValue())},text:"حذف محصول",type:"button"}} />
        },
      })
    ];

    const handleSaveChanges = () => {
      console.log("Saving all changes...", edittedValues);
    };

    return (
      <div>
        <div className="flex justify-between items-center my-8">
          <h2 className="text-xl font-bold dark:text-white text-black">مدیریت محصولات</h2>
          <div className='w-32'> 
            <Button 
              btn={{
                text: "ثبت تغییرات", 
                type: "button", 
                fn: handleSaveChanges
              }} 
            />
          </div>  
        </div>
        <div className='w-full h-full flex items-center justify-center'>
          <form className='w-full'>
            <Table data={modifiedData} columns={columns}/>
          </form> 
        </div>
      </div>
    )
  }

  type TableInputProps = {
    value: number;
    onChange: (value: number) => void;
    id: string;
  };

  const TableInput = ({value, onChange, id}: TableInputProps) => {
    const [localValue, setLocalValue] = useState<string>(value.toString());

    // Update local value when prop value changes
    useEffect(() => {
      setLocalValue(value.toString());
   console.log(localValue)
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setLocalValue(newValue);

   
    };
function handleOnBlur() {
    onChange(+localValue)
}
    return (
      <input 
        className='
          w-28
          px-3 py-2 
          border 
          border-gray-300 
          rounded-lg 
          focus:outline-none 
          focus:ring-2 
          focus:ring-blue-500 
          focus:border-blue-500 
          transition-all 
          duration-300
          bg-white
          shadow-inner
          text-gray-700
          text-right
        ' 
        value={localValue}
        onChange={handleChange}
        onBlur={handleOnBlur}
        type="text"
      />
    )
  }

export default Products