import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../../utils/app-config';
import { Labels } from '../../utils/labels';
import { Router } from '@angular/router';
import { UtilFunctions } from '../../utils/util-functions';
import { Book } from '../../models/book.model';
import { DataServiceService } from '../../services/data-service.service';
import { BookService } from '../../services/book.service';

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

  constructor(private route: ActivatedRoute, private router: Router, private _data: DataServiceService) {
    this.route.params.subscribe((params) => {
      this.action = params['action'];
      this.initializeBook();
      if (this.action === 'new') {
        this.viewFlag = false;
      }
      if (this.action === 'edit') {
        this.viewFlag = false;
        this.book = this._data.storage;
      }
      if (this.action === 'view') {
        this.viewFlag = true;
        this.book = this._data.storage;
      }
      this.locale = Labels.en_IN.labels.page_title;
      this.pageTitle = this.locale[this.action] + ' ' + this.locale.book;
    });
  }

  ngOnInit() {
   this.checkLogin();
  }

  initializeBook() {
    this.book = new Book(0, '', '', '', '', '', 0 , '', '');
  }

  addBook(data) {
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
