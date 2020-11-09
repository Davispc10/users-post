import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BooksModule } from './books/books.module';
import * as ormOptions from './config/database.config';
// import * as ormOptionsMongo from './config/databaseMongo.config';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://localhost:27017/',
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      }
    ),
    TypeOrmModule.forRoot(
      ormOptions
    ),
    GraphQLModule.forRoot({
      playground: true,
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req })
    }),
    UsersModule,
    PostsModule,
    BooksModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
