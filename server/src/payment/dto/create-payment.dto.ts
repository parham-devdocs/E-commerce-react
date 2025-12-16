import { createZodDto } from "nestjs-zod";
import z from "zod";

const invoice = z.object({
 cart:z.string("must be a string").min(0,"this is necessary"),
  price: z
    .number({ message: " price must be a number" })
    .nonnegative("Total price cannot be negative"),

  discount: z
    .number({ message: "Discount must be a number" })
    .nonnegative("Discount cannot be negative")
    .refine((val) => val >= 0, { message: "Discount must be non-negative" }),

})


export class createInvoiceDTO  extends createZodDto(invoice) {}