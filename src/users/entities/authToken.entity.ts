import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AuthToken {
  @Field()
  username: string

  @Field()
  accessToken: string;
}
