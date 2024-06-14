import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "../user/user.entity";

@Entity()
export class Product {
  @PrimaryGeneratedColumn("increment")
  id: number = 0;

  @Column({
    length: 100,
  })
  name: string = "";

  @Column("text")
  description: string = "";

  @Column("decimal", { precision: 10, scale: 2 })
  price: number = 0.0;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date = new Date();

  @ManyToMany(() => User, (user) => user.products)
  @JoinTable()
  users!: User[];
}
