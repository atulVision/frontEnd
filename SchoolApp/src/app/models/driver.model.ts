// Author : Tushar Upadhyay
export class Driver {
  public driverId: number;
  public firstName: string;
  public lastName: string;
  public address: string;
  public aadharNo: string;
  public contactNo: string;
  public email: string;
  public password: string;
  public profile: string;

  constructor(driverId: number,
    firstName: string,
    lastName: string,
    address: string,
    aadharNo: string,
    contactNo: string,
    email: string,
    password: string,
    profile: string
  ) {
    this.driverId = driverId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.aadharNo = aadharNo;
    this.contactNo = contactNo;
    this.email = email;
    this.password = password;
    this.profile = profile;
  }
}
