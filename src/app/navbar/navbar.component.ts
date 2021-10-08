import {Component, Input, OnInit} from '@angular/core';
import {User} from "../model/user";
import {AuthService} from "../services/auth/auth.service";
import {SharedDataService} from "../services/shared-data/shared-data.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title: string = "TodoList Angular";

  user: User;

  constructor(public authService: AuthService, private sharedData: SharedDataService) {
    this.sharedData.addUserObserverSubscriber(this);
  }

  ngOnInit(): void {
    this.user = this.sharedData.user;
  }

  isLoginOrRegister() {
    return window.location.pathname === '/login' || window.location.pathname === '/register';
  }

  notifyUser(user: User) {
    this.user = user;
  }

}
