import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as global from '../app/app.global';
import {Router} from "@angular/router";
import {Usuario} from "../app/models/usuario";
import {RoleService} from "./role.service";
import {environment} from "../environments/environment";
import {ObservableService} from '../app/observable.service';
import moment = require("moment");

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
              private roleService: RoleService,
              private observableService: ObservableService) {

  }

  isLoggedIn() {
    if (localStorage.getItem('usuario') !== null) {
      return true;
    }
  }

  updateLocalStorage(state) {
    if (!(moment.utc().isSame(localStorage.getItem('date'), 'day'))) {
      this.http.get<Usuario>(this.api + 'usuarioInfo', httpOptions).subscribe(res => {
        if (res) {
          let todayDate = moment.utc().startOf('day').format();
          localStorage.setItem('usuario', JSON.stringify(res));
          localStorage.setItem('type', res.type);
          localStorage.setItem('id', res._id);
          localStorage.setItem('date', todayDate.toString());
          this.router.navigateByUrl(state.url);
        } else {
          this.logOut();
        }
      });
    } else {
      return true;
    }
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
        let todayDate = moment.utc().startOf('day').format();
        localStorage.setItem('usuario', JSON.stringify(res));
        localStorage.setItem('type', res.type);
        localStorage.setItem('id', res._id);
        localStorage.setItem('date', todayDate.toString());
        localStorage.removeItem('loggingIn');
        this.observableService.loguear(true);
        if (res.type === 'Jugador' || res.stepRegistro === 5)
          this.roleService.redirectToHome();
        else {
          this.roleService.redirectToRegistro(res.stepRegistro);
        }
        return;
      } else {
        this.logOut();
      }
    });
  }

  logOut() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('type');
    localStorage.removeItem('id');
    this.observableService.loguear(false);
  }
}
