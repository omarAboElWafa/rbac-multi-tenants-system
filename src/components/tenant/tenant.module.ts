import TenantController from "./tenant.controller";
import TenantService from "./tenant.service";
import TenantRouter from "./tenant.router";

const tenantService = new TenantService();
const tenantController = new TenantController(tenantService);
const tenantRouter = new TenantRouter(tenantController);

export default {
  service: tenantService,
  controller: tenantController,
  router: tenantRouter.getRouter(),
};
