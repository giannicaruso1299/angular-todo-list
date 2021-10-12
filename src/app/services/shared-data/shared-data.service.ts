import { Injectable } from '@angular/core';
import {User} from "../../model/user";

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  userObserverList: any;
  user: User;

  constructor() {
    this.userObserverList = [];
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.notifyUserObserver(this.user);
  }

  public setUser(user: User): void {
    this.user = user;
    if (user) {
      sessionStorage.setItem('user', JSON.stringify(this.user));
    } else {
      sessionStorage.removeItem('user');
    }
  }

  addUserObserverSubscriber(subscribe: any) {
    this.userObserverList.push(subscribe);
  }

  notifyUserObserver(value: User) {
    this.userObserverList.forEach(el => {
      if (el.notifyUser) {
        el.notifyUser(value);
      }
    })
  }

}
