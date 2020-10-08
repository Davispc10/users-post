import { InputType, Field, Int } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';

import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => Int)
  id: number;
}
