export class Book {
  public bookId: number;
  public publisher: string;
  public authors: string;
  public createdAt: string;
  public updatedAt: string;
  public description: string;
  public edition: string;
  public coverPhoto: string;
  public bookType: string;
  public bookName: string;
  public isbn: string;

  constructor(bookId: number, publisher: string, authors: string,
    createdAt: string, updatedAt: string, description: string,
    edition: string, coverPhoto: string, bookType: string,
    bookName: string, isbn: string
  ) {
    this.bookId = bookId;
    this.publisher = publisher;
    this.authors = authors;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.edition = edition;
    this.coverPhoto = coverPhoto;
    this.bookType = bookType;
    this.bookName = bookName;
    this.isbn = isbn;
  }
}
