import { GqlAuthGuard } from 'src/users/auth.guard';
import { AuthToken } from 'src/users/entities/authToken.entity';

import { UseGuards, ValidationPipe } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int, ResolveField } from '@nestjs/graphql';

import { CreateUserInput } from './dto/create-user.input';
import { LoginInput } from './dto/login.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserMutation, UserQuery } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => UserMutation)
export class UserMutationResolver {
  constructor (private readonly usersService: UsersService) {}

  @Mutation(() => UserMutation)
  user (): UserMutation {
    return {};
  }

  @ResolveField(() => AuthToken)
  async login (@Args('loginInput', ValidationPipe) loginInput: LoginInput): Promise<AuthToken> {
    return await this.usersService.login(loginInput);
  }

  @ResolveField(() => User)
  async createUser (@Args('createUserInput', ValidationPipe) createUserInput: CreateUserInput): Promise<User> {
    return await this.usersService.create(createUserInput);
  }

  @ResolveField(() => User)
  @UseGuards(GqlAuthGuard)
  async updateUser (@Args('updateUserInput') updateUserInput: UpdateUserInput): Promise<User> {
    return await this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @ResolveField(() => User)
  @UseGuards(GqlAuthGuard)
  async removeUser (@Args('id', { type: () => Int }) id: number): Promise<void> {
    return await this.usersService.remove(id);
  }
}

@Resolver(() => UserQuery)
export class UserQueryResolver {
  constructor (private readonly usersService: UsersService) {}

  @Query(() => UserQuery)
  user (): UserQuery {
    return {};
  }

  @ResolveField(() => [User])
  @UseGuards(GqlAuthGuard)
  async findAll (): Promise<User[]> {
    const users = await this.usersService.findAll();
    console.log(users);
    return users;
  }

  @ResolveField(() => User)
  @UseGuards(GqlAuthGuard)
  async findOne (@Args('id', { type: () => Int }) id: number): Promise<User> {
    return await this.usersService.findOne(id);
  }
}
