import { BookType } from './book-type.model';

export class Book {
  public bookId: number;
  public publisher: string;
  public authors: string;
  public subject: string;
  public description: string;
  public edition: string;
  public coverPhoto: string;
  public bookType: BookType;
  public bookName: string;
  public isbn: string;

  constructor(bookId: number, publisher: string, authors: string,
    description: string, edition: string, coverPhoto: string,
    bookType: BookType, bookName: string, isbn: string, subject: string
  ) {
    this.bookId = bookId;
    this.publisher = publisher;
    this.authors = authors;
    this.description = description;
    this.edition = edition;
    this.coverPhoto = coverPhoto;
    this.bookType = bookType;
    this.bookName = bookName;
    this.isbn = isbn;
    this.subject = subject;
  }
}
