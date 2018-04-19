import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../../../../utils/app-config';
import { Labels } from '../../../../utils/labels';
import { Router } from '@angular/router';
import { UtilFunctions } from '../../../../utils/util-functions';
import { Division } from '../../../../models/division.model';
import { DivisionService } from '../../../../services/division.service';
import { Broadcaster } from '../../../../utils/broadcaster';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

// Author : Tushar Upadhyay

@Component({
  selector: 'app-school-division',
  templateUrl: './school-division.component.html',
  styleUrls: ['./school-division.component.css']
})
export class SchoolDivisionComponent implements OnInit {

  action: string;
  viewFlag = false;
  division: Division;
  pageTitle: any;
  locale: any;
  formLocale: any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private _division: DivisionService,
    private broadcaster: Broadcaster,
    private spinnerService: Ng4LoadingSpinnerService) {
    this.route.params.subscribe((params) => {
      this.action = params['action'];
      this.initializeDivision();
      if (this.action === 'new') {
        this.viewFlag = false;
      }
      if (this.action === 'edit') {
        this.viewFlag = false;
        this.division = this.broadcaster.storage;
      }
      if (this.action === 'view') {
        this.viewFlag = true;
        this.division = this.broadcaster.storage;
      }
      this.locale = Labels.en_IN.labels.page_title;
      this.formLocale = Labels.en_IN.labels.form_labels;
      this.pageTitle = this.locale[this.action] + ' ' + this.locale.division;
    });
  }

  ngOnInit() {
    this.checkLogin();
  }

  private initializeDivision() {
    this.division = new Division(null, '', '');
  }

  public addDivision(data) {
    this.spinnerService.show();
    if (this.action === 'new') {
      this._division.saveDivision(this.division).subscribe((res) => {
        this.spinnerService.hide();
      }, (resError) => {
      });
    }
    if (this.action === 'edit') {
      this._division.updateDivision(this.division.id, this.division).subscribe((res) => {
        this.spinnerService.hide();
      }, (resError) => {
      });
    }
  }

  public backToList() {
    this.router.navigate(['/list/division']);
  }

  private checkLogin() {
    const user = UtilFunctions.getLocalStorage('user');
    if (user) {
      return;
    }
    this.router.navigate(['/login']);
  }
}
