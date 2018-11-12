import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as global from '../app/app.global';
import {Router} from "@angular/router";
import {Usuario} from "../app/models/usuario";
import {RoleService} from "./role.service";
import {environment} from "../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": 'application/json'
  }),
  withCredentials: true
};

@Injectable()
export class AuthService {

  private api = environment.baseUrl + '/usuario/';

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
          localStorage.setItem('usuario', JSON.stringify(res));
          localStorage.setItem('type', res.type);
          localStorage.setItem('id', res._id);
          // this.roleService.redirectToHome();
          if (!this.roleService.isAllowed(type))
            this.router.navigateByUrl('/unauthorized');
          return;
        }
        // else {
        //   this.router.navigateByUrl('/login');
        //   return;
        // }
      });

    }
  }

  logOut() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('type');
    localStorage.removeItem('id');
  }
}
