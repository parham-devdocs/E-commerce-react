// Register.tsx
import TextInput from "../../components/textInput";
import Logo from "../../components/logo";
import Button from "../../components/button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userRegisterSchema } from "../../formValidationSchemas";
import { useEffect } from "react";
import { toast } from "sonner";
import { useRegisterUser } from "../../queries/userQueries";
import { useNavigate } from "react-router-dom";
import type { RegisterFormData } from "../../api/userApis";


const Register = () => {
  const { mutate, isPending,error } = useRegisterUser();
const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(userRegisterSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormData> = (data) => {

    mutate(data)
   if (!error) {
    navigate("/")
   }

      };

  // Show form validation errors via react-hook-form
  useEffect(() => {
    if (errors.email?.message) toast.error(errors.email.message);
    if (errors.password?.message) toast.error(errors.password.message);
    if (errors.confirmPassword?.message) toast.error(errors.confirmPassword.message);
    if (errors.phoneNumber?.message) toast.error(errors.phoneNumber.message);
    if (errors.fullName?.message) toast.error(errors.fullName.message);
    if (errors.address?.message) toast.error(errors.address.message); // ✅ Add address error
  }, [errors]);

  return (
    <div className="w-full h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:w-96 w-full rounded-xl border border-red-200 shadow-2xl bg-white dark:bg-gray-800 dark:border-gray-700 flex flex-col gap-6 px-8 py-10 transition-all duration-300 hover:shadow-xl"
      >
        <div className="flex flex-col items-center gap-4">
          <Logo />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            ثبت نام
          </h1>
        </div>

        <div className="space-y-4">
          <TextInput
            type="text"
            id="fullName"
            {...register("fullName")}
            placeHolder="نام و نام خانوادگی"
            autoComplete="name"
          />
          <TextInput
            type="text"
            id="phoneNumber"
            {...register("phoneNumber")}
            placeHolder="شماره تلفن همراه"
            autoComplete="tel"
          />
          <TextInput
            type="email"
            id="email"
            {...register("email")}
            placeHolder="ایمیل"
            autoComplete="email"
          />
          <TextInput
            type="text"
            id="address"
            {...register("address")}
            placeHolder="آدرس"
            autoComplete="address"
          />
          <TextInput
            type="password"
            id="password"
            {...register("password")}
            placeHolder="گذرواژه"
            autoComplete="new-password"
          />
          <TextInput
            type="password"
            id="confirmPassword" // ✅ Match field name
            {...register("confirmPassword")}
            placeHolder="تکرار گذرواژه"
            autoComplete="new-password"
          />
        </div>

        <div className="w-full">
          <Button
            style={{ size: "md" }}
            btn={{ type: "submit", text: isPending ? "در حال ثبت..." : "ثبت نام" }}
          />
        </div>

        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          حساب کاربری دارید؟
          <a
            href="/login"
            className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 font-medium transition-colors mr-1"
          >
            ورود
          </a>
        </div>
      </form>
    </div>
  );
};

export default Register;