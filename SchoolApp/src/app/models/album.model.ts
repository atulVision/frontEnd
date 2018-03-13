export class Album {

  public id: number;
  public title: string;
  public imageUrl: string;
  public createdAt: string;
  public updatedAt: string;

  constructor(id: number, title: string, imageUrl: string,
    createdAt: string, updatedAt: string
  ) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
