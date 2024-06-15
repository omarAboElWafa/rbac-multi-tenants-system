import { Express } from "express";
import userModule from "../../components/user/user.module";
import tenantModule from "../../components/tenant/tenant.module";

export default (app: Express) => {
  app.use("/v1/users", userModule.router);
  app.use("/v1/tenants", tenantModule.router);
};
