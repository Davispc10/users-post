import { LoginInput } from 'src/users/dto/login.input';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { AuthToken } from './entities/authToken.entity';
import { User } from './entities/user.entity';
import { IJwtPayload } from './interfaces/jwtPayload.interface';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UsersService {
  constructor (
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async login (loginInput: LoginInput): Promise<AuthToken> {
    const username = await this.userRepository.validateUserPassword(loginInput);

    if (!username) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const payload: IJwtPayload = { username };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken, username };
  }

  async create (createUserInput: CreateUserInput): Promise<User> {
    const user = this.userRepository.createUser(createUserInput);

    return user;
  }

  async findAll (): Promise<User[]> {
    return await this.userRepository.find({ relations: ['posts'] });
  }

  async findOne (id: number): Promise<User> {
    return await this.userRepository.findOne(id, { relations: ['posts'] });
  }

  async findByUsername (username: string): Promise<User> {
    return await this.userRepository.findOne({ username }, { relations: ['posts'] });
  }

  async update (id: number, updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.userRepository.updateUser(id, updateUserInput);

    return user;
  }

  async remove (id: number): Promise<void> {
    await this.userRepository.delete({ id });
  }
}
