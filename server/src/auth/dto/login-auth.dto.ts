import { z } from "zod";
import { createZodDto } from "nestjs-zod";


const LoginUserSchema=z.object({
    email:z.email("email must be valid"),
    password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long")
    .refine((value) => /[a-z]/.test(value), {
      message: "Password must contain at least one lowercase letter",
    })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((value) => /\d/.test(value), {
      message: "Password must contain at least one number",
    })
    .refine((value) => /[^a-zA-Z\d]/.test(value) || true, {
      // Optional: require special character. Remove this .refine() if not needed.
      message: "Password must contain at least one special character (e.g., !@#$%^&*)",
    }),
})

export class LoginUserDto extends createZodDto( LoginUserSchema) {}
 