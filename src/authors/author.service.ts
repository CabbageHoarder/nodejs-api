import { Injectable } from '@nestjs/common';
import { Author } from './author.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author) private authorRepo: Repository<Author>
  ) {}

  async createAuthor(data: CreateAuthorDto): Promise<Author> {
    return this.authorRepo.save(data);
  }

  async getAuthor(id: string): Promise<Author | null> {
    return this.authorRepo.findOne({ where: { id } });
  }

  async getAuthors(): Promise<Author[]> {
    return this.authorRepo.find();
  }
}
