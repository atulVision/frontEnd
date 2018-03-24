export class BusStop {
  public stopId: number;
  public stopName: string;
  public stopLat: string;
  public stopLong: string;


  constructor(stopId: number, stopName: string,
    stopLat: string, stopLong: string
  ) {
    this.stopId = stopId;
    this.stopName = stopName;
    this.stopLat = stopLat;
    this.stopLong = stopLong;
  }
}
