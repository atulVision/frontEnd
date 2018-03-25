export class Album {

  public albumId: number;
  public title: string;
  public coverPic: string;

  constructor(albumId: number, title: string, coverPic: string
  ) {
    this.albumId = albumId;
    this.title = title;
    this.coverPic = coverPic;
  }
}
