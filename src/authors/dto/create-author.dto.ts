import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  @ApiProperty()
  firstName: string;

  @IsString()
  @ApiProperty()
  lastName: string;

  @IsDateString()
  @ApiProperty({ type: 'string', format: 'date' })
  dateOfBirth: string;

  @IsString()
  @ApiProperty()
  description: string;
}
