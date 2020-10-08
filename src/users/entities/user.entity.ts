import * as bcrypt from 'bcrypt';
import { Post } from 'src/posts/entities/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { ObjectType, Field, Int } from '@nestjs/graphql';

import { AuthToken } from './authToken.entity';

@ObjectType()
@Entity()
@Unique(['username'])
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ nullable: false })
  username: string

  @Field()
  @Column({ nullable: false })
  password: string

  @Field({ nullable: false })
  @Column({ nullable: false })
  firstName: string

  @Field({ nullable: true })
  @Column()
  lastName?: string

  @Column()
  salt: string

  @Field(() => [Post])
  @OneToMany(() => Post, post => post.user)
  posts: Post[]

  async validatePassword (password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}

@ObjectType()
export class UserMutation {
  @Field(() => AuthToken)
  login?: AuthToken

  @Field(() => User)
  createUser?: User

  @Field(() => User)
  updateUser?: User

  @Field(() => User)
  removeUser?: User
}

@ObjectType()
export class UserQuery {
  @Field(() => [User])
  findAll?: User[]

  @Field(() => User)
  findOne?: User
}
