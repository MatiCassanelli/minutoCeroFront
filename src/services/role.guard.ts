import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";
import {RoleService} from "./role.service";

@Injectable()
export class RoleGuardService implements CanActivate, CanActivateChild{
  constructor(public router: Router,
              private roleService: RoleService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.roleService.checkType(route.data["type"])){
      if(route.data["type"] === 'Predio'){
        var stepRegistro = JSON.parse(localStorage.getItem('usuario')).stepRegistro;
        if(stepRegistro === 5){
          if(state.url.includes('/predio/registro'))
            this.roleService.redirectToHome();
          else
            return true;
        }
        else if(state.url.includes('/predio/registro'))
          return true;
        else
          this.roleService.redirectToRegistro(stepRegistro);
      }
      else
        return true;
    }
    else{
      this.router.navigateByUrl('/unauthorized');
      return false;
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.roleService.checkType(route.data["type"])){
      if(route.data["type"] === 'Predio'){
        var stepRegistro = JSON.parse(localStorage.getItem('usuario')).stepRegistro;
        if(stepRegistro === 5){
          if(state.url.includes('/predio/registro'))
            this.roleService.redirectToHome();
          else
            return true;
        }
        else if(state.url.includes('/predio/registro'))
          return true;
        else
          this.roleService.redirectToRegistro(stepRegistro);
      }
      else
        return true;
    }
    else{
      this.router.navigateByUrl('/unauthorized');
      return false;
    }
  }
}
