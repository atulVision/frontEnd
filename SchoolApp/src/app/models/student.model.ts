export class Student {
  public studentId: number;
  public firstName: string;
  public fatherName: string;
  public motherName: string;
  public guardianName: string;
  public lastName: string;
  public fatherContactNo: string;
  public motherContactNo: string;
  public guardianContactNo: string;
  public emergencyContactNo: string;
  public adharNo: string;
  public prn: string;
  public dob: string;
  public bloodGroup: string;
  public classId: number;
  public divisionId: number;
  public email: string;
  public rollNo: string;
  public password: string;
  public address: string;
  public profile: string;
  public routeId: number;
  public stopId: number;

  constructor(studentId: number, firstName: string, fatherName: string, motherName: string,
    guardianName: string, lastName: string, fatherContactNo: string, motherContactNo: string,
    guardianContactNo: string, emergencyContactNo: string, adharNo: string, prn: string, dob: string,
    bloodGroup: string, classId: number, divisionId: number, email: string, rollNo: string,
    password: string, address: string, routeId: number, stopId: number, profile: string
  ) {
    this.studentId = studentId;
    this.firstName = firstName;
    this.fatherName = fatherName;
    this.motherName = motherName;
    this.guardianName = guardianName;
    this.lastName = lastName;
    this.fatherContactNo = fatherContactNo;
    this.motherContactNo = motherContactNo;
    this.guardianContactNo = guardianContactNo;
    this.emergencyContactNo = emergencyContactNo;
    this.adharNo = adharNo;
    this.prn = prn;
    this.dob = dob;
    this.bloodGroup = bloodGroup;
    this.classId = classId;
    this.divisionId = divisionId;
    this.rollNo = rollNo;
    this.email = email;
    this.password = password;
    this.profile = profile;
    this.address = address;
    this.routeId = routeId;
    this.stopId = stopId;
  }

}
