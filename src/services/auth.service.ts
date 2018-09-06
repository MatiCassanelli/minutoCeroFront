import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as global from '../app/app.global';
import {Router} from "@angular/router";
import {Usuario} from "../app/models/usuario";
import {RoleService} from "./role.service";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": 'application/json'
  }),
  withCredentials: true
};

@Injectable()
export class AuthService {

  private api = global.serverURL + '/usuario/';

  constructor(private http: HttpClient,
              private router: Router,
              private roleService: RoleService) {

  }

  isLoggedIn() {
    if (localStorage.getItem('usuario') !== null) {
      return true;
    }
    return false
  }

  logIn(type) {
    if (localStorage.getItem('usuario') !== null) {
      if (!this.roleService.isAllowed(type)) {
        this.router.navigateByUrl('/unauthorized');
        return;
      }
    }
    else {
      this.http.get<Usuario>(this.api + 'usuarioInfo', httpOptions).subscribe(res => {
        if (res) {
          debugger;
          localStorage.setItem('usuario', JSON.stringify(res));
          // this.roleService.redirectToHome();
          if (!this.roleService.isAllowed(type))
            this.router.navigateByUrl('/unauthorized');
          return;
        }
        else {
          debugger;
          this.router.navigateByUrl('/login');
          return;
        }
      });
      // debugger;
      // this.router.navigateByUrl('/login');
      // return;
    }
  }

  logOut() {
    localStorage.removeItem('usuario');
  }
}
