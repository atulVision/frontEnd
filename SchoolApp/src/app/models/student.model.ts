import { Classes } from './classes.model';
import { Division } from './division.model';
import {  Route } from './route.model';
import { BusStop } from './bus-stop.model';

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
  public emergencyNo: string;
  public prNo: string;
  public dob: any;
  public bloodGroup: string;
  public classDevision: Classes;
  public division: Division;
  public email: string;
  public rollNo: string;
  public password: string;
  public address: string;
  public profilePic: string;
  public route: Route;
  public busStop: BusStop;
  public gender: string;
  public admissionDate: any;

  constructor(studentId: number, firstName: string, fatherName: string, motherName: string,
    guardianName: string, lastName: string, fatherContactNo: string, motherContactNo: string,
    guardianContactNo: string, emergencyNo: string, prNo: string, dob: any, admissionDate: any,
    bloodGroup: string, classDevision: Classes, division: Division, email: string, rollNo: string,
    password: string, address: string, route: Route, busStop: BusStop, profilePic: string, gender: string
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
    this.emergencyNo = emergencyNo;
    this.prNo = prNo;
    this.dob = dob;
    this.bloodGroup = bloodGroup;
    this.classDevision = classDevision;
    this.division = division;
    this.rollNo = rollNo;
    this.email = email;
    this.password = password;
    this.profilePic = profilePic;
    this.address = address;
    this.route = route;
    this.busStop = busStop;
    this.gender = gender;
    this.admissionDate = admissionDate;
  }

}
