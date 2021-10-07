import { Injectable } from '@angular/core';
import {User} from "../../model/user";
import {USERS} from "../../../assets/users";
import {Token} from "../../model/token";
import {TOKENS} from "../../../assets/tokens";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private router: Router) { }

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

  validateRequired(username, password): any {
    let userameErrors: string[] = [];
    let passwordErrors: string[] = [];
    let errors = {
      usernameErrors: userameErrors,
      passwordErrors: passwordErrors
    };
    if (username === '') {
      errors.usernameErrors.push('Il campo username non può essere vuoto');
    }
    if (password === '') {
      errors.passwordErrors.push('Il campo password non può essere vuoto');
    }
    if (errors.usernameErrors.length === 0 && errors.passwordErrors.length === 0) {
      return true;
    }
    return errors;
  }

  login(username, password) {
    let userameErrors: string[] = [];
    let passwordErrors: string[] = [];
    let genericErrors: string[] = [];
    let errors = {
      usernameErrors: userameErrors,
      passwordErrors: passwordErrors,
      genericErrors: genericErrors
    };
    //verifico che esista un utente con l'username inserito
    if (typeof this.validateRequired(username, password) !== "boolean") {
      //scorro gli errori di username non inserito
      let usernameErrors = this.validateRequired(username, password).usernameErrors;
      usernameErrors.map(error => {
        errors.usernameErrors.push(error);
      });
      let passwordErrors = this.validateRequired(username, password).passwordErrors;
      //scorro gli errori di password non inserita
      passwordErrors.map(error => {
        errors.passwordErrors.push(error);
      });
      return errors;
    } else {
      let user: User[] = USERS.filter(usr => {
        return usr.username === username
      });
      if (user.length === 0) {
        errors.usernameErrors.push('Hai inserito un username errato');
        //se trovo l'username, controllo la password
      } else {
        if (user[0].password === password) {
          //setto il token nel sessionStorage per il login
          let token = TOKENS.find(token => {
            return token.user_id = user[0].id;
          });
          if (token.length === 0) {
            errors.genericErrors.push('Errore generico');
          } else {
            return token;
          }
        } else {
          errors.passwordErrors.push('Hai inserito una password errata');
        }
      }
    }
    return errors;
  }

  isLogged() {
    return sessionStorage.getItem('token') !== null;
  }

}
