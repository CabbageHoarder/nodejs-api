import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Res
} from '@nestjs/common';
import { BookService } from './book.service';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateBookDto } from './dto/create-book.dto';
import { BookDto } from './dto/book.dto';
import { Response } from 'express';
import { UpdateBookDto } from './dto/update-book.dto';

@ApiTags('Books')
@Controller()
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('book')
  @ApiResponse({ type: BookDto, status: 201 })
  async createBook(@Body() body: CreateBookDto): Promise<BookDto> {
    if (body.currentlyInStock < 0) {
      throw new BadRequestException(
        'currentlyInStock must be larger than zero'
      );
    }
    const book = await this.bookService.createBook(body);
    return new BookDto(book);
  }

  @Put('book')
  @ApiResponse({ type: BookDto, status: 200 })
  async updateBook(@Body() body: UpdateBookDto): Promise<BookDto> {
    if (body.currentlyInStock < 0) {
      throw new BadRequestException(
        'currentlyInStock must be larger than zero'
      );
    }
    const book = await this.bookService.updateBook(body);
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

  @Post('book/:id/buy')
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @ApiResponse({ status: 200 })
  async buyBook(@Res() res: Response, @Param('id') id: string) {
    await this.bookService.buyBook(id);
    res.sendStatus(200);
  }
}
