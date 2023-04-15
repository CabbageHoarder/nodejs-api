import { Module } from '@nestjs/common';
import { BookModule } from './books/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorModule } from './authors/author.module';
import { Author } from './authors/author.entity';
import { Book } from './books/book.entity';

@Module({
  imports: [
    AuthorModule,
    BookModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'mysecretpassword',
      database: 'postgres',
      entities: [Author, Book],
      synchronize: true
    })
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule {}
