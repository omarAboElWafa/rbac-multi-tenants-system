import { Role } from "@/components/role/role.entity";
import { Permission } from "./permission";
import { ITenant } from "./tenant";

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  permissions: Permission[];
  role: Role;
  tenant: ITenant;
}

export interface IUserInputDTO {
  name: string;
  email: string;
  password: string;
}
