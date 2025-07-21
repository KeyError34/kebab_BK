import Product from "../schemas/productSchema.js";
import { IProduct } from "../models/Product.js";
export class ProductRepository {
  async findAll(): Promise<IProduct[]> {
    return Product.find();
  }

  async findById(id: string): Promise<IProduct | null> {
    return Product.findById(id);
  }

  async create(data: Partial<IProduct>): Promise<IProduct> {
    return Product.create(data);
  }

  async update(id: string, data: Partial<IProduct>): Promise<IProduct | null> {
    return Product.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<IProduct | null> {
    return Product.findByIdAndDelete(id);
  }
}