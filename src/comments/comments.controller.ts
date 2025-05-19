import {
    Controller, Post, Body, Param, Delete, UseGuards, Request, Get,
  } from '@nestjs/common';
  import { CommentsService } from './comments.service';
  import { CreateCommentDto } from './dto/create-comment.dto';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  
  @Controller('boards/:boardId/comments')
  export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}
  
    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
      @Param('boardId') boardId: number,
      @Body() dto: CreateCommentDto,
      @Request() req,
    ) {
      return this.commentsService.create(boardId, req.user, dto);
    }
  
    @Get()
    async getComments(@Param('boardId') boardId: number) {
      return this.commentsService.findByBoard(boardId);
    }
  
    @UseGuards(JwtAuthGuard)
    @Delete(':commentId')
    async delete(
      @Param('boardId') boardId: number,
      @Param('commentId') commentId: number,
      @Request() req,
    ) {
      return this.commentsService.delete(commentId, req.user);
    }
  }