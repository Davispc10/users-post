import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';

import { ConflictException, InternalServerErrorException } from '@nestjs/common';

import { CreateUserInput } from '../dto/create-user.input';
import { LoginInput } from '../dto/login.input';
import { UpdateUserInput } from '../dto/update-user.input';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser (createUserInput: CreateUserInput): Promise<User> {
    const newUser = await this.create(createUserInput);
    newUser.salt = await bcrypt.genSalt();
    newUser.password = await this.hashPassword(createUserInput.password, newUser.salt);

    try {
      return await this.save(newUser);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists!');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async updateUser (id: number, updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.findOne(id);

    user.firstName = updateUserInput.firstName;
    user.lastName = updateUserInput.lastName;
    user.username = updateUserInput.username;

    const loginInput: LoginInput = {
      username: updateUserInput.username,
      password: updateUserInput.password
    };

    if (user.password && this.validateUserPassword(loginInput)) {
      user.password = await this.hashPassword(updateUserInput.password, user.salt);
    }

    try {
      return await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists!');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  private async hashPassword (password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  async validateUserPassword (loginInput: LoginInput): Promise<string> {
    const { username, password } = loginInput;
    const user = await this.findOne({ username });

    if (user && await user.validatePassword(password)) {
      return user.username;
    } else {
      return null;
    }
  }
}
