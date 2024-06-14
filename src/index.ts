import { connectToDatabase } from "./config/data-source";
import { createServer, startServer } from "./server";

const init = async (): Promise<void> => {
  await connectToDatabase();
  const app = await createServer();
  startServer(app);
};

init().catch((error) => {
  console.error("Failed to start the server", error);

  process.exit(1);
});
