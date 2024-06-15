import dotenv from "dotenv";
dotenv.config();

export const NODE_ENV: string = process.env.NODE_ENV as string;
export const PORT: number = parseInt(process.env.PORT as string, 10) || 5050;
export const POSTGRES_HOST: string = process.env.POSTGRES_HOST as string;
export const POSTGRES_PORT: number = parseInt(
  process.env.POSTGRES_PORT as string,
  10,
);
export const POSTGRES_USER: string = process.env.POSTGRES_USER as string;
export const POSTGRES_PASSWORD: string = process.env
  .POSTGRES_PASSWORD as string;
export const POSTGRES_DBNAME: string = process.env.POSTGRES_DBNAME as string;

export const REDIS_HOST: string = process.env.REDIS_HOST as string;
export const REDIS_PORT: number = parseInt(
  process.env.REDIS_PORT as string,
  10,
);
export const redisConfig = { host: REDIS_HOST, port: REDIS_PORT };

export const JWT_SECRET: string = process.env.JWT_SECRET as string;
export const JWT_EXPIRATION: string = process.env.JWT_EXPIRATION as string;

export const ACCESS_TOKEN_EXPIRY: string = process.env
  .ACCESS_TOKEN_EXPIRY as string;

export const REFRESH_TOKEN_EXPIRY: string = process.env
  .REFRESH_TOKEN_EXPIRY as string;

export const ACCESS_TOKEN_EXPIRY_FOR_CACHE: number = parseInt(
  process.env.ACCESS_TOKEN_EXPIRY_FOR_CACHE as string,
  10,
);

export const REFRESH_TOKEN_EXPIRY_FOR_CACHE: number = parseInt(
  process.env.REFRESH_TOKEN_EXPIRY_FOR_CACHE as string,
  10,
);

export const HASH_SALT_ROUNDS: number = parseInt(
  process.env.HASH_SALT_ROUNDS as string,
  10,
);
