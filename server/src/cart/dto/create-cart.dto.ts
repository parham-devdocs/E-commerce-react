import { createZodDto } from "nestjs-zod";
import z from "zod";


const CartItemSchema=z.object({
    quantity:z.number("quantity must be a number").min(0,"quanity must be at least 0")
})

export class CreateCartItemDTO extends createZodDto(CartItemSchema) {}
