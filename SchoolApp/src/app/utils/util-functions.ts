// Author : Tushar Upadhyay
export class UtilFunctions {

  public static setLocalStorage(type, item) {
    localStorage.setItem(type, item);
  }
  public static getLocalStorage(type) {
    return localStorage.getItem(type);
  }
  public static clearLocalStorage() {
    return localStorage.clear();
  }
  public static isUserLoggedIn() {
    const userName = this.getLocalStorage('userName');
    if (userName) {
      return userName;
    } else {
      return false;
    }
  }
}
