import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth/auth.service";
import {Todo} from "../model/todo";
import {User} from "../model/user";
import {TodosService} from "../services/todos/todos.service";
import {SharedDataService} from "../services/shared-data/shared-data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  todos$: Todo[];

  user: User;

  title: string;

  constructor(private userService: AuthService, private sharedData: SharedDataService ,private todosService: TodosService) {
    this.sharedData.addUserObserverSubscriber(this);
    this.todosService.addTodosObserverSubscriber(this);
  }

  ngOnInit(): void {
    this.user = this.sharedData.user;
    this.title = this.user ? `Ciao ${this.user.firstName + ' ' + this.user.lastName}` : 'Devi ancora effettuare il login'
    if (this.user) {
      this.loadTodos(this.user)
        .subscribe(todos => {
          this.todos$ = todos;
        })
    }
  }

  notifyUser(user: User) {
    this.user = user;
  }

  notifyTodo(todos: Todo[]) {
    this.todos$ = todos;
  }

  loadTodos(user: User) {
    return this.todosService.getTodosByUser(user);
  }

}
