import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth/auth.service";
import {Router} from "@angular/router";
import {ModalService} from "../services/modal/modal.service";
import {SharedDataService} from "../services/shared-data/shared-data.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  usernameErrorMessage: string;
  passwordErrorMessage: string;
  nomeErrorMessage: string;
  cognomeErrorMessage: string;
  passwordConfirmationErrorMessage: string;

  payload: any;

  form: FormGroup = new FormGroup({
    nome: new FormControl(null, [
      Validators.required
    ]),
    cognome: new FormControl(null, [
      Validators.required
    ]),
    username: new FormControl(null, [
      Validators.required
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.min(8),
      Validators.max(16),
      Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#%\.]).{8,16})')
    ]),
    passwordConfirmation: new FormControl(null, [
      Validators.required
    ])
  });

  constructor(private authService: AuthService, private router: Router, private modalService: ModalService, private sharedData: SharedDataService) {
  }

  ngOnInit(): void {}

  validateRequired() {
    let flag: boolean = true;
    if (this.form.controls.nome.invalid) {
      if (this.form.controls.nome.errors.required) {
        this.nomeErrorMessage = 'Il campo nome non può essere vuoto';
      }
      flag = false;
    }
    if (this.form.controls.cognome.invalid) {
      if (this.form.controls.cognome.errors.required) {
        this.cognomeErrorMessage = 'Il campo cognome non può essere vuoto';
      }
      flag = false;
    }
    if (this.form.controls.username.invalid) {
      if (this.form.controls.username.errors.required) {
        this.usernameErrorMessage = 'L\'username non può essere vuoto';
      }
      flag = false;
    }
    if (this.form.controls.password.invalid) {
      if (this.form.controls.password.errors.required) {
        this.passwordErrorMessage = 'Il campo password non può essere vuoto';
      } else if (this.form.controls.password.errors.pattern) {
        console.log(this.form.controls.password.errors)
        this.passwordErrorMessage = 'La password deve contenere almeno 8 caratteri, di cui almeno una maiuscola, una minuscola, un numero e un carattere speciale';
      }
      flag = false;
    }
    if (this.form.controls.passwordConfirmation.invalid) {
      if (this.form.controls.passwordConfirmation.errors.required) {
        this.passwordConfirmationErrorMessage = 'Devi confermare la password che hai inserito';
      }
      flag = false;
    }
    else if (!this.form.controls.password.invalid && !this.form.controls.passwordConfirmation.invalid) {
      if (this.form.controls.password.value !== this.form.controls.passwordConfirmation.value) {
        this.form.controls.passwordConfirmation.setErrors({
          passwordNotMatch: true
        });
        this.passwordConfirmationErrorMessage = 'Le due password non coincidono';
        flag = false;
      }
    }
    return flag;
  }

  register(e: Event) {

    e.preventDefault();

    this.sharedData.notifyLoaderObserver(true);

    if (this.validateRequired()) {

      let nome = this.form.controls.nome.value;
      let cognome = this.form.controls.cognome.value;
      let username = this.form.controls.username.value;
      let password = this.form.controls.password.value;

      let payload = {
        firstName: nome,
        lastName: cognome,
        username: username,
        password: password
      };

      let last_index: number;

      this.authService.getUserIfNotExists(payload)
        .subscribe(res => {
          if (!res) {
            this.authService.getLengthOfUsersTable()
              .subscribe(index => {
                last_index = index;
              }).add(() => {
                this.payload = {id: last_index + 1, ...payload};
                this.authService.register(this.payload)
                  .subscribe(res1 => {
                    this.sharedData.notifyLoaderObserver(false);
                    this.modalService.setModal(true, 'Ti sei correttamente registrato');
                    this.modalService.notifyModalObserver(true);
                    this.modalService.notifyModalTextObserver('Ti sei correttamente registrato');
                    this.router.navigate(['/login']);
                  });
              });
          } else {
            if (res.alreadyExistingUser) {
              this.form.controls.username.setErrors(res);
              this.form.controls.username.invalid;
              this.usernameErrorMessage = 'Nome utente già esistente';
            }
          }
        });
    }
  }
}
