import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';

import { IJwtPayload } from './interfaces/jwtPayload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor (
    @InjectRepository(User)
    private readonly user: Repository<User>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topSecret51'
    });
  }

  async validate (payload: IJwtPayload): Promise<User> {
    const { username } = payload;
    const user = await this.user.findOne({ username });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
