import { createZodDto } from "nestjs-zod";
import z from "zod";
import { ObjectId } from "mongoose";
const objectIdRegex = /^[0-9a-fA-F]{24}$/;
const CartItemSchema=z.object({
    quantity:z.number("quantity must be a number").min(0,"quanity must be at least 0"),
    productId:z.string("product id must be string").min(0,"product id is needed").refine(value=>objectIdRegex.test(value),"this is not a valid object id")
})

export class CreateCartItemDTO extends createZodDto(CartItemSchema) {}
