import { IsString, MinLength, MaxLength, IsOptional, Matches } from 'class-validator';

import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string

  @Field()
  @MinLength(8)
  @MaxLength(20)
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    { message: 'password too weak' }
  )
  password: string

  @Field()
  @IsString()
  firstName: string;

  @Field()
  @IsString()
  @IsOptional()
  lastName?: string
}
