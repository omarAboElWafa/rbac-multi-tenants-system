import { Role } from "./role";
import { IUser } from "./user";

export interface Permission {
  id: number;
  role: Role;
  user: IUser;
}
