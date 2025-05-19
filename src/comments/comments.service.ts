// src/comments/comments.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { User } from '../users/user.entity';
import { Board } from '../board/board.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  async create(boardId: number, user: User, dto: CreateCommentDto): Promise<Comment> {
    const board = await this.boardRepository.findOne({ where: { id: boardId } });
    if (!board) throw new NotFoundException('게시글이 존재하지 않습니다');

    const comment = this.commentRepository.create({
      content: dto.content,
      author: user,
      board,
    });
    return this.commentRepository.save(comment);
  }

  async findByBoard(boardId: number): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { board: { id: boardId } },
      relations: ['author'],
      order: { createdAt: 'DESC' },
    });
  }

  async delete(commentId: number, user: User): Promise<void> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
      relations: ['author'],
    });
    if (!comment) throw new NotFoundException('댓글이 존재하지 않습니다');
    if (comment.author.id !== user.id) throw new Error('삭제 권한이 없습니다');

    await this.commentRepository.remove(comment);
  }
}