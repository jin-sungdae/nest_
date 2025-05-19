import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { BoardsModule } from './board/boards.module';
import { User } from './users/user.entity';
import { Comment } from './comments/comment.entity';
import { Board } from './board/board.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [User, Comment, Board],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    CommentsModule,
    BoardsModule
  ],
})
export class AppModule {}