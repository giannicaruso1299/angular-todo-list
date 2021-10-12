import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth/auth.service";
import {Todo} from "../model/todo";
import {User} from "../model/user";
import {TodosService} from "../services/todos/todos.service";
import {SharedDataService} from "../services/shared-data/shared-data.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalService} from "../services/modal/modal.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  todos$: Todo[];

  user: User;

  title: string;

  openForm: boolean;

  titleTodoErrorMessage: string;
  descTodoErrorMessage: string;
  dateTodoErrorMessage: string;

  modalShow: boolean;
  modalTitle: string;
  modalText: string;

  closeResult = '';

  insertTodo: FormGroup = new FormGroup({
    title: new FormControl(null, [
      Validators.required
    ]),
    description: new FormControl(null, [
      Validators.required
    ]),
    date: new FormControl(null, [
      Validators.required,
    ])
  });

  constructor(private userService: AuthService, public modal: ModalService, private sharedData: SharedDataService ,private todosService: TodosService, private modalService: NgbModal) {
    this.sharedData.addUserObserverSubscriber(this);
    this.todosService.addTodosObserverSubscriber(this);
  }

  openModal() {
    document.getElementById('homeModalButton').click();
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }

  ngOnInit(): void {
    this.modalShow = false;
    this.modalText = '';
    this.modalTitle = '';
    this.user = this.sharedData.user;
    this.title = this.user ? `Ciao ${this.user.firstName + ' ' + this.user.lastName}` : 'Devi ancora effettuare il login'
    if (this.user) {
      this.loadTodos(this.user)
        .subscribe(todos => {
          this.todos$ = todos;
        });
    }
  }

  openTodoForm() {
    this.openForm = !this.openForm;
  }

  validateRequired() {
    if (this.insertTodo.controls.title.invalid) {
      this.titleTodoErrorMessage = 'Il titolo del todo non può essere vuoto';
    }
    if (this.insertTodo.controls.description.invalid) {
      this.descTodoErrorMessage = 'La descrizione del todo non può essere vuota';
    }
    if (this.insertTodo.controls.date.invalid) {
      this.dateTodoErrorMessage = 'La data del todo non può essere vuota';
    }
  }

  addTodo() {
    console.log('Sto aggiungendo i todo');
    this.sharedData.notifyLoaderObserver(true);
    let last_index;
    this.todosService.getLastTodoIndex()
      .subscribe(res => {
        last_index = res;
      }).add(() => {
        let user = JSON.parse(sessionStorage.getItem('user'));
        let user_id = user.id;
        let payload = {
          id: last_index + 1,
          title: this.insertTodo.controls.title.value,
          desc: this.insertTodo.controls.description.value,
          time: this.insertTodo.controls.date.value,
          user_id: user_id
        };
        this.todosService.addTodo(payload)
          .subscribe(() => {
            this.sharedData.notifyLoaderObserver(false);
            this.todosService.getTodosByUser(JSON.parse(sessionStorage.getItem('user')))
              .subscribe(todos => {
                this.todosService.setTodos(todos);
                this.todosService.notifyTodoObserver(todos)
                this.insertTodo.reset();
                this.modalShow = true;
                this.modalText = 'Todo correttamente aggiunto';
                this.modalTitle = 'Fatto';
                this.openModal();
              });
          });
    });
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
