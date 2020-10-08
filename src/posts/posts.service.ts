import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor (
    @InjectRepository(Post)
    private readonly post: Repository<Post>,
    @InjectRepository(User)
    private readonly user: Repository<User>
  ) {}

  async create (user: User, createPostInput: CreatePostInput): Promise<Post> {
    if (!user) {
      throw new BadRequestException('User not found!');
    }

    console.log(user);

    const post = this.post.create({
      content: createPostInput.content,
      title: createPostInput.title,
      user
    });

    return await this.post.save(post);
  }

  async findAll (): Promise<Post[]> {
    return await this.post.find({ relations: ['user'] });
  }

  async findOne (id: number): Promise<Post> {
    return await this.post.findOne(id, { relations: ['user'] });
  }

  async update (id: number, updatePostInput: UpdatePostInput): Promise<Post> {
    const post = await this.post.findOne(id);

    if (!post) {
      throw new BadRequestException('Post not found!');
    }

    post.content = updatePostInput.content;
    post.title = updatePostInput.title;

    await this.post.save(post);

    return post;
  }

  async remove (id: number): Promise<void> {
    await this.post.delete({ id });
  }
}
