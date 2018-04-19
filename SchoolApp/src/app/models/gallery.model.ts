import { Album } from './album.model';

// Author : Tushar Upadhyay

export class Gallery {
  public id: number;
  public album: Album;
  public title: string;
  public imageUrl: string;

  constructor(id: number,
    album: Album,
    title: string,
    imageUrl: string
  ) {
    this.id = id;
    this.album = album;
    this.title = title;
    this.imageUrl = imageUrl;
  }

}
