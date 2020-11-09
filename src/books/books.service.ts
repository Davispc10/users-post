import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateBookInput } from './dtos/create-book.input';
// import { UpdateBookInput } from './dto/update-book.input';
// import { Book } from './entities/book.entity';
import { BookDoc, BookProps } from './schemas/book.schema';

@Injectable()
export class BooksService {
  constructor (
    @InjectModel('Book')
    private readonly Book1: Model<BookDoc>
    // @InjectRepository(Book)
    // private readonly Book2: Repository<Book>

  ) { }

  async create1 (createBookInput: CreateBookInput): Promise<BookProps> {
    const book = new this.Book1(createBookInput);
    return await book.save();
  }

  async findAll1 (): Promise<BookProps[]> {
    return await this.Book1.find();
  }

  async findOne1 (id: string): Promise<BookProps> {
    return await this.Book1.findById(id);
  }

  async remove1 (id: string): Promise<void> {
    await this.Book1.deleteOne({ _id: id });
  }

  // async create2 (createBookInput: CreateBookInput): Promise<Book> {
  //   const book = this.Book2.create({
  //     id: uuid(),
  //     title: createBookInput.title,
  //     description: createBookInput.description
  //   });

  //   return await this.Book2.save(book);
  // }

  // async findAll2 (): Promise<Book[]> {
  //   return await this.Book2.find();
  // }
}
