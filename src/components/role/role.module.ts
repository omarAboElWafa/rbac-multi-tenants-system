import { AppDataSource } from "../../config/data-source";
import { Role } from "./role.entity";
import RoleController from "./role.controller";
import RoleService from "./role.service";
import RoleRouter from "./role.router";

const roleRepository = AppDataSource.getRepository(Role);
const roleService = new RoleService(roleRepository);
const roleController = new RoleController(roleService);
const roleRouter = new RoleRouter(roleController);

export default {
  service: roleService,
  controller: roleController,
  router: roleRouter.getRouter(),
};
