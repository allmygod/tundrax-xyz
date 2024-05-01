import { Entity, Column } from "typeorm";
import { BaseEntity } from "../common/entity/base.entity";

@Entity({ name: 'cats' })
export class Cat extends BaseEntity {
  @Column()
  name: string

  @Column()
  age: number

  @Column()
  breed: string
}