import { InputType, Field, Int } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';

import { CreateBookInput } from './create-book.input';

@InputType()
export class UpdateBookInput extends PartialType(CreateBookInput) {
  @Field(() => Int)
  id: number;
}
