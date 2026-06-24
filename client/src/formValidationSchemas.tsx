import { z } from "zod";

const PASSWORD_MIN = 8;
const PASSWORD_MAX = 20;
const EMAIL_MAX = 100;
const PHONE_REGEX = /^(?:\+98|98|0)?9\d{9}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

export const userRegisterSchema = z
  .object({
    email: z.string().email({ message: "ایمیل معتبر نیست" }).min(1).max(EMAIL_MAX),
      password: z
      .string()
      .min(PASSWORD_MIN, { message: "گذرواژه باید حداقل 8 کاراکتر باشد" })
      .max(PASSWORD_MAX, { message: "گذرواژه باید حداکثر 20 کاراکتر باشد" })
      .refine((value) => PASSWORD_REGEX.test(value), {
        message: "رمز عبور باید حداقل شامل یک حرف کوچک، یک حرف بزرگ، یک رقم و یک کاراکتر ویژه (@$!%*?&) باشد",
      }),
    phoneNumber: z.string().regex(PHONE_REGEX, {
      message: "شماره تلفن باید یک شماره موبایل معتبر ایرانی باشد (مثلاً 09123456789 یا +989123456789)",
    }),
    address:z.string("adress must be a string").min(1,"address is a must"),
    fullName: z.string().min(1, { message: "نام و نام خانوادگی الزامی است" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "گذرواژه و تکرار گذرواژه باید یکسان باشد",
    path: ["repeatedPassword"],
  })

  export const userLoginSchema = z
  .object({
    email: z.email({ message: "ایمیل معتبر نیست" }).min(1).max(EMAIL_MAX),
    password: z
      .string()
      .min(PASSWORD_MIN, { message: "گذرواژه باید حداقل 8 کاراکتر باشد" })
      .max(PASSWORD_MAX, { message: "گذرواژه باید حداکثر 20 کاراکتر باشد" })
      .refine((value) => PASSWORD_REGEX.test(value), {
        message: "رمز عبور باید حداقل شامل یک حرف کوچک، یک حرف بزرگ، یک رقم و یک کاراکتر ویژه (@$!%*?&) باشد",
      })})


export const createProductSchema = z.object({
  name: z.string().min(2, "نام محصول باید حداقل 2 کاراکتر باشد"),
  brand: z.string().min(2, "برند باید حداقل 2 کاراکتر باشد"),
  price: z.number().min(1000, "قیمت باید حداقل 1000 تومان باشد"),
  count: z.number().min(0, "تعداد نمی‌تواند منفی باشد"),
  discountPercentage: z.number().min(0).max(100).optional(),
  category: z.string().min(1, "لطفاً دسته‌بندی را انتخاب کنید"),
  description: z.string().min(10, "توضیحات باید حداقل 10 کاراکتر باشد"),
  attributes: z.array(
    z.object({
      key: z.string(),
      value: z.string()
    })
  ).optional()
});