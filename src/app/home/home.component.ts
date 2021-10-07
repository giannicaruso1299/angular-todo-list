import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {Observable} from "rxjs";
import {Todo} from "../model/todo";
import {User} from "../model/user";
import {TodosService} from "../services/todos.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  todos$: Observable<Todo[]>;

  user: User;

  title: string = this.isUserLogged() ? `Ciao ${this.userService.loadUser().firstName + ' ' + this.userService.loadUser().lastName}` : 'Devi ancora effettuare il login';

  constructor(private userService: UserService, private todosService: TodosService) {
    this.user = this.userService.loadUser();
  }

  ngOnInit(): void {
    if (this.isUserLogged()) {
      this.loadTodos(this.user);
    }
  }

  loadTodos(user: User) {
    return this.todosService.getTodosByUser(user);
  }

  isUserLogged() {
    return sessionStorage.getItem('token') !== null;
  }

}
