import { Permission } from "./permission";

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  permissions: Permission[];
}

export interface IUserInputDTO {
  name: string;
  email: string;
  password: string;
}
