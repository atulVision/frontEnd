export class User {

  public userId: number;
  public firstName: string;
  public lastName: string;
  public contactNo: string;
  public address: string;
  public email: string;
  public password: string;
  public dob: any;

  constructor(userId: number, firstName: string, lastName: string, contactNo: string,
    address: string, email: string, password: string, dob: any
  ) {
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.contactNo = contactNo;
    this.address = address;
    this.email = email;
    this.password = password;
    this.dob = dob;
  }
}
