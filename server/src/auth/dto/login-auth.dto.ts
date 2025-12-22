import { z } from "zod";
import { createZodDto } from "nestjs-zod";

const PASSWORD_MIN = 8;
const PASSWORD_MAX = 20;
const EMAIL_MAX = 100;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;


const LoginUserSchema=z.object({
  email: z.email("Not a valid email").min(1).max(EMAIL_MAX),
  password: z
    .string()
    .min(1, "Password is required")
    .min(PASSWORD_MIN, "Password must be at least 8 characters long").
    max(PASSWORD_MAX,"Password must be at most 20 characters long")
    .refine((value) => PASSWORD_REGEX.test(value), {
      message: "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (@$!%*?&)",
    }),
})

export class LoginUserDto extends createZodDto( LoginUserSchema) {}
 