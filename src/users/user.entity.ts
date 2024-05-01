import { Entity, Column, ManyToMany, JoinTable } from "typeorm";
import { BaseEntity } from "../common/entity/base.entity";
import { Cat } from "../cats/cat.entity";

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({
    unique: true
  })
  email: string

  @Column({ length: 100, nullable: true })
  passwordHash: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column("text", { array: true, default: [] })
  roles: string[]

  @ManyToMany(() => Cat)
  @JoinTable()
  favorites: Cat[]
}