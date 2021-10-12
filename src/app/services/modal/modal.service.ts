import {Injectable} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  show: boolean;
  modalObserverList: any;

  modalText: string = '';
  modalTextObserverList: any;

  constructor(private modal: NgbModal) {
    this.modalObserverList = [];
    this.modalTextObserverList = [];
    this.show = false;
    this.modalText = 'Suca';
  }

  public setModal(value: boolean, text: string):void {
    this.show = value;
    this.modalText = text;
  }

  addModalObserverSubscriber(subscribe: any) {
    this.modalObserverList.push(subscribe);
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
}
