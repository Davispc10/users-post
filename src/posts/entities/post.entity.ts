import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Post {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ nullable: false })
  title: string

  @Field()
  @Column({ nullable: false })
  content: string

  @Field(() => User)
  @ManyToOne(() => User, user => user.posts)
  user: User
}
