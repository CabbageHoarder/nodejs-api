import { Author } from '../authors/author.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: () => 'NOW()' })
  createdAt: string;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'date', nullable: false })
  releaseDate: string;

  @Column()
  description: string;

  @ManyToOne(() => Author, (author) => author.books, {
    onDelete: 'CASCADE',
    nullable: false
  })
  author: Author;
}
