import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.css']
})
export class JumbotronComponent implements OnInit {
  private jbtHeading: string ;
  private jbtText: string ;
  private jbtBtnText: string ;
  private jbtBtnUrl: string ;

  constructor() {
    this.jbtHeading = 'Hello, world!' ;
    this.jbtText = 'This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.' ;
    this.jbtBtnText = 'Read More';
    this.jbtBtnUrl = 'http://test.com' ;
  }

  ngOnInit() {
  }

}
