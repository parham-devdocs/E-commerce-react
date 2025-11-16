import TextInput from '../components/textInput'
import Logo from '../components/logo'
import Button from '../components/button'
import { useForm, type SubmitHandler  } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userRegisterSchema } from "../formValidationSchemas";
import  {z} from 'zod';
import { useEffect } from 'react';
import {toast} from 'sonner'; // Import Toaster

type RegisterFormData = z.infer<typeof userRegisterSchema>;

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({ 
    resolver: zodResolver(userRegisterSchema)
  });

  const onSubmit: SubmitHandler<RegisterFormData> = (data) => {
    console.log(data)
    // Handle successful registration logic here
 }

 useEffect(() => {
  // Show toast for each error field if message exists
  if (errors.email?.message) {
    toast.error(errors.email.message, {
      style: {
        backgroundColor: '#fef2f2',
        color: '#b91c1c',
        border: '1px solid #fecaca'
      }
    });
  }
  if (errors.password?.message) {
    toast.error(errors.password.message, {
      style: {
        backgroundColor: '#fef2f2',
        color: '#b91c1c',
        border: '1px solid #fecaca'
      }
    });
  }
  if (errors.repeatedPassword?.message) {
    toast.error(errors.repeatedPassword.message, {
      style: {
        backgroundColor: '#fef2f2',
        color: '#b91c1c',
        border: '1px solid #fecaca'
      }
    });
  }
  // Fixed: Check for phoneNumber errors instead of duplicate email check
  if (errors.phoneNumber?.message) {
    toast.error(errors.phoneNumber.message, {
      style: {
        backgroundColor: '#fef2f2',
        color: '#b91c1c',
        border: '1px solid #fecaca'
      }
    });
  }
  // Fixed: Check for fullName errors
  if (errors.fullName?.message) {
    toast.error(errors.fullName.message, {
      style: {
        backgroundColor: '#fef2f2',
        color: '#b91c1c',
        border: '1px solid #fecaca'
      }
    });
  }
}, [errors]); // Run this effect whenever errors object changes

  return (
    <div className='w-full h-screen flex items-center justify-center  p-4'>
      <form onSubmit={handleSubmit(onSubmit)} className='lg:w-96 w-full rounded-xl border border-red-200 shadow-2xl bg-white dark:bg-gray-800 dark:border-gray-700 flex flex-col gap-6 px-8 py-10 transition-all duration-300 hover:shadow-xl'>
        <div className="flex flex-col items-center gap-4">
          <Logo/>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">ثبت نام</h1> {/* Changed title */}
        </div>
        
        <div className="space-y-4">
        <TextInput 
            type="text"
            id='fullName' 
            {...register("fullName")}
            placeHolder='نام و نام خانوادگی'
            autoComplete="name" // Add autoComplete for full name
          />
           <TextInput 
            type="text" 
            id="phoneNumber" 
            {...register("phoneNumber")}
            placeHolder='شماره تلفن همراه'
            autoComplete="tel" // Add autoComplete for phone
          />
          <TextInput 
            type="email" 
            id='email' 
            {...register("email")}
            placeHolder='ایمیل'
            autoComplete="email" // Add autoComplete for email
          />
          <TextInput 
            type="password" 
            id='password' 
            {...register("password")}
            placeHolder='گذرواژه'
            autoComplete="new-password" // Add autoComplete for password
          />
           <TextInput 
            type="password" 
            id="repeatedPassword"
            {...register("repeatedPassword")}
            placeHolder='تکرار گذرواژه'
            autoComplete="new-password" // Add autoComplete for confirm password
          />
        </div>
        
    
        
        <div className='w-full'>
          <Button 
            style={{size:"md"}} 
            btn={{type:"submit", text:"ثبت نام"}} 
          />
        </div>
        
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
        حساب کاربری ندارید؟ {/* Fixed text */}
          <a href="/login" className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 font-medium transition-colors">
      ورود {/* Link text */}
          </a>
        </div>
      </form>
     
    </div>
  )
}

export default Register