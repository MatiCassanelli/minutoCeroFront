import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map'



@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<boolean>|boolean {
    return this.auth.isLoggedIn().map((res) => {
      if (res) {
        return true;
      }
      else {
        this.router.navigateByUrl('/login');
        return false;
      }
    })
  }}
