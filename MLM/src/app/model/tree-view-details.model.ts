import { UserRegistration } from './user-registration.model';

export class TreeViewDetails {
  public id: number;
  public userID: UserRegistration;
  public sponsor_Id: UserRegistration;
  public parent_Id: UserRegistration;
  public rightChild: UserRegistration;
  public leftChild: UserRegistration;
  public status: string;
  public tvdField1: string;
  public tvdField2: string;

  constructor(id: number,
    userID: UserRegistration,
    sponsor_Id: UserRegistration,
    parent_Id: UserRegistration,
    rightChild: UserRegistration,
    leftChild: UserRegistration,
    status: string,
    tvdField1: string,
    tvdField2: string
  ) {
    this.id = id;
    this.userID = userID;
    this.sponsor_Id = sponsor_Id;
    this.parent_Id = parent_Id;
    this.rightChild = rightChild;
    this.leftChild = leftChild;
    this.status = status;
    this.tvdField1 = tvdField1;
    this.tvdField2 = tvdField2;
  }
}
