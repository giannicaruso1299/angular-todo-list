import {Injectable} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  show: boolean;
  modalObserverList: any;

  modalTitle: string = '';
  modalText: string = '';
  modalTextObserverList: any;
  modalTitleObserverList: any;

  constructor(private modal: NgbModal) {
    this.modalObserverList = [];
    this.modalTextObserverList = [];
    this.modalTitleObserverList = [];
    this.show = false;
  }

  public setModal(value: boolean, text: string, title?: string):void {
    this.show = value;
    this.modalText = text;
    this.modalTitle = title;
  }

  addModalObserverSubscriber(subscribe: any) {
    this.modalObserverList.push(subscribe);
  }

  addModalTextObserverSubscriber(subscribe: any) {
    this.modalTextObserverList.push(subscribe);
  }

  addModalTitleObserverSubscriber(subscribe: any) {
    this.modalTitleObserverList.push(subscribe);
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

  notifyModalTitleObserver(value: string) {
    this.modalTextObserverList.forEach(el => {
      if (el.notifyModalTitle) {
        el.notifyModalTitle(value);
      }
    });
  }
}
