import { BusStop } from './bus-stop.model';

export class Route {

  public routeId: number;
  public routeName: string;
  public fromBusStop: BusStop;
  public toBusStop: BusStop;
  public pickUpPoints: PickUpPoints;

  constructor (routeId: number, routeName: string, fromBusStop: BusStop,
    toBusStop: BusStop, pickUpPoints: PickUpPoints) {
    this.routeId = routeId;
    this.routeName = routeName;
    this.fromBusStop = fromBusStop;
    this.toBusStop = toBusStop;
    this.pickUpPoints = pickUpPoints;
  }
}

class PickUpPoints {
  public busStop: BusStop;
  public sequenceNo: number;

  constructor (busStop: BusStop, sequenceNo: number) {
    this.busStop = busStop;
    this.sequenceNo = sequenceNo;
  }

}
