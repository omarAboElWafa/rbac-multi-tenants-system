import express, { Express } from "express";
import cors from "cors";
import routes from "./loaders/v1/routes";
import { PORT } from "./config/env";

export const createServer = async (): Promise<Express> => {
  const app: Express = express();
  app.use(cors());
  app.use(express.json());
  routes(app);

  return app;
};

export const startServer = (app: Express): void => {
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
};
