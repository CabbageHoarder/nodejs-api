import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query
} from '@nestjs/common';
import { BookService } from './book.service';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateBookDto } from './dto/create-book.dto';
import { BookDto } from './dto/book.dto';

@ApiTags('Books')
@Controller()
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('book')
  @ApiResponse({ type: BookDto, status: 201 })
  async createBook(@Body() body: CreateBookDto): Promise<BookDto> {
    const book = await this.bookService.createBook(body);
    return new BookDto(book);
  }

  @ApiQuery({ name: 'authorId', required: false, type: 'string' })
  @Get('book')
  @ApiResponse({ type: BookDto, isArray: true, status: 200 })
  async getBooks(@Query('authorId') authorId?: string): Promise<BookDto[]> {
    const books = await this.bookService.getBooks(authorId);
    return books.map((book) => new BookDto(book));
  }

  @Get('book/:id')
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @ApiResponse({ type: BookDto, status: 200 })
  async getBook(@Param('id') id: string): Promise<BookDto> {
    const book = await this.bookService.getBook(id);
    if (!book) throw new NotFoundException();
    return new BookDto(book);
  }
}
