import { z } from "zod";
import { createZodDto } from "nestjs-zod";

const PASSWORD_MIN = 8;
const PASSWORD_MAX = 20;
const EMAIL_MAX = 100;
const PHONE_REGEX = /^(?:\+98|98|0)?9\d{9}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

export const RegisterUserSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.email("Not a valid email").min(1).max(EMAIL_MAX),
    address: z.string().min(1, "Address is required"),
    role: z.enum(["user", "admin", "guest"]).default("guest"),
    phoneNumber: z
      .string()
      .min(1, "Phone number is required")
      .refine((value) => PHONE_REGEX.test(value), {
        message: "Phone number must be a valid Iranian mobile number (e.g., 09123456789 or +989123456789)",
      }),
    password: z
      .string()
      .min(1, "Password is required")
      .min(PASSWORD_MIN, "Password must be at least 8 characters long")
      .max(PASSWORD_MAX, "Password must be at most 20 characters long")
      .refine((value) => PASSWORD_REGEX.test(value), {
        message: "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (@$!%*?&)",
      }),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: "custom",
        message: "Passwords do not match",
      });
    }
  });

export class RegisterUserDto extends createZodDto(RegisterUserSchema) {}