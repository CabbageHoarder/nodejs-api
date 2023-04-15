import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString, IsUUID } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsDateString()
  @ApiProperty({ format: 'date' })
  releaseDate: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsUUID()
  @ApiProperty()
  authorId: string;
}
