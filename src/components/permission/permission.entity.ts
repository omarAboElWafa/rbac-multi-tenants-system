import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "../user/user.entity";
import { Role } from "../role/role.entity";

@Entity()
export class Permission {
  @PrimaryGeneratedColumn("increment")
  id: number = 0;

  @Column({
    length: 50,
  })
  name: string = "";

  @ManyToOne(() => User, (user: User) => user.permissions)
  user!: User;

  @ManyToOne(() => Role, (role: Role) => role.permissions)
  role!: Role;
}
