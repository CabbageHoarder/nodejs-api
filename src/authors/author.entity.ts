import { Book } from '../books/book.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Author {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: () => 'NOW()' })
  createdAt: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ type: 'date', nullable: false })
  dateOfBirth: string;

  @Column()
  description: string;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
