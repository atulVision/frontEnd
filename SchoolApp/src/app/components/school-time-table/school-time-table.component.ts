import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../../utils/app-config';
import { Labels } from '../../utils/labels';
import { Router } from '@angular/router';
import { UtilFunctions } from '../../utils/util-functions';

@Component({
  selector: 'app-school-time-table',
  templateUrl: './school-time-table.component.html',
  styleUrls: ['./school-time-table.component.css']
})
export class SchoolTimeTableComponent implements OnInit {

  action: string;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe((params) => {
      this.action = params['action'];
      console.log(this.action);
    });
  }

  ngOnInit() {
   this.checkLogin();
  }

  checkLogin() {
    const user = UtilFunctions.getLocalStorage('user');
    if ( user ) {
      return;
    }
    this.router.navigate(['/login']);
  }

}
