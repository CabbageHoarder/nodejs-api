import { ApiProperty } from '@nestjs/swagger';
import { Author } from '../author.entity';

export class AuthorDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty({ format: 'date' })
  dateOfBirth: string;
  @ApiProperty()
  description: string;

  constructor(entity: Author) {
    this.id = entity.id;
    this.firstName = entity.firstName;
    this.lastName = entity.lastName;
    this.dateOfBirth = entity.dateOfBirth;
    this.description = entity.description;
  }
}
