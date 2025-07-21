import { Request, Response } from 'express';
import { ProductService } from '../services/productServise.js';

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  getAll = async (req: Request, res: Response) => {
    const products = await this.productService.getAllProducts();
    res.json(products);
  };

  getOne = async (req: Request, res: Response) => {
    const product = await this.productService.getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  };

  create = async (req: Request, res: Response) => {
    const product = await this.productService.createProduct(req.body);
    res.status(201).json(product);
  };

  update = async (req: Request, res: Response) => {
    const product = await this.productService.updateProduct(req.params.id, req.body);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  };

  delete = async (req: Request, res: Response) => {
    const product = await this.productService.deleteProduct(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  };
}