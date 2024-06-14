import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "../user/user.entity";
import { Permission } from "../permission/permission.entity";

@Entity()
export class Role {
  @PrimaryGeneratedColumn("increment")
  id: number = 0;

  @Column({
    length: 50,
    unique: true,
  })
  name: string = "";

  @OneToMany(() => User, (user: User) => user.role)
  users: User[] = [];

  @OneToMany(() => Permission, (permission) => permission.role)
  permissions: Permission[] = [];
}
