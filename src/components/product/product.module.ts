import { AppDataSource } from "../../config/data-source";
import { Product } from "./product.entity";
import ProductController from "./product.controller";
import ProductService from "./product.service";
import ProductRouter from "./product.router";

const productRepository = AppDataSource.getRepository(Product);
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);
const productRouter = new ProductRouter(productController);

export default {
  service: productService,
  controller: productController,
  router: productRouter.getRouter(),
};
