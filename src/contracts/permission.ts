import { Role } from "./role";
import { User } from "./user";

export interface Permission {
  id: number;
  role: Role;
  user: User;
}
