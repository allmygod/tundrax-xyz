import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../../users/user.entity";
import { AuthTokenDto } from "../dto/auth.token.dto";

@Injectable()
export default class AuthLoginService {
  constructor(protected jwtService: JwtService) {}

  async call(user: User): Promise<AuthTokenDto> {
    const token = this.jwtService.sign({
      email: user.email,
      sub: user.id,
    });

    return Object.assign(new AuthTokenDto(), {
      token: token,
      uid: user.id,
    })
  }
}