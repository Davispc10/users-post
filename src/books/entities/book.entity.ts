import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Book {
  @ObjectIdColumn()
  _id: string

  @Field()
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  title: string

  @Field()
  @Column()
  description: string
}
