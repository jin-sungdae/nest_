import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Comment } from './comment.entity';
import { User } from '../users/user.entity';
import { Board } from '../board/board.entity';
import { UsersModule } from '../users/users.module';
import { BoardsModule } from '../board/boards.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, User, Board]),
    UsersModule,
    BoardsModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}