import {Injectable} from '@angular/core';
import {User} from "../../model/user";
import {Todo} from "../../model/todo";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {SharedDataService} from "../shared-data/shared-data.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  todosObserverList: any;

  todos$: Todo[];

  constructor(private http: HttpClient, private router: Router, private sharedData: SharedDataService) {
    this.todosObserverList = [];
  }

  setTodos(value: Todo[]) {
    this.todos$ = value;
  }

  getTodosByUser(user: User): Observable<Todo[]> {
    return this.http.get<Todo[]>('http://localhost:4200/assets/todos.json').pipe(
      map(res => {
        return res.filter(todo => {
          return todo.user_id === user.id;
        })
      })
    );
  }

  getLastTodoIndex() {
    return this.http.get<Todo[]>('http://localhost:4200/assets/todos.json').pipe(
      map(res => {
        return res.length;
      })
    )
  }

  addTodo(payload) {
    return this.http.post<Todo>('http://localhost:9000/api/save-todo', payload);
  }

  addTodosObserverSubscriber(subscribe: any) {
    this.todosObserverList.push(subscribe);
  }

  notifyTodoObserver(value: Todo[]) {
    this.todosObserverList.forEach(el => {
      if (el.notifyTodo) {
        el.notifyTodo(value);
      }
    })
  }

}
