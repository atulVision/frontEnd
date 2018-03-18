import { Component, OnInit, ViewChild  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../../utils/app-config';
import { Labels } from '../../utils/labels';
import { Router } from '@angular/router';
import { UtilFunctions } from '../../utils/util-functions';
import { Route } from '../../models/route.model';

@Component({
  selector: 'app-school-route',
  templateUrl: './school-route.component.html',
  styleUrls: ['./school-route.component.css']
})
export class SchoolRouteComponent implements OnInit {

  action: string;
  viewFlag = false;
  pageTitle: any;
  locale: any;
  formLocale: any;
  busRoute: Route;
  lat = 18.516726;
  lng  = 73.856255;
  zoom = 8;

  markers: marker[] = [
	  {
		  lat: 51.673858,
		  lng: 7.815982,
		  label: 'A',
		  draggable: true
	  },
	  {
		  lat: 51.373858,
		  lng: 7.215982,
		  label: 'B',
		  draggable: false
	  },
	  {
		  lat: 51.723858,
		  lng: 7.895982,
		  label: 'C',
		  draggable: true
	  }
  ]

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe((params) => {
      this.action = params['action'];
      this.initializeBusRoute();
      if (this.action === 'new') {
        this.viewFlag = false;
      }
      if (this.action === 'edit') {
        this.viewFlag = false;
      }
      if (this.action === 'view') {
        this.viewFlag = true;
      }
      this.locale = Labels.en_IN.labels.page_title;
      this.formLocale = Labels.en_IN.labels.form_labels;
      this.pageTitle = this.locale[this.action] + ' ' + this.locale.student;
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

  initializeBusRoute() {
    this.busRoute = new Route(0);
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  mapClicked($event) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }

  markerDragEnd(m: marker, $event) {
    console.log('dragEnd', m, $event);
  }

}

interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
