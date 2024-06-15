import { Express } from "express";
import userModule from "../../components/user/user.module";

export default (app: Express) => {
  app.use("/v1/users", userModule.router);
};
