

import Input from '../../components/admin/input'
import { useGetCategories } from '../../queries/categoryQueries'
import Loader from '../../components/loader'
import { type Category, type CreateProductFormData } from "../../types";
import Header from '../../components/header';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useController, useForm, type Control, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createProductSchema } from '../../formValidationSchemas';
import { toast } from 'sonner';
import { useRegisterUser } from '../../queries/userQueries';

const CreateProduct = () => {
  const { mutate, isPending,error } = useRegisterUser();
  const navigate=useNavigate()

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<CreateProductFormData>({
      resolver: zodResolver(createProductSchema),
    });
    useEffect(() => {
    if (errors.name?.message) toast.error(errors.name.message);
    if (errors.brand?.message) toast.error(errors.brand.message);
    if (errors.category?.message) toast.error(errors.category.message);
    if (errors.count?.message) toast.error(errors.count.message);
    if (errors.description?.message) toast.error(errors.description.message);
    if (errors.price?.message) toast.error(errors.price.message); 
    if (errors.discountPercentage?.message) toast.error(errors.discountPercentage.message); 
    if (errors.attributes?.message) toast.error(errors.attributes.message); 

  }, [errors]);

    const onSubmit: SubmitHandler<CreateProductFormData> = (data) => {
  
      mutate(data)
     if (!error) {
      navigate("/")
     }
  
        };
    
    const {data:categories,isError,isLoading}=useGetCategories()
if (isLoading ) {
  return <Loader size="lg"/>
}
if (isError && !categories) {
  return <p>something is wrong with server</p>
}
  return (
    <form className="flex  flex-col  w-full items-center justify-center"         onSubmit={handleSubmit(onSubmit)}>
      <Header title='اضافه کردن محصول'/>
    <div className="w-full max-w-6xl">
      <div className="flex flex-col lg:flex-row justify-between w-full gap-8">
      <div className="flex flex-col gap-5 w-full lg:w-1/2">
          <Input placeHolder='تعداد' {...register("count")} value={""} onChangeHandler={()=>{console.log("f")}} type="number" autoComplete='' id='name2'/>
          <Input placeHolder='قیمت' value={""} {...register("price")} onChangeHandler={()=>{console.log("f")}} type="number" autoComplete='' id='price2'/>
          <Input placeHolder='درصد تخفیف' value={""} {...register("discountPercentage")} onChangeHandler={()=>{console.log("f")}} type="number" autoComplete='' id='discount2'/>
        </div>
        <div className="flex flex-col gap-5 w-full lg:w-1/2">
          <Input placeHolder='نام محصول' value={""} {...register("name")} onChangeHandler={()=>{console.log("f")}} type="text" autoComplete='' id='name1'/>
          <Input placeHolder='برند' value={""} {...register("brand")} onChangeHandler={()=>{console.log("f")}} type="text" autoComplete='' id='brand1'/>
          {categories && <CategoriesSelectionBox {...register("category")} placeHolder='دسته بندی' onChangeHandler={(e)=>console.log(e)} categories={categories}/>}
        </div>
  
        
      </div>
      <div className="flex flex-col gap-5 mt-5 w-full">
        <textarea rows={5} placeholder='توضیحات' {...register("description")} className="w-full text-right rounded-md border-2 border-red-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 dark:focus:ring-red-400 dark:text-gray-100 transition-all duration-200 peer"  />
        <AddAttribute  {...register("attributes")}/>
       
        </div>
    </div>
  </form>
  )
}

export default CreateProduct




interface Props {
  categories: Category[];
  onChangeHandler: (categoryId: string) => void;
  placeHolder:string
}

const CategoriesSelectionBox = ({ categories, onChangeHandler}: Props) => {
  return (
    <select onChange={(e) => onChangeHandler(e.target.value)}         className="w-full h-12 text-right rounded-md border-2 border-red-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 dark:focus:ring-red-400 dark:text-gray-100 transition-all duration-200 peer">
   <option 
    className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
  >
    دسته بندی
  </option>
  {categories.map((cat) => (
    <option 
      key={cat._id} 
      value={cat._id}
      className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
    >
      {cat.title}
    </option>
      ))}
    </select>
  );
};



// AddAttribute.tsx (or inline)

interface AddAttributeProps {
  name: string; // e.g., "attributes"
  control: Control<CreateProductFormData>; // 👈 import Control from 'react-hook-form'

}

const AddAttribute = ({ name,control }: AddAttributeProps) => {
  const { field } = useController({ name,control });
  const [attributes, setAttributes] = useState<{ key: string; value: string }[]>(field.value || [{ key: '', value: '' }]);

  // Sync local state → RHF when it changes
  useEffect(() => {
    field.onChange(attributes);
  }, [attributes, field]);

  const handleAttributeChange = (index: number, field: 'key' | 'value', value: string) => {
    const newAttributes = [...attributes];
    newAttributes[index][field] = value;
    setAttributes(newAttributes);
  };

  const addAttribute = () => {
    setAttributes([...attributes, { key: '', value: '' }]);
  };

  const removeAttribute = (index: number) => {
    if (attributes.length <= 1) return;
    setAttributes(attributes.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full">
      <Header title="ویژگی ها" />
      <div className="mt-4 space-y-3">
        {attributes.map((attr, index) => (
          <div key={index} className="flex gap-3 items-center w-full">
            <Input
              id={""}
              placeHolder="کلید ویژگی (مثلاً رنگ)"
              value={attr.key}
              onChangeHandler={(e) => handleAttributeChange(index, 'key', e.target.value)}
              type="text"
            />
            <div className="flex gap-2 items-center flex-1">
              <Input
               id={""}
                placeHolder="مقدار ویژگی (مثلاً قرمز)"
                value={attr.value}
                onChangeHandler={(e) => handleAttributeChange(index, 'value', e.target.value)}
                type="text"
              />
              {attributes.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeAttribute(index)}
                  className="text-red-500 hover:text-red-700 text-xl w-8 h-8 flex items-center justify-center"
                  aria-label="حذف ویژگی"
                >
                  &times;
                </button>
              )}
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addAttribute}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          + افزودن ویژگی
        </button>
      </div>
    </div>
  );
};
