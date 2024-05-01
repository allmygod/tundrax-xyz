import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/users/user.entity";
import { Cat } from "src/cats/cat.entity";

export const TYPEORM_MODULE_OPTIONS: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'tundrax',
  entities: [User, Cat],
  synchronize: true,
}