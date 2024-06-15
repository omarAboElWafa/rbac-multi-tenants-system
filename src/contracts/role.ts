import { IUser } from "./user";

export interface Role {
  id: number;
  name: string;
  users: IUser[];
}

export interface IRoleInputDTO {
  name: string;
}
