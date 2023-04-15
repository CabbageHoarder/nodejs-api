import { ApiProperty } from '@nestjs/swagger';
import { AuthorDto } from '../../authors/dto/author.dto';
import { Book } from '../book.entity';

export class BookDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty({ format: 'string' })
  releaseDate: string;
  @ApiProperty()
  description: string;
  @ApiProperty({ type: AuthorDto })
  author: AuthorDto;
  @ApiProperty()
  currentlyInStock: number;

  constructor(entity: Book) {
    this.id = entity.id;
    this.name = entity.name;
    this.releaseDate = entity.releaseDate;
    this.description = entity.description;
    this.author = new AuthorDto(entity.author);
    this.currentlyInStock = entity.currentlyInStock;
  }
}
