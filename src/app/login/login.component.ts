import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../services/auth/auth.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SharedDataService} from "../services/shared-data/shared-data.service";
import {ModalService} from "../services/modal/modal.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usernameErrorMessage: string;
  passwordErrorMessage: string;

  modalShow: boolean;
  modalText: string;

  @ViewChild('content')
  myModal;

  closeResult = '';

  form: FormGroup = new FormGroup({
    username: new FormControl(null, [
      Validators.required
    ]),
    password: new FormControl(null, [
      Validators.required
    ])
  })

  constructor(private authService: AuthService, private router: Router, private modalService: NgbModal, private modal: ModalService, private sharedData: SharedDataService) {
    this.modal.addModalObserverSubscriber(this);
    this.modal.addModalTextObserverSubscriber(this);
  }

  ngOnInit(): void {
    this.modalShow = this.modal.show;
    this.modalText = this.modal.modalText;
    if (this.modalShow) {
      this.openModal();
    }
  }

  openModal() {
    document.getElementById('modalButton').click();
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }

  validateRequired() {
    let flag: boolean = true;
    if (this.form.controls.username.invalid) {
      if (this.form.controls.username.errors.required) {
        this.usernameErrorMessage = 'L\'username non può essere vuoto';
      }
      flag = false;
    }
    if (this.form.controls.password.invalid) {
      if (this.form.controls.password.errors.required) {
        this.passwordErrorMessage = 'Il campo password non può essere vuoto';
      }
      flag = false;
    }
    return flag;
  }

  onSubmit(): void {
    let username = this.form.controls.username.value;
    let password = this.form.controls.password.value
    this.sharedData.notifyLoaderObserver(true);
    if (this.validateRequired()) {
      this.usernameErrorMessage = '';
      this.passwordErrorMessage = '';
      this.authService.login(username, password).subscribe(res => {
        if (res.userNotFound) {
          this.form.controls.username.setErrors(res.userNotFound);
          this.usernameErrorMessage = 'Hai inserito un nome utente errato';
        } else if (res.wrongPassword) {
          this.form.controls.password.setErrors(res.wrongPassword);
          this.passwordErrorMessage = 'Hai inserito una password errata';
        } else {
          this.sharedData.setUser(res);
          this.sharedData.notifyLoaderObserver(false);
          this.sharedData.notifyUserObserver(res);
          this.router.navigate(['/']);
        }
      });
    }
  }

  notifyModal(show: boolean) {
    this.modalShow = show;
  }

  notifyModalText(text: string) {
    this.modalText = text;
  }

}
