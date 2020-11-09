// import * as ormOptionsMongo from 'src/config/databaseMongo.config';
import { UsersModule } from 'src/users/users.module';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { TypeOrmModule } from '@nestjs/typeorm';

import { BooksResolver } from './books.resolver';
import { BooksService } from './books.service';
// import { Book } from './entities/book.entity';
import { BookSchema } from './schemas/book.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),
    // TypeOrmModule.forRoot(
    //   ormOptionsMongo
    // ),
    // TypeOrmModule.forFeature([
    //   Book
    // ]),
    UsersModule
  ],
  providers: [BooksResolver, BooksService]
})
export class BooksModule {}
