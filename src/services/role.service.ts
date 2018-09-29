import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as global from '../app/app.global';
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {environment} from "../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type":'application/json'
  }),
  withCredentials: true
};

@Injectable()
export class RoleService {

  private api = environment.baseUrl + '/usuario/';

  constructor(private http: HttpClient,
              private router: Router) {

  }

  isAllowed(type){
    if(!this.checkType(type))
      return false;
    return true;
  }

  redirectToHome(){
    if(this.checkType('Jugador'))
      this.router.navigateByUrl('/partido');
    else
      this.router.navigateByUrl('/predio');
  }

  checkType(type){
    if(localStorage.getItem('type')){
      if(type === localStorage.getItem('type')){
        return true;
      }
    }
    return false;
  }
}
