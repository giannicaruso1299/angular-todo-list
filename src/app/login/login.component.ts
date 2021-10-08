import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth/auth.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../model/user";
import {SharedDataService} from "../services/shared-data/shared-data.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usernameErrorMessage: string;
  passwordErrorMessage: string;

  form = new FormGroup({
    username: new FormControl(null, [
      Validators.required
    ]),
    password: new FormControl(null, [
      Validators.required
    ])
  })

  constructor(private authService: AuthService, private router: Router, private sharedData: SharedDataService) { }

  ngOnInit(): void {
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
    let password = this.form.controls.password.value;
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
          this.sharedData.notifyUserObserver(res);
          this.router.navigate(['/']);
        }
      });
    }
  }

}
