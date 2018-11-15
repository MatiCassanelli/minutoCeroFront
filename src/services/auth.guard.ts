import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map'



@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(public authService: AuthService, public router: Router) {}

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean {
    if(this.authService.isLoggedIn()){
      return true;
    }
    if(this.authService.isFirstTime()){
      this.authService.logIn()
    }
    else{
      this.router.navigateByUrl('/login');
      return false;
    }

  }

  canActivateChild(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean{
    if(this.authService.isLoggedIn()){
      return true;
    }
    this.router.navigateByUrl('/login');
    return false;
  }
}
