import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt'
import { UserService } from 'src/user/user.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private userService: UserService
  ) {
    const secret = configService.get<string>('JWT_SECRET')

    if (!secret) {
      throw new Error('JWT_SECRET is not defined in the environment variables')
    }

    const options: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Проверяет срок действия токена
      secretOrKey: secret,
    }

    super(options)
  }

  async validate({ id }: { id: string }) {
    const user = await this.userService.getById(id)
    if (!user) {
      throw new UnauthorizedException('Invalid token')
    }
    return user
  }
}
