import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../../utils/app-config';
import { Labels } from '../../utils/labels';
import { Router } from '@angular/router';
import { UtilFunctions } from '../../utils/util-functions';
import { Route, PickUpPoint, Marker } from '../../models/route.model';
import { BusStop } from '../../models/bus-stop.model';
import { Broadcaster } from '../../utils/broadcaster';
import { RouteService } from '../../services/route.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-school-route',
  templateUrl: './school-route.component.html',
  styleUrls: ['./school-route.component.css']
})
export class SchoolRouteComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public zoom: number;
  action: string;
  viewFlag = false;
  pageTitle: any;
  locale: any;
  formLocale: any;
  busRoute: Route;
  from: BusStop;
  to: BusStop;
  pickUps: Array<PickUpPoint> = [];
  markers: Array<Marker> = [];
  dir: any;

  constructor(private route: ActivatedRoute, private router: Router, private broadcaster: Broadcaster,
    private _route: RouteService, private spinnerService: Ng4LoadingSpinnerService) {
    this.route.params.subscribe((params) => {
      this.action = params['action'];
      this.initializeBusRoute();
      if (this.action === 'new') {
        this.viewFlag = false;
      }
      if (this.action === 'edit') {
        this.viewFlag = false;
        this.busRoute = this.broadcaster.storage;
      }
      if (this.action === 'view') {
        this.viewFlag = true;
        this.busRoute = this.broadcaster.storage;
      }
      this.locale = Labels.en_IN.labels.page_title;
      this.formLocale = Labels.en_IN.labels.form_labels;
      this.pageTitle = this.locale[this.action] + ' ' + this.locale.route;
    });
  }

  ngOnInit() {
    this.checkLogin();
    this.zoom = 4;
    this.latitude = 18.5206688662618;
    this.longitude = 73.8581528668874;
    this.setCurrentPosition();
    this.dir = {
      origin: { lat: 18.59187137269293, lng: 73.75622354680672 },
      destination: { lat: 18.5144071585604, lng: 73.92882907377498 }
    };
  }

  checkLogin() {
    const user = UtilFunctions.getLocalStorage('user');
    if (user) {
      return;
    }
    this.router.navigate(['/login']);
  }

  initializeBusRoute() {
    this.from = new BusStop(0, '', '', '');
    this.to = new BusStop(0, '', '', '');
    this.pickUps = [];
    this.busRoute = new Route(0, '', this.from, this.to, this.pickUps);
  }

  backToList() {
    this.router.navigate(['/list/route']);
  }

  addRoute(data) {
    console.log(data);
    this.spinnerService.show();
    if (this.action === 'new') {
      this._route.saveRoute(data).subscribe((res) => {
        console.log(res);
        this.spinnerService.hide();
    }, (resError) => {
    });
    }
    if (this.action === 'edit') {
      this._route.updateRoute(this.busRoute.routeId, this.busRoute).subscribe((res) => {
        console.log(res);
        this.spinnerService.hide();
    }, (resError) => {
    });
    }
  }

  addPickUp() {

  }

  deletePickUp() {

  }

  private clickedMarker(index: number) {
    console.log(`clicked the marker: ${index}`);
  }

  private mapClicked($event) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }

  private markerDragEnd(m: Marker, $event) {
    console.log('dragEnd', m, $event);
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
}
