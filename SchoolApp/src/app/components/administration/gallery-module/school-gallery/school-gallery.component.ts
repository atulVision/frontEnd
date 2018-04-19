import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../../../../utils/app-config';
import { Labels } from '../../../../utils/labels';
import { Router } from '@angular/router';
import { UtilFunctions } from '../../../../utils/util-functions';
import { Album } from '../../../../models/album.model';
import { Gallery } from '../../../../models/gallery.model';
import { Broadcaster } from '../../../../utils/broadcaster';
import { GalleryService } from '../../../../services/gallery.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AlbumService } from '../../../../services/album.service';

// Author : Tushar Upadhyay

@Component({
  selector: 'app-school-gallery',
  templateUrl: './school-gallery.component.html',
  styleUrls: ['./school-gallery.component.css']
})
export class SchoolGalleryComponent implements OnInit {

  action: string;
  viewFlag = false;
  album: Album;
  pageTitle: any;
  locale: any;
  gallery: Gallery;
  formLocale: any;
  albumList: any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private broadcaster: Broadcaster,
    private _gallery: GalleryService,
    private _album: AlbumService,
    private spinnerService: Ng4LoadingSpinnerService) {
    this.route.params.subscribe((params) => {
      this.action = params['action'];
      this.initializeGallery();
      if (this.action === 'new') {
        this.viewFlag = false;
      }
      if (this.action === 'edit') {
        this.viewFlag = false;
        this.gallery = this.broadcaster.storage;
      }
      if (this.action === 'view') {
        this.viewFlag = true;
        this.gallery = this.broadcaster.storage;
      }
      this.locale = Labels.en_IN.labels.page_title;
      this.formLocale = Labels.en_IN.labels.form_labels;
      this.pageTitle = this.locale[this.action] + ' ' + this.locale.gallery;
    });
  }

  ngOnInit() {
    this.checkLogin();
    this.spinnerService.show();
    this.getList();
    this.spinnerService.hide();
  }

  private getList() {
    this._album.getAlbumList().subscribe((res) => {
      this.albumList = res;
    }, (resError) => {
    });
  }

  private initializeGallery() {
    this.album = new Album(null, '', '');
    this.gallery = new Gallery(null, this.album, '', '');
  }

  public addGallery(data) {
    this.spinnerService.show();
    if (this.action === 'new') {
      this._gallery.saveGallery(this.gallery).subscribe((res) => {
        this.spinnerService.hide();
      }, (resError) => {
      });
    }
    if (this.action === 'edit') {
      this._gallery.updateGallery(this.gallery.id, this.gallery).subscribe((res) => {
        this.spinnerService.hide();
      }, (resError) => {
      });
    }
  }

  public backToList() {
    this.router.navigate(['/list/gallery']);
  }

  private checkLogin() {
    const user = UtilFunctions.getLocalStorage('user');
    if (user) {
      return;
    }
    this.router.navigate(['/login']);
  }
}
