import { GqlAuthGuard } from 'src/users/auth.guard';
import { CurrentUser } from 'src/users/currentUser.decorator';
import { User } from 'src/users/entities/user.entity';

import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';
import { PostsService } from './posts.service';

@Resolver(() => Post)
@UseGuards(GqlAuthGuard)
export class PostsResolver {
  constructor (private readonly postsService: PostsService) {}

  @Mutation(() => Post)
  async createPost (@CurrentUser() user: User, @Args('createPostInput') createPostInput: CreatePostInput): Promise<Post> {
    return await this.postsService.create(user, createPostInput);
  }

  @Query(() => [Post], { name: 'posts' })
  async findAll (): Promise<Post[]> {
    return await this.postsService.findAll();
  }

  @Query(() => Post, { name: 'post' })
  async findOne (@Args('id', { type: () => Int }) id: number): Promise<Post> {
    return await this.postsService.findOne(id);
  }

  @Mutation(() => Post)
  async updatePost (@Args('updatePostInput') updatePostInput: UpdatePostInput): Promise<Post> {
    return await this.postsService.update(updatePostInput.id, updatePostInput);
  }

  @Mutation(() => Post)
  async removePost (@Args('id', { type: () => Int }) id: number): Promise<void> {
    return await this.postsService.remove(id);
  }
}
