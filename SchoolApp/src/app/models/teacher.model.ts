// Author : Tushar Upadhyay
export class Teacher {
  public teacherId: number;
  public firstName: string;
  public lastName: string;
  public address: string;
  public profile: string;
  public contactNo: string;
  public email: string;
  public designation: string;
  public password: string;
  public dob: any;

  constructor(teacherId: number,
    firstName: string,
    lastName: string,
    address: string,
    contactNo: string,
    email: string,
    designation: string,
    password: string,
    dob: any,
    profile: string
  ) {
    this.teacherId = teacherId;
    this.firstName = firstName;
    this.address = address;
    this.lastName = lastName;
    this.contactNo = contactNo;
    this.email = email;
    this.designation = designation;
    this.password = password;
    this.dob = dob;
    this.profile = profile;
  }
}

