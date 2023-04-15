import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAuthorDto } from './dto/create-author.dto';
import { AuthorDto } from './dto/author.dto';

@ApiTags('Authors')
@Controller()
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post('author')
  @ApiBody({ type: CreateAuthorDto })
  @ApiResponse({ type: AuthorDto, status: 201 })
  async createAuthor(@Body() body: CreateAuthorDto): Promise<AuthorDto> {
    const author = await this.authorService.createAuthor(body);
    return new AuthorDto(author);
  }

  @Get('author')
  @ApiResponse({ type: AuthorDto, isArray: true, status: 200 })
  async getAuthors(): Promise<AuthorDto[]> {
    const authors = await this.authorService.getAuthors();
    return authors.map((author) => new AuthorDto(author));
  }

  @ApiParam({ name: 'id', required: true, type: 'string', format: 'uuid' })
  @Get('author/:id')
  @ApiResponse({ type: AuthorDto, isArray: true, status: 200 })
  async getAutho(@Param('id') id: string): Promise<AuthorDto> {
    const author = await this.authorService.getAuthor(id);
    if (!author) throw new NotFoundException();
    return new AuthorDto(author);
  }
}
