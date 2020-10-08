import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as ormOptions from './config/database.config';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormOptions),
    GraphQLModule.forRoot({
      playground: true,
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req })
    }),
    UsersModule,
    PostsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
