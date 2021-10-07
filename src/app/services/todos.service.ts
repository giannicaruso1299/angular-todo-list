import {Injectable} from '@angular/core';
import {User} from "../model/user";
import {Todo} from "../model/todo";
import {TODOS} from "../../todos";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor() { }

  getTodosByUser(user: User): Observable<Todo> {
    return TODOS.filter(todo => {
      return todo.user_id === user.id;
    });
  }

}
