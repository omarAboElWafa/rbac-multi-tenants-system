import { Router } from "express";
import { verifyAccessToken } from "../../middlewares/auth";
import { validateData } from "../../middlewares/validation";
import {
  userRegisterationSchema,
  userLoginSchema,
} from "../../libs/schemas/user";
import UserController from "./user.controller";

class UserRouter {
  userController: UserController;
  constructor(UserController: UserController) {
    this.userController = UserController;
  }
  getRouter = () => {
    const router = Router();
    // Define the routes
    router.post(
      "/register",
      [validateData(userRegisterationSchema)],
      this.userController.register,
    );
    router.post(
      "/login",
      [validateData(userLoginSchema)],
      this.userController.login,
    );
    router.get("/logout", [verifyAccessToken], this.userController.logout);
    router.get("/me", [verifyAccessToken], this.userController.me);
    // router.patch(
    //   "/profile",
    //   [verifyAccessToken],
    //   this.userController.updateProfile,
    // );
    // router.post(
    //   "/refresh-token",
    //   [verifyRefreshToken],
    //   this.userController.refreshToken,
    // );
    // router.post(
    //   "/change-password",
    //   [verifyAccessToken],
    //   this.userController.changePassword,
    // );
    // router.post("/forgot-password", this.userController.forgotPassword);
    // router.post("/reset-password", this.userController.resetPassword);
    return router;
  };
}

export default UserRouter;
