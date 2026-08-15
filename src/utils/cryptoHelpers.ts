import bcrypt from "bcryptjs";
import { IAuthTokenSigner } from "@/domain/auth-token-signer";
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

export const generateAuthToken = (user: IUser, tokenSigner: IAuthTokenSigner) =>
  tokenSigner.signToken({ id: user.id });
