// Author : Tushar Upadhyay
export class Album {
  public albumId: number;
  public albumName: string;
  public imgUrl: string;

  constructor(albumId: number,
    albumName: string,
    imgUrl: string
  ) {
    this.albumId = albumId;
    this.albumName = albumName;
    this.imgUrl = imgUrl;
  }
}
