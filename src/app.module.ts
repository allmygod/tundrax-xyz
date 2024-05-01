import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { CoreModule } from './core/core.module'
import { Connection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TYPEORM_MODULE_OPTIONS } from './config/database';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(TYPEORM_MODULE_OPTIONS),
    CoreModule,
    AuthModule,
    CatsModule,
    UserModule
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
