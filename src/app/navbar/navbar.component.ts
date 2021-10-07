import {Component, Input, OnInit} from '@angular/core';
import {User} from "../model/user";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title: string = "TodoList Angular";

  @Input()
  user: User;

  constructor() { }

  ngOnInit(): void {
  }

  isLoginOrRegister() {
    return window.location.pathname === '/login' || window.location.pathname === '/register';
  }

  logout() {
    sessionStorage.removeItem('token');
    window.location.reload();
  }

  isUserLogged() {
    return this.user;
  }

}
