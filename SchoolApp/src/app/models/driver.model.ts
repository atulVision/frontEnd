export class Driver {
  public driverId: number;
  public firstName: string;
  public lastName: string;
  public address: string;
  public adharNo: string;
  public contactNo: string;
  public email: string;
  public password: string;
  public profile: string;
  public dob: Date;

  constructor(driverId: number, firstName: string, lastName: string, address: string,
    adharNo: string, contactNo: string, email: string, password: string, profile: string,
    dob: Date
  ) {
    this.driverId = driverId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.adharNo = adharNo;
    this.contactNo = contactNo;
    this.email = email;
    this.password = password;
    this.profile = profile;
    this.dob = dob;
  }
}
