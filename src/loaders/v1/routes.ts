import { Express } from "express";
import userModule from "../../components/user/user.module";
import tenantModule from "../../components/tenant/tenant.module";
import productModule from "../../components/product/product.module";
import roleModule from "../../components/role/role.module";

export default (app: Express) => {
  app.use("/v1/users", userModule.router);
  app.use("/v1/tenants", tenantModule.router);
  app.use("/v1/products", productModule.router);
  app.use("/v1/roles", roleModule.router);
};
