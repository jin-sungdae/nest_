import { Entity,
     PrimaryGeneratedColumn,
    Column,
     CreateDateColumn,
      UpdateDateColumn,
      OneToMany } from 'typeorm';

import { Comment } from '../comments/comment.entity';
export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  email: string;

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}