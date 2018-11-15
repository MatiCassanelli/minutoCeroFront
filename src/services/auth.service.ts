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

  isFirstTime() {
    if (localStorage.getItem('loggingIn') !== null) {
      return true;
    }
    return false;
  }

  logIn() {
    this.http.get<Usuario>(this.api + 'usuarioInfo', httpOptions).subscribe(res => {
      if (res) {
        localStorage.setItem('usuario', JSON.stringify(res));
        localStorage.setItem('type', res.type);
        localStorage.setItem('id', res._id);
        localStorage.removeItem('loggingIn');
        if(res.type === 'Jugador' || res.stepRegistro === 5)
          this.roleService.redirectToHome();
        else {
          this.roleService.redirectToRegistro(res.stepRegistro);
        }
        return;
      }
    });
  }

  logOut() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('type');
    localStorage.removeItem('id');
  }
}
