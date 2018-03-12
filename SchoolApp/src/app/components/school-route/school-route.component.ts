import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../../utils/app-config';
import { Labels } from '../../utils/labels';
import { Router } from '@angular/router';
import { UtilFunctions } from '../../utils/util-functions';

@Component({
  selector: 'app-school-route',
  templateUrl: './school-route.component.html',
  styleUrls: ['./school-route.component.css']
})
export class SchoolRouteComponent implements OnInit {

  action: string;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe((params) => {
      this.action = params['action'];
      console.log(this.action);
    });
  }

  ngOnInit() {
    const user = UtilFunctions.getLocalStorage('userName');
    if ( user ) {
      return;
    }
    this.router.navigate(['/login']);
  }

}
