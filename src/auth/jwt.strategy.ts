import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { JWT_SECRET } from './secret.key'
import { Repository } from 'typeorm'
import { User } from '../users/user.entity'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreException: false,
      secretOrKey: JWT_SECRET,
    })
  }

  async validate(payload: any): Promise<any> {
    const user = await this.userRepository.findOneBy({id: payload.sub});
    return {
      id: payload.sub,
      email: payload.email,
      roles: user.roles,
    }
  }
}