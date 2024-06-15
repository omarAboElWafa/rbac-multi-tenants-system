import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { HASH_SALT_ROUNDS } from "../config/env";
import { IUser } from "@/contracts/user";

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(HASH_SALT_ROUNDS);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string,
) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateAuthToken = async (
  user: IUser,
  secret: string,
  expiresIn: string,
) => {
  const token = jwt.sign({ id: user.id }, secret, { expiresIn: expiresIn });
  return token;
};
