import {Component, OnInit, Output} from '@angular/core';
import {UserService} from "./services/user/user.service";
import {User} from "./model/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'TodoList di Angular';

  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    if (sessionStorage.getItem('token') !== null) {
      this.user = this.loadUserByToken();
      this.title = `Benvenuto ${this.user.firstName} ${this.user.lastName}`;
    } else {
      this.title = 'Registrati per visualizzare il contenuto che vuoi';
    }
  }

  loadUserByToken() {
    return this.userService.loadUser();
  }

}
