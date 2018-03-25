export class Gallery {

  public galleryId: number;
  public albumId: number;
  public title: string;
  public imageUrl: string;

  constructor(galleryId: number, albumId: number,
    title: string, imageUrl: string
  ) {
    this.galleryId = galleryId;
    this.albumId = albumId;
    this.title = title;
    this.imageUrl = imageUrl;
  }

}
