import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AuthRegisterDto } from "./dto/auth.register.dto";
import { AuthTokenDto } from "./dto/auth.token.dto";
import { User } from "../users/user.entity";
import AuthRegisterService from "./service/auth.register.service";
import AuthLoginService from "./service/auth.login.service";
import AuthValidateUserService from "./service/auth.validate-user.service";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  public async register(params: AuthRegisterDto): Promise<User> {
    return new AuthRegisterService(this.userRepository).call(params);
  }

  public async login(user: User): Promise<AuthTokenDto> {
    return new AuthLoginService(this.jwtService).call(user);
  }

  async validateUser(email: string, password: string) : Promise<User> {
    return new AuthValidateUserService(this.userRepository).call(email, password);
  }
}