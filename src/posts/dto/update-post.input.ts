import { InputType, Field, Int } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';

import { CreatePostInput } from './create-post.input';

@InputType()
export class UpdatePostInput extends PartialType(CreatePostInput) {
  @Field(() => Int)
  id: number;
}
