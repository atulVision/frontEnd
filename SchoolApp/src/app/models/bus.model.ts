import { Driver } from './driver.model';
import { Route } from './route.model';

export class Bus {

  public busId: number;
  public busNo: string;
  public owner: string;
  public driver: Driver;
  public route: Route;



  constructor(busId: number, busNo: string, owner: string,  driver: Driver,
    route: Route
  ) {
    this.busId = busId;
    this.busNo = busNo;
    this.owner = owner;
    this.driver = driver;
    this.route = route;
  }
}
