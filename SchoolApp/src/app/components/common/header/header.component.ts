import { Component, OnInit } from '@angular/core';
import { UtilFunctions } from '../../../utils/util-functions';
import { Labels } from '../../../utils/labels';
import { Broadcaster } from '../../../utils/broadcaster';

// Author : Tushar Upadhay

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  locale: any;
  userName: any;
  profile: any;
  role: any;
  userRole: any;

  constructor(private broadcaster: Broadcaster) { }

  ngOnInit() {
    this.locale = Labels.en_IN.labels.header;
    this.profile = JSON.parse(UtilFunctions.getLocalStorage('user'));
    this.role = UtilFunctions.getLocalStorage('role');
    this.userRole = Labels.en_IN.labels.header[this.role];
    this.updateUserName();

    this.broadcaster.on<string>('role')
      .subscribe((message: any) => {
        this.role = message;
        this.userRole = Labels.en_IN.labels.header[this.role];
        this.updateUserName();
      });

    this.broadcaster.on<string>('user')
      .subscribe((message: any) => {
        this.profile = message;
        this.updateUserName();
      });
  }

  checkLogin() {
    const user = UtilFunctions.getLocalStorage('user');
    return user ? true : false;
  }

  updateUserName() {
    if (this.profile != null) {
      this.userName = this.profile.firstName + ' ' + this.profile.lastName;
    }
  }
}
