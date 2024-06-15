import { Router } from "express";
import { verifyAccessToken } from "../../middlewares/auth";
import { validateData, validateParams } from "../../middlewares/validation";
import { productSchema, updateProductSchema } from "../../libs/schemas/product";
import { idParamSchema } from "../../libs/schemas/shared";
import ProductController from "./product.controller";

class ProductRouter {
  productController: ProductController;
  constructor(productController: ProductController) {
    this.productController = productController;
  }
  getRouter = () => {
    const router = Router();
    // Define the routes
    router.post(
      "/",
      [verifyAccessToken, validateData(productSchema)],
      this.productController.createProduct,
    );
    router.get("/", [verifyAccessToken], this.productController.getProducts);
    router.get(
      "/:id",
      [verifyAccessToken, validateParams(idParamSchema)],
      this.productController.getProduct,
    );
    router.patch(
      "/:id",
      [
        verifyAccessToken,
        validateData(updateProductSchema),
        validateParams(idParamSchema),
      ],
      this.productController.updateProduct,
    );
    router.delete(
      "/:id",
      [verifyAccessToken, validateParams(idParamSchema)],
      this.productController.deleteProduct,
    );
    return router;
  };
}

export default ProductRouter;
