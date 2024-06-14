import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "../user/user.entity";

@Entity()
export class Tenant {
  @PrimaryGeneratedColumn("increment")
  id: number = 0;

  @Column({
    length: 50,
    unique: true,
  })
  name: string = "";

  @OneToMany(() => User, (user) => user.tenant)
  users: User[] = [];
}
