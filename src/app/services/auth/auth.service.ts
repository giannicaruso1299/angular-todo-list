import { Injectable } from '@angular/core';
import {User} from "../../model/user";
import {Token} from "../../model/token";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SharedDataService} from "../shared-data/shared-data.service";
import {map} from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router,private http: HttpClient, private sharedData: SharedDataService) { }

  user: User;
  errors: any;

  login(username: string, password: string) {
    this.errors = [];
    return this.http.get<User[]>('http://localhost:4200/assets/users.json').pipe(
      map(res => {
        let user = res.find(usr => {
          return usr.username === username
        });
        if (!user) {
          this.errors = {userNotFound: true};
          return this.errors;
        } else {
          if (user.password !== password) {
            this.errors = {wrongPassword: true};
            return this.errors;
          }
        }
        return user;
      })
    )
  }

  getUserIfNotExists(payload: any): Observable<any> {

    this.errors = [];
    return this.http.get<User[]>('http://localhost:4200/assets/users.json').pipe(
      map(res => {
        let user = res.find(usr => {
          return usr.username === payload.username
        });
        if (user) {
          this.errors = {alreadyExistingUser: true};
          return this.errors;
        }
        return user;
      })
    );
  }

  register(payload: any) {
    return this.http.post<User>('http://localhost:9000/api/save-user', payload);
  }

  getLengthOfUsersTable() {
    return this.http.get<User[]>('http://localhost:4200/assets/users.json').pipe(
      map (res => {
        return res.length;
      })
    );
  }

  logout() {
    this.sharedData.setUser(null);
    sessionStorage.removeItem('token');
    window.location.reload();
  }

}
