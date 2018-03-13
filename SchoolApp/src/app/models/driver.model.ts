export class Driver {
  public driverId: number;
  public name: string;
  public address: string;
  public createdAt: string;
  public updatedAt: string;
  public adharNumber: string;
  public mobile: string;
  public email: string;
  public position: string;
  public userName: string;
  public password: string;
  public bus: string;
  public profile: string;


  constructor(driverId: number, name: string, address: string,
    createdAt: string, updatedAt: string, adharNumber: string,
    mobile: string, email: string, position: string,
    userName: string, password: string, bus: string, profile: string
  ) {
    this.driverId = driverId;
    this.name = name;
    this.address = address;
    this.adharNumber = adharNumber;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.mobile = mobile;
    this.email = email;
    this.position = position;
    this.userName = userName;
    this.password = password;
    this.bus = bus;
    this.profile = profile;
  }
}
