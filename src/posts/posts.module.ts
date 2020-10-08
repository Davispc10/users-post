import { UserRepository } from 'src/users/repositories/user.repository';
import { UsersModule } from 'src/users/users.module';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Post } from './entities/post.entity';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([
      Post,
      UserRepository
    ])
  ],
  providers: [PostsResolver, PostsService]
})
export class PostsModule {}
