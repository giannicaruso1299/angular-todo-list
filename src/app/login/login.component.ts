import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user/user.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usernameErrors: Array<string> = [];
  usernameError: boolean = false;

  passwordErrors: Array<string> = [];
  passwordError: boolean = false;

  genericError: Array<string> = [];
  errors: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  form = new FormGroup({
    username: new FormControl('', [
      Validators.required
    ])
  })

  onSubmit(): void {
    console.log(this.form.controls.username);
    // this.usernameErrors = [];
    // this.passwordErrors = [];
    // this.genericError = [];
    // let res = this.userService.login(username, password);
    // if (res.usernameErrors && res.usernameErrors.length > 0) {
    //   res.usernameErrors.map(error => {
    //     this.usernameErrors.push(error);
    //   });
    //   this.usernameError = true;
    // } else {
    //   this.usernameError = false;
    //   if (res.passwordErrors && res.passwordErrors.length > 0) {
    //     res.passwordErrors.map(error => {
    //       this.passwordErrors.push(error);
    //     });
    //     this.passwordError = true;
    //   }
    // }
    // sessionStorage.setItem('token', res.code);
    // this.router.navigate(['/'])
  }

}
