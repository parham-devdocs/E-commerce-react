import { createZodDto } from "nestjs-zod";
import { z } from "zod";
const iranPhoneRegex = /^(\+98|0)?9\d{9}$/;


export const RegisterUserSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.email("Email is not a valid email"),
  address: z.string().min(1, "Address is required"),
  role:z.enum(["user","admin","guest"]).default("guest"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .refine(
      (value) => iranPhoneRegex.test(value),
      {
        message: "Phone number must be a valid Iranian mobile number (e.g., 09123456789 or +989123456789)"
      }
    ),
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
    // Add this field in the schema
confirmPassword: z.string().min(1, "Please confirm your password"),

// Then add a superRefine at the end
}).superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      path: ["confirmPassword"],
      code: "custom",
      message: "Passwords do not match",
    });
  }
});

export class RegisterUserDto extends createZodDto(RegisterUserSchema) {}
