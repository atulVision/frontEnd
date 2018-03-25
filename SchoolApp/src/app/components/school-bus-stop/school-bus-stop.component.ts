import { Component, OnInit, NgZone, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../../utils/app-config';
import { Labels } from '../../utils/labels';
import { Router } from '@angular/router';
import { UtilFunctions } from '../../utils/util-functions';
import { BusStop } from '../../models/bus-stop.model';
import { BusStopService } from '../../services/bus-stop.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
import { Broadcaster } from '../../utils/broadcaster';
import { Marker } from '../../models/route.model';

@Component({
  selector: 'app-school-bus-stop',
  templateUrl: './school-bus-stop.component.html',
  styleUrls: ['./school-bus-stop.component.css']
})
export class SchoolBusStopComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  action: string;
  viewFlag = false;
  busStop: BusStop;
  pageTitle: any;
  locale: any;
  formLocale: any;
  markers: Array<Marker> = [];

  constructor(private route: ActivatedRoute, private router: Router, private broadcaster: Broadcaster,
    private _busStop: BusStopService, private spinnerService: Ng4LoadingSpinnerService,
    private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {
    this.route.params.subscribe((params) => {
      this.action = params['action'];
      this.initializeBusStop();
      if (this.action === 'new') {
        this.viewFlag = false;
      }
      if (this.action === 'edit') {
        this.viewFlag = false;
        this.busStop = this.broadcaster.storage;
      }
      if (this.action === 'view') {
        this.viewFlag = true;
        this.busStop = this.broadcaster.storage;
      }
      this.locale = Labels.en_IN.labels.page_title;
      this.formLocale = Labels.en_IN.labels.form_labels;
      this.pageTitle = this.locale[this.action] + ' ' + this.locale.bus_stop;
    });
  }

  ngOnInit() {
    this.checkLogin();
     this.zoom = 4;
     this.latitude = 18.5206688662618;
     this.longitude = 73.8581528668874;
     this.searchControl = new FormControl();
     this.setCurrentPosition();

     this.mapsAPILoader.load().then(() => {
       const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
         types: ['address']
       });
       autocomplete.addListener('place_changed', () => {
         this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
           if (place.geometry === undefined || place.geometry === null) {
             return;
           }
           this.latitude = place.geometry.location.lat();
           this.longitude = place.geometry.location.lng();
           this.zoom = 12;
           this.busStop.stopLat = place.geometry.location.lat().toString();
           this.busStop.stopLong = place.geometry.location.lng().toString();
         });
       });
     });
  }

  private initializeBusStop() {
    this.busStop = new BusStop(0, '', '', '');
  }

  private addbusStop(data) {
  console.log(data);
  this.spinnerService.show();
  if (this.action === 'new') {
    this._busStop.saveBusStop(data).subscribe((res) => {
      console.log(res);
      this.spinnerService.hide();
  }, (resError) => {
  });
  }
  if (this.action === 'edit') {
    this._busStop.updateBusStop(this.busStop.stopId, this.busStop).subscribe((res) => {
      console.log(res);
      this.spinnerService.hide();
  }, (resError) => {
  });
  }
  }

  private backToList() {
    this.router.navigate(['/list/bus']);
  }

  private checkLogin() {
    const user = UtilFunctions.getLocalStorage('user');
    if ( user ) {
      return;
    }
    this.router.navigate(['/login']);
  }

  private clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  private mapClicked($event) {
    this.markers.pop();
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
    this.busStop.stopLat = $event.coords.lat;
    this.busStop.stopLong = $event.coords.lng;
  }

  private markerDragEnd(m: Marker, $event) {
    console.log('dragEnd', m, $event);
    this.busStop.stopLat = $event.coords.lat;
    this.busStop.stopLong = $event.coords.lng;
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

