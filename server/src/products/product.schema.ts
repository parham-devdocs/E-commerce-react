import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: String, required: true }, 
    discountPercentage: { type: Number, min: 0, max: 100, default: 0 },
    attributes: mongoose.Schema.Types.Mixed,
    inStock: { type: Boolean, default: true },
    count: { type: Number, min: 0, default: 0 },
    images: [{ type: String, required: true }],
    description: { type: String, maxlength: 1000 }
  });