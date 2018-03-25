import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../../utils/app-config';
import { Labels } from '../../utils/labels';
import { Router } from '@angular/router';
import { UtilFunctions } from '../../utils/util-functions';
import { Classes } from '../../models/classes.model';
import { ClassesService } from '../../services/classes.service';
import { Broadcaster } from '../../utils/broadcaster';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

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

  constructor(private route: ActivatedRoute, private router: Router, private _class: ClassesService,
    private broadcaster: Broadcaster, private spinnerService: Ng4LoadingSpinnerService) {
    this.route.params.subscribe((params) => {
      this.action = params['action'];
      this.initializeClass();
      if (this.action === 'new') {
        this.viewFlag = false;
      }
      if (this.action === 'edit') {
        this.viewFlag = false;
        this.classes = this.broadcaster.storage;
      }
      if (this.action === 'view') {
        this.viewFlag = true;
        this.classes = this.broadcaster.storage;
      }
      this.locale = Labels.en_IN.labels.page_title;
      this.formLocale = Labels.en_IN.labels.form_labels;
      this.pageTitle = this.locale[this.action] + ' ' + this.locale.class;
    });
  }

  ngOnInit() {
   this.checkLogin();
  }

  initializeClass() {
    this.classes = new Classes(0, '', '', 0, 0);
  }

  addClass(data) {
    console.log(data);
    this.spinnerService.show();
    if (this.action === 'new') {
      this._class.saveClass(data).subscribe((res) => {
        console.log(res);
        this.spinnerService.hide();
    }, (resError) => {
    });
    }
    if (this.action === 'edit') {
      this._class.updateClass(this.classes.classId, this.classes).subscribe((res) => {
        console.log(res);
        this.spinnerService.hide();
    }, (resError) => {
    });
    }
  }

  backToList() {
    this.router.navigate(['/list/class']);
  }

  checkLogin() {
    const user = UtilFunctions.getLocalStorage('user');
    if ( user ) {
      return;
    }
    this.router.navigate(['/login']);
  }
}
