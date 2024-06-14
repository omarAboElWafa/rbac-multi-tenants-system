import express, { Express } from "express";
import cors from "cors";
import routes from "./loaders/v1/routes";
import { PORT } from "./config/env";

async function startServer(): Promise<void> {
  const app: Express = express();
  app.use(cors());
  app.use(express.json());
  routes(app);
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start the server", error);
  process.exit(1);
});
