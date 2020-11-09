import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { BooksService } from './books.service';
import { CreateBookInput } from './dtos/create-book.input';
// import { UpdateBookInput } from './dto/update-book.input';
import { Book } from './entities/book.entity';
import { BookProps } from './schemas/book.schema';

@Resolver(() => Book)
// @UseGuards(GqlAuthGuard)
export class BooksResolver {
  constructor (private readonly booksService: BooksService) {}

  @Mutation(() => Book)
  async createBook1 (@Args('createBookInput') createBookInput: CreateBookInput): Promise<BookProps> {
    return await this.booksService.create1(createBookInput);
  }

  @Query(() => [Book], { name: 'books1' })
  async findAll1 (): Promise<BookProps[]> {
    return await this.booksService.findAll1();
  }

  @Query(() => Book, { name: 'book' })
  async findOne (@Args('id') id: string): Promise<BookProps> {
    return await this.booksService.findOne1(id);
  }

  @Mutation(() => Book)
  async removeBook (@Args('id') id: string): Promise<void> {
    return this.booksService.remove1(id);
  }

  // @Mutation(() => Book)
  // async createBook2 (@Args('createBookInput') createBookInput: CreateBookInput): Promise<Book> {
  //   return await this.booksService.create2(createBookInput);
  // }

  // @Query(() => [Book], { name: 'books2' })
  // async findAll2 (): Promise<Book[]> {
  //   return await this.booksService.findAll2();
  // }
}
