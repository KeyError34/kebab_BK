import { Request, Response } from 'express';
import { ProductService } from '../services/productServise.js';
import { FileCompressor } from '../../../core/utils/fileCompressor.js';
import { FileUploader } from '../../../core/utils/fileUploader.js';

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

  // create = async (req: Request, res: Response) => {
  //   const product = await this.productService.createProduct(req.body);
  //   res.status(201).json(product);
  // };
  create = async (req: Request, res: Response) => {
    try {
      let imageUrl = req.body.image;
      console.log('go')
      if (req.file) {
        const isVideo = req.file.mimetype.startsWith('video');
        const buffer = req.file.buffer;

        const compressed = isVideo
          ? await FileCompressor.compressVideo(buffer)
          : await FileCompressor.compressImage(buffer);

        imageUrl = await FileUploader.uploadToCloudinary(
          compressed,
          isVideo ? 'video' : 'image'
        );
      }

      const product = await this.productService.createProduct({
        ...req.body,
        image: imageUrl,
      });

      res.status(201).json(product);
    } catch (err: any) {
      console.error('Create product error:', err);
      res.status(500).json({ message: err.message });
    }
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