import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepo: Repository<Board>,
  ) {}

  async create(createDto: CreateBoardDto): Promise<Board> {
    const board = this.boardRepo.create(createDto);
    return this.boardRepo.save(board);
  }

  async findAll(): Promise<Board[]> {
    return this.boardRepo.find({ relations: ['comments'] });
  }

  async findOne(id: number): Promise<Board> {
    const board = await this.boardRepo.findOne({ where: { id }, relations: ['comments'] });
    if (!board) throw new NotFoundException('Board not found');
    return board;
  }

  async update(id: number, updateDto: UpdateBoardDto): Promise<Board> {
    await this.boardRepo.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.boardRepo.delete(id);
  }
}