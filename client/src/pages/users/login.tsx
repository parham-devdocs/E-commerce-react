import TextInput from "../../components/textInput";
import Logo from "../../components/logo";
import Button from "../../components/button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userLoginSchema } from "../../formValidationSchemas";
import { z } from "zod";
import { useEffect } from "react";
import { toast } from "sonner";

type LoginFormData = z.infer<typeof userLoginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(userLoginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    console.log(data);
  };

  useEffect(() => {
    if (errors.email?.message) {
      toast.error(errors.email.message, {
        // Customize this toast's appearance
        style: {
          backgroundColor: "#fef2f2", // Example: Light red background
          color: "#b91c1c", // Example: Dark red text
          border: "1px solid #fecaca", // Example: Red border
        },
      });
    }
    if (errors.password?.message) {
      toast.error(errors.password.message, {
        // Customize this toast's appearance
        style: {
          backgroundColor: "#fef2f2",
          color: "#b91c1c",
          border: "1px solid #fecaca",
        },
      });
    }
  }, [errors]); // Run this effect whenever errors object changes

  return (
    <div className="w-full h-screen flex items-center justify-center  p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:w-96 w-full rounded-xl border border-red-200 shadow-2xl bg-white dark:bg-gray-800 dark:border-gray-700 flex flex-col gap-6 px-8 py-10 transition-all duration-300 hover:shadow-xl"
      >
        <div className="flex flex-col items-center gap-4">
          <Logo />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            خوش آمدید
          </h1>
        </div>

        <div className="space-y-4">
          <TextInput
            autoComplete="email"
            type="email"
            id="email"
            {...register("email")}
            placeHolder="ایمیل"
          />
          <TextInput
            autoComplete="new-password"
            type="password"
            id="password"
            {...register("password")}
            placeHolder="گذرواژه"
          />
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
          <a
            href="#"
            className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors"
          >
            رمز عبور را فراموش کرده‌اید؟
          </a>
        </div>

        <div className="w-full">
          <Button
            style={{ size: "md" }}
            btn={{ type: "submit", text: "ورود" }}
          />
        </div>

        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          حساب کاربری ندارید؟{" "}
          <a
            href="/register"
            className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 font-medium transition-colors"
          >
            ثبت نام کنید
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
