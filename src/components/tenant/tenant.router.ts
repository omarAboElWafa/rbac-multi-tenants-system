import { Router } from "express";
import { verifyAccessToken } from "../../middlewares/auth";
import { validateData, validateParams } from "../../middlewares/validation";
import { manipulateTenantSchema } from "../../libs/schemas/tenant";
import { idParamSchema } from "../../libs/schemas/shared";
import TenantController from "./tenant.controller";

class TenantRouter {
  tenantController: TenantController;
  constructor(tenantController: TenantController) {
    this.tenantController = tenantController;
  }

  getRouter = () => {
    const router = Router();
    // Define the routes
    router.post(
      "/",
      [verifyAccessToken, validateData(manipulateTenantSchema)],
      this.tenantController.createTenant,
    );
    router.get("/", [verifyAccessToken], this.tenantController.getAllTenants);
    router.get(
      "/:id",
      [verifyAccessToken, validateParams(idParamSchema)],
      this.tenantController.getTenant,
    );
    router.patch(
      "/:id",
      [
        verifyAccessToken,
        validateData(manipulateTenantSchema),
        validateParams(idParamSchema),
      ],
      this.tenantController.updateTenant,
    );
    router.delete(
      "/:id",
      [verifyAccessToken, validateParams(idParamSchema)],
      this.tenantController.deleteTenant,
    );
    return router;
  };
}

export default TenantRouter;
