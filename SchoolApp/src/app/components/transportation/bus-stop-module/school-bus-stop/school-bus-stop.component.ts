import { Component, OnInit, NgZone, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../../../../utils/app-config';
import { Labels } from '../../../../utils/labels';
import { Router } from '@angular/router';
import { UtilFunctions } from '../../../../utils/util-functions';
import { BusStop } from '../../../../models/bus-stop.model';
import { BusStopService } from '../../../../services/bus-stop.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';
import { Broadcaster } from '../../../../utils/broadcaster';
import { Marker } from '../../../../models/route.model';

// Author : Tushar Upadhay

@Component({
  selector: 'app-school-bus-stop',
  templateUrl: './school-bus-stop.component.html',
  styleUrls: ['./school-bus-stop.component.css']
})
export class SchoolBusStopComponent implements OnInit {

  @ViewChild('search')
  public searchElementRef: ElementRef;

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public action: string;
  public viewFlag = false;
  public busStop: BusStop;
  public pageTitle: any;
  public locale: any;
  public formLocale: any;
  public markers: Array<Marker> = [];

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
        this.markers.push({
          lat: Number(this.busStop.latitude),
          lng: Number(this.busStop.longitude),
          draggable: true
        });
        this.zoom = 16;
      }
      if (this.action === 'view') {
        this.viewFlag = true;
        this.busStop = this.broadcaster.storage;
        this.markers.push({
          lat: Number(this.busStop.latitude),
          lng: Number(this.busStop.longitude),
          draggable: false
        });
        this.zoom = 16;
      }
      this.locale = Labels.en_IN.labels.page_title;
      this.formLocale = Labels.en_IN.labels.form_labels;
      this.pageTitle = this.locale[this.action] + ' ' + this.locale.bus_stop;
    });
  }

  ngOnInit() {
    this.checkLogin();
    this.zoom = 10;
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
          this.zoom = 16;
          this.busStop.latitude = place.geometry.location.lat().toString();
          this.busStop.longitude = place.geometry.location.lng().toString();
        });
      });
    });
  }

  private initializeBusStop() {
    this.busStop = new BusStop(null, '', '', '');
  }

  public addbusStop(data) {
    this.spinnerService.show();
    if (this.action === 'new') {
      this._busStop.saveBusStop(this.busStop).subscribe((res) => {
        this.spinnerService.hide();
      }, (resError) => {
      });
    }
    if (this.action === 'edit') {
      this._busStop.updateBusStop(this.busStop.busStopId, this.busStop).subscribe((res) => {
        this.spinnerService.hide();
      }, (resError) => {
      });
    }
  }

  public backToList() {
    this.router.navigate(['/list/busStop']);
  }

  private checkLogin() {
    const user = UtilFunctions.getLocalStorage('user');
    if (user) {
      return;
    }
    this.router.navigate(['/login']);
  }

  public clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  public mapClicked($event) {
    if (this.action === 'new' || this.action === 'edit') {
      this.markers.pop();
      this.markers.push({
        lat: $event.coords.lat,
        lng: $event.coords.lng,
        draggable: true
      });
      this.busStop.latitude = $event.coords.lat;
      this.busStop.longitude = $event.coords.lng;
    }
  }

  public markerDragEnd(m: Marker, $event) {
    console.log('dragEnd', m, $event);
    this.busStop.latitude = $event.coords.lat;
    this.busStop.longitude = $event.coords.lng;
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

