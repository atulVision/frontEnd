import { Component, OnInit } from '@angular/core';
import { Labels } from '../../../utils/labels';

// Author : Tushar Upadhyay

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  locale: any;

  constructor() { }

  ngOnInit() {
    this.locale = Labels.en_IN.labels.footer;
  }

  goToTop() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
}
