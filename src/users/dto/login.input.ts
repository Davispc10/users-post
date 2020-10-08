import { IsString } from 'class-validator';

import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field()
  @IsString()
  username: string;

  @Field()
  @IsString()
  password: string
}
