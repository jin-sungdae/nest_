import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    ParseIntPipe,
  } from '@nestjs/common';
  import { BoardsService } from './boards.service';
  import { CreateBoardDto } from './dto/create-board.dto';
  import { UpdateBoardDto } from './dto/update-board.dto';
  
  @Controller('boards')
  export class BoardsController {
    constructor(private readonly boardsService: BoardsService) {}
  
    @Post()
    create(@Body() dto: CreateBoardDto) {
      return this.boardsService.create(dto);
    }
  
    @Get()
    findAll() {
      return this.boardsService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.boardsService.findOne(id);
    }
  
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBoardDto) {
      return this.boardsService.update(id, dto);
    }
  
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.boardsService.remove(id);
    }
  }