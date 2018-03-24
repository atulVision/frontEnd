export class Bus {

  public busId: number;
  public busNo: string;
  public owner: string;
  public routeId: number;
  public driverId: number;


  constructor(busId: number, busNo: string, owner: string,
    routeId: number, driverId: number
  ) {
    this.busId = busId;
    this.busNo = busNo;
    this.owner = owner;
    this.routeId = routeId;
    this.driverId = driverId;
  }
}
