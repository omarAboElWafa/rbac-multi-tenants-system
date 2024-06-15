import { Router } from "express";
import { verifyAccessToken } from "../../middlewares/auth";
import { validateData } from "../../middlewares/validation";
import { roleSchema } from "../../libs/schemas/role";
import RoleController from "./role.controller";

class RoleRouter {
  roleController: RoleController;
  constructor(roleController: RoleController) {
    this.roleController = roleController;
  }
  getRouter = () => {
    const router = Router();
    // Define the routes
    router.post(
      "/",
      [verifyAccessToken, validateData(roleSchema)],
      this.roleController.createRole,
    );
    router.get("/", [verifyAccessToken], this.roleController.getRoles);
    router.get("/:id", [verifyAccessToken], this.roleController.getRole);
    router.patch(
      "/:id",
      [verifyAccessToken, validateData(roleSchema)],
      this.roleController.updateRole,
    );
    router.delete("/:id", [verifyAccessToken], this.roleController.deleteRole);
    return router;
  };
}

export default RoleRouter;
