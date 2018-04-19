import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../../../../utils/app-config';
import { Labels } from '../../../../utils/labels';
import { Router } from '@angular/router';
import { UtilFunctions } from '../../../../utils/util-functions';
import { Book } from '../../../../models/book.model';
import { BookService } from '../../../../services/book.service';
import { Broadcaster } from '../../../../utils/broadcaster';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { BookType } from '../../../../models/book-type.model';
import { BookTypeService } from '../../../../services/book-type.service';

// Author : Tushar Upadhyay

@Component({
  selector: 'app-school-library',
  templateUrl: './school-library.component.html',
  styleUrls: ['./school-library.component.css']
})
export class SchoolLibraryComponent implements OnInit {

  action: string;
  viewFlag = false;
  book: Book;
  pageTitle: any;
  locale: any;
  bookType: BookType;
  bookTypeList: any;
  formLocale: any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private broadcaster: Broadcaster,
    private _book: BookService,
    private _bookType: BookTypeService,
    private spinnerService: Ng4LoadingSpinnerService) {
    this.route.params.subscribe((params) => {
      this.action = params['action'];
      this.initializeBook();
      if (this.action === 'new') {
        this.viewFlag = false;
      }
      if (this.action === 'edit') {
        this.viewFlag = false;
        this.book = this.broadcaster.storage;
      }
      if (this.action === 'view') {
        this.viewFlag = true;
        this.book = this.broadcaster.storage;
      }
      this.locale = Labels.en_IN.labels.page_title;
      this.formLocale = Labels.en_IN.labels.form_labels;
      this.pageTitle = this.locale[this.action] + ' ' + this.locale.book;
    });
  }

  ngOnInit() {
    this.checkLogin();
    this.spinnerService.show();
    this.getList();
    this.spinnerService.hide();
  }

  private getList() {
    this._bookType.getBookTypeList().subscribe((res) => {
      this.bookTypeList = res;
    }, (resError) => {
    });
  }

  private initializeBook() {
    this.bookType = new BookType(null, '');
    this.book = new Book(null, '', '', '', '', '', this.bookType, '', '', '');
  }

  public addBook(data) {
    this.spinnerService.show();
    if (this.action === 'new') {
      this._book.saveBook(this.book).subscribe((res) => {
        this.spinnerService.hide();
      }, (resError) => {
      });
    }
    if (this.action === 'edit') {
      this._book.updateBook(this.book.bookId, this.book).subscribe((res) => {
        this.spinnerService.hide();
      }, (resError) => {
      });
    }
  }

  public backToList() {
    this.router.navigate(['/list/book']);
  }

  private checkLogin() {
    const user = UtilFunctions.getLocalStorage('user');
    if (user) {
      return;
    }
    this.router.navigate(['/login']);
  }
}
