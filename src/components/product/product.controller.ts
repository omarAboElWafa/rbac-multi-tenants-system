import { Request, Response } from "express";
import ProductService from "./product.service";
import { IProductInputDTO } from "../../contracts/product";

class ProductController {
  productService: ProductService;
  constructor(productService: ProductService) {
    this.productService = productService;
  }

  createProduct = async (req: Request, res: Response) => {
    try {
      const productInput: IProductInputDTO = req.body;
      const product = await this.productService.createProduct(productInput);
      return res
        .status(201)
        .json({ message: "Product created", data: product });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }
  };

  getProducts = async (req: Request, res: Response) => {
    try {
      const products = await this.productService.getProducts();
      return res.status(200).json({
        message: "List of products",
        data: products,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }
  };

  getProduct = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const product = await this.productService.getProduct(parseInt(id));
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json({
        message: "Product found",
        data: product,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }
  };

  updateProduct = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const productInput: IProductInputDTO = req.body;
      const product = await this.productService.updateProduct(
        parseInt(id),
        productInput,
      );
      return res
        .status(200)
        .json({ message: "Product updated", data: product });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }
  };

  deleteProduct = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.productService.deleteProduct(parseInt(id));
      return res.status(204).json({ message: "Product deleted" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }
  };
}

export default ProductController;
