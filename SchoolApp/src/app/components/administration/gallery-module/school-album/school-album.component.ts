import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../../../../utils/app-config';
import { Labels } from '../../../../utils/labels';
import { Router } from '@angular/router';
import { UtilFunctions } from '../../../../utils/util-functions';
import { Album } from '../../../../models/album.model';
import { Broadcaster } from '../../../../utils/broadcaster';
import { AlbumService } from '../../../../services/album.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

// Author : Tushar Upadhyay

@Component({
  selector: 'app-school-album',
  templateUrl: './school-album.component.html',
  styleUrls: ['./school-album.component.css']
})
export class SchoolAlbumComponent implements OnInit {

  action: string;
  viewFlag = false;
  album: Album;
  pageTitle: any;
  locale: any;
  formLocale: any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private broadcaster: Broadcaster,
    private _album: AlbumService,
    private spinnerService: Ng4LoadingSpinnerService) {
    this.route.params.subscribe((params) => {
      this.action = params['action'];
      this.initializeAlbum();
      if (this.action === 'new') {
        this.viewFlag = false;
      }
      if (this.action === 'edit') {
        this.viewFlag = false;
        this.album = this.broadcaster.storage;
      }
      if (this.action === 'view') {
        this.viewFlag = true;
        this.album = this.broadcaster.storage;
      }
      this.locale = Labels.en_IN.labels.page_title;
      this.formLocale = Labels.en_IN.labels.form_labels;
      this.pageTitle = this.locale[this.action] + ' ' + this.locale.album;
    });
  }

  ngOnInit() {
    this.checkLogin();
  }

  private initializeAlbum() {
    this.album = new Album(null, '', '');
  }

  public addAlbum(data) {
    this.spinnerService.show();
    if (this.action === 'new') {
      this._album.saveAlbum(this.album).subscribe((res) => {
        this.spinnerService.hide();
      }, (resError) => {
      });
    }
    if (this.action === 'edit') {
      this._album.updateAlbum(this.album.albumId, this.album).subscribe((res) => {
        this.spinnerService.hide();
      }, (resError) => {
      });
    }
  }

  public backToList() {
    this.router.navigate(['/list/album']);
  }

  private checkLogin() {
    const user = UtilFunctions.getLocalStorage('user');
    if (user) {
      return;
    }
    this.router.navigate(['/login']);
  }
}
