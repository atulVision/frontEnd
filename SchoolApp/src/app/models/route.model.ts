import { BusStop } from './bus-stop.model';

// Author : Tushar Upadhyay

export class Route {
  public routeId: number;
  public routeName: string;
  public fromBusStop: BusStop;
  public toBusStop: BusStop;

  constructor(routeId: number,
    routeName: string,
    fromBusStop: BusStop,
    toBusStop: BusStop) {
    this.routeId = routeId;
    this.routeName = routeName;
    this.fromBusStop = fromBusStop;
    this.toBusStop = toBusStop;
  }
}

export class BusStopDetails {
  public busStop: BusStop;
  public sequenceNo: number;

  constructor(busStop: BusStop,
    sequenceNo: number) {
    this.busStop = busStop;
    this.sequenceNo = sequenceNo;
  }

}

export interface Marker {
  lat: number;
  lng: number;
  draggable: boolean;
}

export class BusRoute {
  public route: Route;
  public busStopDetails: Array<BusStopDetails>;

  constructor(route: Route, busStopDetails: BusStopDetails[]) {
    this.route = route;
    this.busStopDetails = busStopDetails;
  }

}
