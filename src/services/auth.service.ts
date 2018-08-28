import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as global from '../app/app.global';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type":'application/json'
  }),
  withCredentials: true
};

@Injectable()
export class AuthService {

  private api = global.serverURL + '/usuario/';

  constructor(private http: HttpClient) {

  }

  isLoggedIn() {
    return this.http.get<boolean>(this.api + 'usuarioInfo2', httpOptions)
  }

}
