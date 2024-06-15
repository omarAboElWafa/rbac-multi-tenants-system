import { AppDataSource } from "../../config/data-source";
import { User } from "./user.entity";
import { Tenant } from "../tenant/tenant.entity";
import { Role } from "../role/role.entity";
import { Permission } from "../permission/permission.entity";
import UserController from "./user.controller";
import UserService from "./user.service";
import TenantService from "../tenant/tenant.service";
import UserRouter from "./user.router";

// Get the repositories (dependencies)
const userRepository = AppDataSource.getRepository(User);
const tenantRepository = AppDataSource.getRepository(Tenant);
const roleRepository = AppDataSource.getRepository(Role);
const permissionRepository = AppDataSource.getRepository(Permission);

const userService = new UserService(
  userRepository,
  tenantRepository,
  roleRepository,
  permissionRepository,
);
const tenantService = new TenantService();
const userController = new UserController(userService, tenantService);
const userRouter = new UserRouter(userController);

export default {
  service: userService,
  controller: userController,
  router: userRouter.getRouter(),
};
