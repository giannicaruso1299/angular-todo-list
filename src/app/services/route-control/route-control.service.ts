import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RouteControlService implements CanActivate {

  constructor(private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot) {
    if (sessionStorage.getItem('token')) {
      return true;
    }
    if (route.routeConfig.path.indexOf('login') < 0) {
      this._router.navigate(['/login'])
    }
    return false;
  }

}
