import {Component, OnInit, Output, ViewChild} from '@angular/core';
import {AuthService} from "./services/auth/auth.service";
import {User} from "./model/user";
import {SharedDataService} from "./services/shared-data/shared-data.service";
import {ModalService} from "./services/modal/modal.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('modal')
  myModal;

  title = 'TodoList di Angular';

  user: User;

  showLoader: boolean;

  constructor(public sharedData: SharedDataService) {
    this.sharedData.addUserObserverSubscriber(this);
    this.sharedData.addLoaderObserverSubscriber(this);
  }

  ngOnInit() {
    this.showLoader = false;
    this.user = this.sharedData.user;
  }

  notifyUser(user: User) {
    this.user = user;
  }

  notifyLoader(value: boolean) {
    this.showLoader = value;
  }

}
