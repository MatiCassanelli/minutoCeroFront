import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as global from "../app/app.global";
import {Equipo} from '../app/models/equipo';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class EquipoService {

<<<<<<< HEAD
  private api = global.serverURL + '/equipo/';
=======
  private api = 'http://192.168.0.172:3000/equipo/';
  // private api = 'http://192.168.100:3000/equipo/';
>>>>>>> cc11b42faff847b524e6b7fe0d73eda76b2f7186

  constructor(private http: HttpClient) {
  }

  createEquipo(equipo) {
    return this.http.post<Equipo>(this.api, equipo);
  }

  invitarJugadores(jugadores) {
    return this.http.post<Equipo>(this.api + 'invitar', jugadores);
  }

  getEquipo(id) {
    return this.http.get<Equipo>(this.api + id);
  }

}
