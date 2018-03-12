import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../../utils/app-config';
import { Labels } from '../../utils/labels';
import { Router } from '@angular/router';
import { UtilFunctions } from '../../utils/util-functions';
import { DataServiceService } from '../../services/data-service.service';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  type: string;
  data = [];
  filteredData = [];
  pageSize = 10;
  locale: any;
  commonLocale: any;
  rows = [
    {
      sr_no: 1,
      bookId: 1,
      publisher: 'Rupa, 2014',
      authors: 'Chetan Bhagat',
      createdAt: '2018-02-23',
      updatedAt: '2018-02-23',
      description: 'Half Girlfriend is an Indian English coming of age, young adult romance novel by Indian author Chetan Bhagat. The novel, set in rural Bihar, New Delhi, Patna, and New York, is the story of a Bihari boy in quest of winning over the girl he loves.',
      edition: 'Third',
      coverPhoto: 'www.ing,com',
      bookType: null,
      bookName: 'Half Girlfriend',
      isbn: '8129135728',
  },
  {
      sr_no: 2,
      bookId: 2,
      publisher: 'University of California Press, 2006',
      authors: 'Rajmohan Gandhi',
      createdAt: '2018-02-23',
      updatedAt: '2018-02-23',
      description: 'Rajmohan Gandhi is Research Professor at the Center for South Asian and Middle Eastern Studies, University of Illinois at Urbana-Champaign. A former member of the Rajya Sabha (the 0',
      edition: 'illustrated, reprint',
      coverPhoto: 'www.img.com',
      bookType: null,
      bookName: 'Gandhi',
      isbn: '9780520255708'
  }
  ];
  columns = [];
  filterColumns = [];
  ref: any;
  constructor(private route: ActivatedRoute, private router: Router, private _data: DataServiceService, bookService: BookService) {
    this.route.params.subscribe((params) => {
      this.type = params['type'];
      this.checkLogin();
      this.initializeTable(this.type);
    });
  }

  ngOnInit() {
  //   this.bookService.getBookList().subscribe((res) => {
  //     this.rows = res;
  // }, (resError) => {
  //   });
  }

  toggle(col) {
    const isChecked = this.isChecked(col);

    if (isChecked) {
      this.columns = this.columns.filter(c => {
        return c.prop !== col.prop;
      });
    } else {
      this.columns = [...this.columns, col];
    }
  }

  isChecked(col) {
    return this.columns.find(c => {
      return c.prop === col.prop;
    });
  }

  updateFilter(event) {
    let val = event.target.value.toLowerCase();
    let colsAmt = this.columns.length;
    let keys = Object.keys(this.rows[0]);
    this.data = this.filteredData.filter(function (item) {
      for (let i = 0; i < colsAmt; i++) {
        if (item[keys[i]].toLowerCase().indexOf(val) !== -1 || !val) {
          return true;
        }
      }
    });
  }

  view(row: any) {
    this._data.storage = row;
    this.router.navigate([this.ref.viewRef]);
  }

  edit(row: any) {

  }

  delete(row: any) {

  }

  setPageSize(size: any) {
    this.pageSize = size;
  }

  initializeTable(type) {
    this.data = this.rows;
    this.filteredData = [...this.rows];
    this.commonLocale = Labels.en_IN.labels.table.common;
    this.locale = Labels.en_IN.labels.table[type];
    this.columns = AppConfig[type];
    this.ref = AppConfig.tableNavigationConfig[type];
    this.filterColumns = this.columns;
  }

  checkLogin(){
    const user = UtilFunctions.getLocalStorage('userName');
    if ( user ) {
      return;
    }
    this.router.navigate(['/login']);
  }
}
