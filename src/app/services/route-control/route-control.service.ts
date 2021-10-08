import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {SharedDataService} from "../shared-data/shared-data.service";

@Injectable({
  providedIn: 'root'
})
export class RouteControlService implements CanActivate {

  constructor(private _router: Router, private sharedData: SharedDataService) { }

  canActivate(route: ActivatedRouteSnapshot) {
    if (this.sharedData.user) {
      return true;
    }
    if (route.routeConfig.path.indexOf('login') < 0) {
      this._router.navigate(['/login'])
    }
    return false;
  }

}
