import { BankDetails } from './bank-details.model';
import { TreeViewDetails } from './tree-view-details.model';

export class UserRegistration {
  public id: number;
  public sponsor_Id: UserRegistration;
  public parent_Id: UserRegistration;
  public firstName: string;
  public lastName: string;
  public mobile: string;
  public selectState: string;
  public city: string;
  public password: string;
  public eMail_Id: string;
  public sponsorCount: number;
  public userRegField1: string;
  public userRegField2: string;
  public joiningDateTime: any;
  public userID: string;
  public bankDetails: BankDetails;
  //public treeViewDetails: TreeViewDetails;

  constructor(id: number,
    sponsor_Id: UserRegistration,
    parent_Id: UserRegistration,
    firstName: string,
    lastName: string,
    mobile: string,
    selectState: string,
    city: string,
    password: string,
    eMail_Id: string,
    sponsorCount: number,
    userRegField1: string,
    userRegField2: string,
    joiningDateTime: any,
    userID: string,
    bankDetails: BankDetails,
   // treeViewDetails: TreeViewDetails
  ) {
    this.id = id;
    this.sponsor_Id = sponsor_Id;
    this.parent_Id = parent_Id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.mobile = mobile;
    this.selectState = selectState;
    this.city = city;
    this.password = password;
    this.eMail_Id = eMail_Id;
    this.sponsorCount = sponsorCount;
    this.userRegField1 = userRegField1;
    this.userRegField2 = userRegField2;
    this.joiningDateTime = joiningDateTime;
    this.userID = userID;
    this.bankDetails = bankDetails;
    //this.treeViewDetails = treeViewDetails;
  }

}
