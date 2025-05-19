import {
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne,
  } from 'typeorm';
  import { User } from '../users/user.entity';
  import { Board } from '../board/board.entity';
  
  @Entity()
  export class Comment {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    content: string;
  
    @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
    author: User;
  
    @ManyToOne(() => Board, (board) => board.comments, { onDelete: 'CASCADE' })
    board: Board;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }