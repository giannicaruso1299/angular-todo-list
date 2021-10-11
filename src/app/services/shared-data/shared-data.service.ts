import { Injectable } from '@angular/core';
import {User} from "../../model/user";

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  userObserverList: any;
  user: User;

  modal: boolean;
  modalObserverList: any;

  modalText: string = '';
  modalTextObserverList: any;

  constructor() {
    this.userObserverList = [];
    this.modalObserverList = [];
    this.modalTextObserverList = [];
    this.modal = true;
    this.modalText = 'Suca';
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.notifyUserObserver(this.user);
    this.notifyModalObserver(this.modal);
  }

  public setUser(user: User): void {
    this.user = user;
    if (user) {
      sessionStorage.setItem('user', JSON.stringify(this.user));
    } else {
      sessionStorage.removeItem('user');
    }
  }

  public setModal(value: boolean, text: string):void {
    this.modal = value;
    this.modalText = text;
  }

  addUserObserverSubscriber(subscribe: any) {
    this.userObserverList.push(subscribe);
  }

  addModalObserverSubscriber(subscribe: any) {
    this.userObserverList.push(subscribe);
  }

  addModalTextObserverSubscriber(subscribe: any) {
    this.modalTextObserverList.push(subscribe);
  }

  notifyModalObserver(value: boolean) {
    this.modalObserverList.forEach(el => {
      if (el.notifyModal) {
        el.notifyModal(value);
      }
    });
  }

  notifyModalTextObserver(value: string) {
    this.modalTextObserverList.forEach(el => {
      if (el.notifyModalText) {
        el.notifyModalText(value);
      }
    });
  }


  notifyUserObserver(value: User) {
    this.userObserverList.forEach(el => {
      if (el.notifyUser) {
        el.notifyUser(value);
      }
    })
  }

}
