import { z } from "zod"; // Add new import


export const userLoginSchema = z.object({
    email: z.email().min(1).max(100), 
    password: z
      .string()
      .min(8, { message: "گذرواژه باید حداقل 8 کاراکتر باشد" })
      .max(20, { message: "گذرواژه باید حداکثر 20 کارکتر باشد" })
      .refine(
        (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(value),
        {
          message: "رمز عبور باید حداقل شامل یک حرف کوچک، یک حرف بزرگ، یک رقم و یک کاراکتر ویژه (@$!%*?&) باشد"
        }
      )
  });


export const userRegisterSchema = z.object({
    email: z.string().email().min(1).max(100), 
    password: z
      .string()
      .min(8, { message: "گذرواژه باید حداقل 8 کاراکتر باشد" })
      .max(20, { message: "گذرواژه باید حداکثر 20 کارکتر باشد" })
      .refine(
        (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(value),
        {
          message: "رمز عبور باید حداقل شامل یک حرف کوچک، یک حرف بزرگ، یک رقم و یک کاراکتر ویژه (@$!%*?&) باشد"
        }
      ),
    phoneNumber: z
      .string()
      .regex(/^(?:\+98|98)9\d{9}$/, { 
        message: "شماره تلفن باید با 989 شروع شود و کل آن 11 رقم باشد (مثلاً 989123456789 یا +989123456789)" 
      }),
    
    fullName: z
      .string()
      .min(1, { message: "نام و نام خانوادگی الزامی است" }),
    repeatedPassword: z.string()
}).refine((value) => value.repeatedPassword === value.password, {
    message: "گذرواژه و تکرار گذرواژه باید یکسان باشد",
    path: ["repeatedPassword"]
});