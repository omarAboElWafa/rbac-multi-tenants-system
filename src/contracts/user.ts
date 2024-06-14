import { Permission } from "./permission";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  permissions: Permission[];
}
