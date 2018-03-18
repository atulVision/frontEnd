export class Bus {

  public busId: number;
  public busNo: string;
  public owner: string;
  public contactNo: string;
  public route: string;
  public driver: string;


  constructor(busId: number, busNo: string, owner: string,
    createdAt: string, updatedAt: string, contactNo: string,
    route: string, driver: string
  ) {
    this.busId = busId;
    this.busNo = busNo;
    this.owner = owner;
    this.contactNo = contactNo;
    this.route = route;
    this.driver = driver;
  }
}
