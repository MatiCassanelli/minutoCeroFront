import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";
import {RoleService} from "./role.service";

@Injectable()
export class RoleGuardService implements CanActivate{
  constructor(public authService: AuthService,
              public router: Router,
              private roleService: RoleService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    debugger;
    if(this.roleService.checkType(route.data["type"]))
      return true;
    else{
      this.router.navigateByUrl('/unauthorized');
      return false;
    }
  }
}
