import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  ManyToMany,
} from "typeorm";
import { Permission } from "../permission/permission.entity";
import { Role } from "../role/role.entity";
import { Tenant } from "../tenant/tenant.entity";
import { Product } from "../product/product.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("increment")
  id: number = 0;

  @Column({
    length: 50,
  })
  name: string = "";

  @Column({
    unique: true,
  })
  email: string = "";

  @Column()
  password: string = "";

  @ManyToOne(() => Role, (role: Role) => role.users)
  role!: Role;

  @ManyToOne(() => Tenant, (tenant: Tenant) => tenant.users)
  tenant!: Tenant;

  @OneToMany(() => Permission, (permission: Permission) => permission.user)
  permissions!: Permission[];

  @ManyToMany(() => Product, (product) => product.users)
  products!: Product[];
}
