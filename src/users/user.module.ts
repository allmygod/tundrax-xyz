import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Cat } from 'src/cats/cat.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Cat]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
