import {Component, OnInit} from '@angular/core';
import {Jugador} from '../models/jugador';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as global from '../app.global';
import {Router} from '@angular/router';
import {HomeJugadorComponent} from '../views/home-jugador/home-jugador.component';
import {AuthService} from "../../services/auth.service";
import {RoleService} from "../../services/role.service";
import {environment} from "../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: true
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  facebook: string;
  google: string;
  logout: string;
  url: string;
  predio = false;

  constructor(private authService: AuthService,
              private router: Router,
              private roleService: RoleService) {
    this.predio = false;
    this.url = environment.baseUrl;
    this.facebook = this.url + '/auth/login/facebook/jugador/';
    this.google = this.url + '/auth/login/google/jugador/';
    this.logout = this.url + '/auth/logout';
  }

  ngOnInit() {
    if(this.authService.isLoggedIn()){
      this.roleService.redirectToHome();
    }
  }

  setPredio(bool) {
    if (bool === 'predio') {
      this.predio = false;
      this.facebook = this.url + '/auth/login/facebook/predio/';
      this.google = this.url + '/auth/login/google/predio/';
    }
    if (bool === 'jugador') {
      this.predio = true;
      this.facebook = this.url + '/auth/login/facebook/jugador/';
      this.google = this.url + '/auth/login/google/jugador/';
    }
  }

}

