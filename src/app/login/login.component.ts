import { Component, OnInit } from '@angular/core';
import {Jugador} from "../models/jugador";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as global from "../app.global";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type":'application/json'
  }),
  withCredentials: true
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  jugador: Jugador;
  rta: string;
  facebook: string;
  google: string;
  logout: string;
  constructor(private http: HttpClient) {
    this.facebook = global.serverURL + '/auth/login/facebook/jugador/';
    this.google = global.serverURL + '/auth/login/google/jugador/';
    this.logout = global.serverURL + '/auth/logout';
  }

  ngOnInit() {
    // this.comprobar();
  }

  // comprobar() {
  //   this.http.get<Jugador>(global.serverURL + '/usuario/usuarioInfo', httpOptions).subscribe((res:Jugador)=>{
  //     this.jugador = res;
  //     if(!this.jugador.nombre)
  //       this.rta = res.toString();
  //     else
  //       this.rta = "Bienvenido "+this.jugador.nombre;
  //   })
  //
  // }

}

