export class Bus {

  public busId: number;
  public busNo: string;
  public owner: string;
  public createdAt: string;
  public updatedAt: string;
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
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.route = route;
    this.driver = driver;
  }
}
