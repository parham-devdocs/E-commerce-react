import { z } from "zod"; // Add new import


export const userLoginSchema = z.object({
    email: z.email().min(1).max(100), // Increased max length for email
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