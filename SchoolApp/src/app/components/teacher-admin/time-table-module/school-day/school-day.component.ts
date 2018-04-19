import { Component, OnInit } from '@angular/core';
import { Day } from '../../../../models/day.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DayService } from '../../../../services/day.service';
import { Broadcaster } from '../../../../utils/broadcaster';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Labels } from '../../../../utils/labels';
import { UtilFunctions } from '../../../../utils/util-functions';

// Author : Tushar Upadhyay

@Component({
  selector: 'app-school-day',
  templateUrl: './school-day.component.html',
  styleUrls: ['./school-day.component.css']
})
export class SchoolDayComponent implements OnInit {

  action: string;
  viewFlag = false;
  day: Day;
  pageTitle: any;
  locale: any;
  formLocale: any;

  constructor(private route: ActivatedRoute, private router: Router, private _day: DayService,
  private broadcaster: Broadcaster, private spinnerService: Ng4LoadingSpinnerService) {
    this.route.params.subscribe((params) => {
      this.action = params['action'];
      this.initializeDay();
      if (this.action === 'new') {
        this.viewFlag = false;
      }
      if (this.action === 'edit') {
        this.viewFlag = false;
        this.day = this.broadcaster.storage;
      }
      if (this.action === 'view') {
        this.viewFlag = true;
        this.day = this.broadcaster.storage;
      }
      this.locale = Labels.en_IN.labels.page_title;
      this.formLocale = Labels.en_IN.labels.form_labels;
      this.pageTitle = this.locale[this.action] + ' ' + this.locale.day;
    });
  }

  ngOnInit() {
   this.checkLogin();
  }

  private initializeDay() {
    this.day = new Day(null, '');
  }

  public addDay(data) {
    this.spinnerService.show();
    if (this.action === 'new') {
      this._day.saveDay(this.day).subscribe((res) => {
        this.spinnerService.hide();
    }, (resError) => {
    });
    }
    if (this.action === 'edit') {
      this._day.updateDay(this.day.id, this.day).subscribe((res) => {
        this.spinnerService.hide();
    }, (resError) => {
    });
    }
  }

  public backToList() {
    this.router.navigate(['/list/day']);
  }

  private checkLogin() {
    const user = UtilFunctions.getLocalStorage('user');
    if ( user ) {
      return;
    }
    this.router.navigate(['/login']);
  }
}
