import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtStrategy } from '../users/jwt.strategy';
import { UserRepository } from './repositories/user.repository';
import { UserMutationResolver, UserQueryResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository
    ]),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 3600
      }
    })
  ],
  providers: [UserMutationResolver, UserQueryResolver, UsersService, JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})
export class UsersModule {}
