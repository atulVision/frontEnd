import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../../utils/app-config';
import { Labels } from '../../utils/labels';
import { Router } from '@angular/router';
import { UtilFunctions } from '../../utils/util-functions';
import { Route, Marker, BusStopDetails, BusRoute } from '../../models/route.model';
import { BusStop } from '../../models/bus-stop.model';
import { Broadcaster } from '../../utils/broadcaster';
import { RouteService } from '../../services/route.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { BusStopService } from '../../services/bus-stop.service';

@Component({
  selector: 'app-school-route',
  templateUrl: './school-route.component.html',
  styleUrls: ['./school-route.component.css']
})
export class SchoolRouteComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public zoom: number;
  public action: string;
  public viewFlag = false;
  public pageTitle: any;
  public locale: any;
  public formLocale: any;
  public busRoute: Route;
  public from: BusStop;
  public to: BusStop;
  public busStopDetail: BusStopDetails;
  public pickUp: BusStop;
  public seq: number;
  public pickUps: Array<BusStopDetails> = [];
  public markers: Array<Marker> = [];
  public dir: any;
  public stopList: Array<BusStop> = [];
  public dataToSend: BusRoute;

  constructor(private route: ActivatedRoute, private router: Router, private broadcaster: Broadcaster,
    private _route: RouteService, private _busS: BusStopService, private spinnerService: Ng4LoadingSpinnerService) {
    this.route.params.subscribe((params) => {
      this.action = params['action'];
      this.initializeBusRoute();
      if (this.action === 'new') {
        this.viewFlag = false;
      }
      if (this.action === 'edit') {
        this.viewFlag = false;
        this.dataToSend = this.broadcaster.storage;
        this.busRoute = this.dataToSend.route;
        this.pickUps = this.dataToSend.busStopDetails;
        console.log(this.dataToSend );
      }
      if (this.action === 'view') {
        this.viewFlag = true;
        this.dataToSend = this.broadcaster.storage;
        this.busRoute = this.dataToSend.route;
        this.pickUps = this.dataToSend.busStopDetails;
        console.log(this.dataToSend );
      }
      this.locale = Labels.en_IN.labels.page_title;
      this.formLocale = Labels.en_IN.labels.form_labels;
      this.pageTitle = this.locale[this.action] + ' ' + this.locale.route;
    });
  }

  ngOnInit() {
    this.checkLogin();
    this._busS.getBusStopList().subscribe((res) => {
      this.stopList = res;
    }, (resError) => {
    });
    this.zoom = 4;
    this.latitude = 18.5206688662618;
    this.longitude = 73.8581528668874;
    this.setCurrentPosition();
    this.dir = {
      origin: { lat: 18.59187137269293, lng: 73.75622354680672 },
      destination: { lat: 18.5144071585604, lng: 73.92882907377498 }
    };
  }

  private checkLogin() {
    const user = UtilFunctions.getLocalStorage('user');
    if (user) {
      return;
    }
    this.router.navigate(['/login']);
  }

  private initializeBusRoute() {
    this.seq = 1;
    this.pickUp = new BusStop(null, '', '', '');
    this.from = new BusStop(null, '', '', '');
    this.to = new BusStop(null, '', '', '');
    this.pickUps = [];
    this.busRoute = new Route(null, '', this.from, this.to);
    this.dataToSend = new BusRoute(this.busRoute, this.pickUps);
    this.busStopDetail = new BusStopDetails(this.pickUp, null);
  }

  public backToList() {
    this.router.navigate(['/list/route']);
  }

  public addRoute(data) {
    console.log(data);
    console.log(this.dataToSend);
    // this.spinnerService.show();
    // if (this.action === 'new') {
    //   this._route.saveRoute(data).subscribe((res) => {
    //     console.log(res);
    //     this.spinnerService.hide();
    //   }, (resError) => {
    //   });
    // }
    // if (this.action === 'edit') {
    //   this._route.updateRoute(this.busRoute.routeId, this.busRoute).subscribe((res) => {
    //     console.log(res);
    //     this.spinnerService.hide();
    //   }, (resError) => {
    //   });
    // }
  }

  public addPickUp() {
    this.busStopDetail.sequenceNo = this.seq;
    this.busStopDetail.busStop = this.pickUp;
    this.pickUps.push(this.busStopDetail);
    this.busStopDetail = new BusStopDetails(new BusStop(null, '', '', ''), null);
    this.seq = this.seq + 1;
    this.markers.push({
      lat: Number(this.pickUp.latitude),
      lng: Number(this.pickUp.longitude),
      draggable: false
    });
  }

  public deletePickUp(index) {
    console.log(index);
    this.pickUps.splice(index, 1);
    console.log(this.pickUps);
  }

  public clickedMarker(index: number) {
    console.log(`clicked the marker: ${index}`);
  }

  public mapClicked($event) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }

  public markerDragEnd(m: Marker, $event) {
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
