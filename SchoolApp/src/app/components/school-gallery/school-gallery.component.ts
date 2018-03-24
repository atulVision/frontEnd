import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../../utils/app-config';
import { Labels } from '../../utils/labels';
import { Router } from '@angular/router';
import { UtilFunctions } from '../../utils/util-functions';
import { Album } from '../../models/album.model';
import { DataServiceService } from '../../services/data-service.service';

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

  constructor(private route: ActivatedRoute, private router: Router, private _data: DataServiceService) {
    this.route.params.subscribe((params) => {
      this.action = params['action'];
      this.initializeAlbum();
      if (this.action === 'new') {
        this.viewFlag = false;
      }
      if (this.action === 'edit') {
        this.viewFlag = false;
        this.album = this._data.storage;
      }
      if (this.action === 'view') {
        this.viewFlag = true;
        this.album = this._data.storage;
      }
      this.locale = Labels.en_IN.labels.page_title;
      this.pageTitle = this.locale[this.action] + " " + this.locale.book;
    });
  }

  ngOnInit() {
  // this.checkLogin();
  }

  initializeAlbum() {
    this.album = new Album(0, '', '','','');
  }

  addAlbum(data) {
    console.log(data);
  }

  checkLogin() {
    const user = UtilFunctions.getLocalStorage('user');
    if ( user ) {
      return;
    }
    this.router.navigate(['/login']);
  }
}
