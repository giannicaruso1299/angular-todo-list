import { Component, OnInit } from '@angular/core';
import {SharedDataService} from "../../services/shared-data/shared-data.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  show: boolean;

  title: string;

  constructor(public sharedData: SharedDataService) {
    this.sharedData.addModalObserverSubscriber(this);
    this.sharedData.addModalTextObserverSubscriber(this);
  }

  ngOnInit(): void {
    this.show = this.sharedData.modal;
    this.title = this.sharedData.modalText;
  }

  notifyModal(show: boolean) {
    this.show = show;
  }

  notifyModalText(value: string) {
    this.title = value;
  }

}
