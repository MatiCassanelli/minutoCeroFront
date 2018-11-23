import {Component, OnInit} from '@angular/core';
import {Jugador} from '../models/jugador';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as global from '../app.global';
import {ActivatedRoute, Router} from '@angular/router';
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
  tipo = 'Jugador';
  url = environment.baseUrl;
  predio = false;

  constructor(private authService: AuthService,
              private router: Router,
              private roleService: RoleService,
              private route: ActivatedRoute) {
    this.predio = false;
    this.facebook = this.url + '/auth/login/facebook/jugador/';
    this.google = this.url + '/auth/login/google/jugador/';
  }

  ngOnInit() {
    this.logout = this.url + '/auth/logout';
    this.route.params.subscribe((params) => {
      if (params['tipo'] === 'predio') {
        this.tipo = 'Predio';
        this.setPredio(this.tipo);
      }
    });
    if(this.authService.isLoggedIn()){
      this.roleService.redirectToHome();
    }
  }

  setPredio(bool) {
    if (bool === 'Predio') {
      this.predio = false;
      this.facebook = this.url + '/auth/login/facebook/predio/';
      this.google = this.url + '/auth/login/google/predio/';
    }
    if (bool === 'Jugador') {
      this.predio = true;
      this.facebook = this.url + '/auth/login/facebook/jugador/';
      this.google = this.url + '/auth/login/google/jugador/';
    }
  }

  loggingInFb() {
    localStorage.setItem('loggingIn', 'true');
    window.location.href=this.facebook;
  }

  loggingInGl() {
    localStorage.setItem('loggingIn', 'true');
    window.location.href=this.google;
  }
}

