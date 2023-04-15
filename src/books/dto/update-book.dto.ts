import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsString, IsUUID } from 'class-validator';

export class UpdateBookDto {
  @IsUUID()
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  name: string;

  @IsDateString()
  @ApiProperty({ format: 'date' })
  releaseDate: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsInt()
  @ApiProperty()
  currentlyInStock: number;

  @IsUUID()
  @ApiProperty()
  authorId: string;
}
