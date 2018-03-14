import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../../utils/app-config';
import { Labels } from '../../utils/labels';
import { Router } from '@angular/router';
import { UtilFunctions } from '../../utils/util-functions';
import { DataServiceService } from '../../services/data-service.service';
import { Classes } from '../../models/classes.model';
import { ClassesService } from '../../services/classes.service';

@Component({
  selector: 'app-school-class',
  templateUrl: './school-class.component.html',
  styleUrls: ['./school-class.component.css']
})
export class SchoolClassComponent implements OnInit {

  action: string;
  viewFlag = false;
  classes: Classes;
  pageTitle: any;
  locale: any;
  formLocale: any;

  constructor(private route: ActivatedRoute, private router: Router, private _data: DataServiceService, private _class: ClassesService) {
    this.route.params.subscribe((params) => {
      this.action = params['action'];
      this.initializeClass();
      if (this.action === 'new') {
        this.viewFlag = false;
      }
      if (this.action === 'edit') {
        this.viewFlag = false;
        this.classes = this._data.storage;
      }
      if (this.action === 'view') {
        this.viewFlag = true;
        this.classes = this._data.storage;
      }
      this.locale = Labels.en_IN.labels.page_title;
      this.formLocale = Labels.en_IN.labels.form_labels;
      this.pageTitle = this.locale[this.action] + " " + this.locale.class;
    });
  }

  ngOnInit() {
    const user = UtilFunctions.getLocalStorage('userName');
    if ( user ) {
      return;
    }
    this.router.navigate(['/login']);
  }

  initializeClass() {
    this.classes = new Classes(0, '', '', '', '', '');
  }

  addClass(data) {
    console.log(data);
    this._class.saveClass(data).subscribe((res) => {
      console.log(res);
  }, (resError) => {
  });
  }

  backToList() {
    this.router.navigate(['/list/class']);
  }
}
