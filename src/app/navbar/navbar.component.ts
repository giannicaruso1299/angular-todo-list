import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title: string = "TodoList Angular";

  constructor() { }

  ngOnInit(): void {
  }

  isLoginOrRegister() {
    return window.location.pathname === '/login' || window.location.pathname === '/register';
  }

}
