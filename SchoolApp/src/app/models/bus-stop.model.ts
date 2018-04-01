export class BusStop {
  public busStopId: number;
  public name: string;
  public latitude: string;
  public longitude: string;


  constructor(busStopId: number, name: string,
    latitude: string, longitude: string
  ) {
    this.busStopId = busStopId;
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
