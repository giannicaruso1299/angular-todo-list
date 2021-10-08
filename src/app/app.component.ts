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

  constructor(private sharedData: SharedDataService, private authService: AuthService) {
    this.sharedData.addUserObserverSubscriber(this);
  }

  ngOnInit() {
    this.user = this.sharedData.user;
  }

  notifyUser(user: User) {
    this.user = user;
  }

}
