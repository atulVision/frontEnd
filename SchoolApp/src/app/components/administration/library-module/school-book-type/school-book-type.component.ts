import { Component, OnInit } from '@angular/core';
import { BookType } from '../../../../models/book-type.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BookTypeService } from '../../../../services/book-type.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Broadcaster } from '../../../../utils/broadcaster';
import { UtilFunctions } from '../../../../utils/util-functions';
import { Labels } from '../../../../utils/labels';

// Author : Tushar Upadhyay

@Component({
  selector: 'app-school-book-type',
  templateUrl: './school-book-type.component.html',
  styleUrls: ['./school-book-type.component.css']
})
export class SchoolBookTypeComponent implements OnInit {

  action: string;
  viewFlag = false;
  bookType: BookType;
  pageTitle: any;
  locale: any;
  formLocale: any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private _bookType: BookTypeService,
    private broadcaster: Broadcaster,
    private spinnerService: Ng4LoadingSpinnerService) {
    this.route.params.subscribe((params) => {
      this.action = params['action'];
      this.initializeBookType();
      if (this.action === 'new') {
        this.viewFlag = false;
      }
      if (this.action === 'edit') {
        this.viewFlag = false;
        this.bookType = this.broadcaster.storage;
      }
      if (this.action === 'view') {
        this.viewFlag = true;
        this.bookType = this.broadcaster.storage;
      }
      this.locale = Labels.en_IN.labels.page_title;
      this.formLocale = Labels.en_IN.labels.form_labels;
      this.pageTitle = this.locale[this.action] + ' ' + this.locale.bookType;
    });
  }

  ngOnInit() {
    this.checkLogin();
  }

  private initializeBookType() {
    this.bookType = new BookType(null, '');
  }

  public addBookType(data) {
    this.spinnerService.show();
    if (this.action === 'new') {
      this._bookType.saveBookType(this.bookType).subscribe((res) => {
        this.spinnerService.hide();
      }, (resError) => {
      });
    }
    if (this.action === 'edit') {
      this._bookType.updateBookType(this.bookType.id, this.bookType).subscribe((res) => {
        this.spinnerService.hide();
      }, (resError) => {
      });
    }
  }

  public backToList() {
    this.router.navigate(['/list/bookType']);
  }

  private checkLogin() {
    const user = UtilFunctions.getLocalStorage('user');
    if (user) {
      return;
    }
    this.router.navigate(['/login']);
  }
}
