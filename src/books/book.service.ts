import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from '../authors/author.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private bookRepo: Repository<Book>,
    @InjectRepository(Author) private authorRepo: Repository<Author>
  ) {}

  async createBook(data: CreateBookDto): Promise<Book> {
    const author = await this.authorRepo.findOneBy({ id: data.authorId });
    if (!author) {
      throw new NotFoundException('Author Not Found');
    }
    return this.bookRepo.save({
      ...data,
      author
    });
  }

  async getBooks(authorId?: string): Promise<Book[]> {
    const filter: FindOptionsWhere<Book> = {};
    if (authorId) filter.author = { id: authorId };
    return this.bookRepo.find({
      relations: ['author'],
      where: filter
    });
  }

  async getBook(id: string): Promise<Book | null> {
    return this.bookRepo.findOne({ where: { id }, relations: ['author'] });
  }
}
