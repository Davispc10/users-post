import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UsersMethods {
  @Field()
  username: string

  @Field()
  accessToken: string;
}
