import "reflect-metadata";
import { DataSource } from "typeorm";
import {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DBNAME,
} from "./env";
import entitiesArr from "./entities";

// TypeORM configuration
export const AppDataSource = new DataSource({
  type: "postgres",
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DBNAME,
  synchronize: true,
  logging: true,
  entities: [...entitiesArr],
  subscribers: [],
  migrations: [],
});

// connect to the database
export const connectToDatabase = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();

    console.log("Connected to the database");
  } catch (error) {
    console.error("Failed to connect to the database", error);

    process.exit(1);
  }
};
