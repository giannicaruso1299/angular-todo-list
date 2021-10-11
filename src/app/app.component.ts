import {Component, OnInit, Output} from '@angular/core';
import {AuthService} from "./services/auth/auth.service";
import {User} from "./model/user";
import {SharedDataService} from "./services/shared-data/shared-data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'TodoList di Angular';

  user: User;

  modalShow: boolean;

  modalText: string;

  constructor(public sharedData: SharedDataService, private authService: AuthService) {
    this.sharedData.addUserObserverSubscriber(this);
    this.sharedData.addModalObserverSubscriber(this);
    this.sharedData.addModalTextObserverSubscriber(this);
  }

  ngOnInit() {
    this.user = this.sharedData.user;
    this.modalShow = this.sharedData.modal;
    this.modalText = this.sharedData.modalText;
  }

  notifyUser(user: User) {
    this.user = user;
  }

  notifyModal(show: boolean) {
    this.modalShow = show;
  }

  notifyModalText(text: string) {
    this.modalText = text;
  }

}
