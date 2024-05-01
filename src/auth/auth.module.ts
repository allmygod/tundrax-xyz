import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { User } from "../users/user.entity";
import { JWT_SECRET } from "./secret.key";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";
import { JwtStrategy } from "./jwt.strategy";


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '3h' }
    })
  ],
  controllers: [ AuthController ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy
  ],
  exports: [ AuthService ]
})
export class AuthModule {
}