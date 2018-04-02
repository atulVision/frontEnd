import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../../../../utils/app-config';
import { Labels } from '../../../../utils/labels';
import { Router } from '@angular/router';
import { UtilFunctions } from '../../../../utils/util-functions';
import { Route, Marker, BusStopDetails, BusRoute } from '../../../../models/route.model';
import { BusStop } from '../../../../models/bus-stop.model';
import { Broadcaster } from '../../../../utils/broadcaster';
import { RouteService } from '../../../../services/route.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { BusStopService } from '../../../../services/bus-stop.service';

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
  public markers: Array<Marker> = [];
  public dirList: any;

  public busRoute: Route;
  public from: BusStop;
  public to: BusStop;
  public pickUp: BusStop;
  public seq: number;
  public busStopDetail: BusStopDetails;
  public pickUpPoints: Array<BusStopDetails> = [];

  public stopList: Array<BusStop> = [];
  public finalRoute: BusRoute;

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
        this.finalRoute = this.broadcaster.storage;
        this.busRoute = this.finalRoute.route;
        this.pickUpPoints = this.finalRoute.busStopDetails;
        this.addMarker(this.busRoute.fromBusStop);
        this.addPickUpMarkers();
        this.addMarker(this.busRoute.toBusStop);
        console.log(this.finalRoute);
      }
      if (this.action === 'view') {
        this.viewFlag = true;
        this.finalRoute = this.broadcaster.storage;
        this.busRoute = this.finalRoute.route;
        this.pickUpPoints = this.finalRoute.busStopDetails;
        this.addMarker(this.busRoute.fromBusStop);
        this.addPickUpMarkers();
        this.addMarker(this.busRoute.toBusStop);
        console.log(this.finalRoute);
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
    this.zoom = 10;
    this.latitude = 18.5206688662618;
    this.longitude = 73.8581528668874;
    this.setCurrentPosition();
    this.dirList = [
      {
        origin: { lat: 18.5144071585604, lng: 73.92882907377498 },
        destination: { lat: 19.514407159000, lng: 70.92882907378000 }
      }
    ];
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
    this.pickUpPoints = [];
    this.busRoute = new Route(null, '', this.from, this.to);
    this.finalRoute = new BusRoute(this.busRoute, this.pickUpPoints);
    this.busStopDetail = new BusStopDetails(this.pickUp, null);
  }

  public backToList() {
    this.router.navigate(['/list/route']);
  }

  public addRoute(data) {
    console.log(this.finalRoute);
    this.spinnerService.show();
    if (this.action === 'new') {
      this._route.saveRoute(this.finalRoute).subscribe((res) => {
        this.spinnerService.hide();
      }, (resError) => {
      });
    }
    if (this.action === 'edit') {
      this._route.updateRoute(this.finalRoute.route.routeId, this.finalRoute).subscribe((res) => {
        this.spinnerService.hide();
      }, (resError) => {
      });
    }
  }

  public addPickUp() {
    this.busStopDetail.sequenceNo = this.seq;
    this.busStopDetail.busStop = this.pickUp;
    this.pickUpPoints.push(this.busStopDetail);
    this.seq = this.seq + 1;
    this.markers.push({
      lat: Number(this.pickUp.latitude),
      lng: Number(this.pickUp.longitude),
      draggable: false
    });
    this.busStopDetail = new BusStopDetails(new BusStop(null, '', '', ''), null);
  }

  public addMarker(element) {
    this.markers.push({
      lat: Number(element.latitude),
      lng: Number(element.longitude),
      draggable: false
    });
  }

  public addPickUpMarkers() {
    this.pickUpPoints.forEach(element => {
      this.markers.push({
        lat: Number(element.busStop.latitude),
        lng: Number(element.busStop.longitude),
        draggable: false
      });
    });
  }

  public deletePickUp(stop, index) {
    this.pickUpPoints.splice(index, 1);
    this.markers.splice(index, 1);
    if (this.action === 'edit') {
      console.log(stop.busStop.busStopId);
      this._route.deleteBusStop(this.busRoute.routeId, stop.busStop.busStopId).subscribe((res) => {
      }, (resError) => {
      });
    }
  }

  public clickedMarker(index: number) {
    console.log(`clicked the marker: ${index}`);
  }

  public mapClicked($event) {

  }

  public markerDragEnd(m: Marker, $event) {
    console.log('dragEnd', m, $event);
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 10;
      });
    }
  }
}
