import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../model/user";
import {USERS} from "../../users";
import {Token} from "../model/token";
import {TOKENS} from "../../tokens";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  loadUser(): User {
    let user: User;
    let token: Token;
    token = TOKENS.find(tkn => {
      return tkn.code === sessionStorage.getItem('token');
    })
    user = USERS.find(usr => {
      return usr.id === token.user_id;
    })
    return user;
  }
}
