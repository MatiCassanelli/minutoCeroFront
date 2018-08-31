import {Component, OnInit} from '@angular/core';
import {Jugador} from '../models/jugador';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as global from '../app.global';
import {Router} from '@angular/router';
import {HomeJugadorComponent} from '../views/home-jugador/home-jugador.component';

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

  constructor() {
    this.facebook = global.serverURL + '/auth/login/facebook/jugador/';
    this.google = global.serverURL + '/auth/login/google/jugador/';
    this.logout = global.serverURL + '/auth/logout';
  }

  ngOnInit() {
  }


}

