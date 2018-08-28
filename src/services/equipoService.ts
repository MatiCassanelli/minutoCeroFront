import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as global from '../app/app.global';
import {Equipo} from '../app/models/equipo';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: true
};

@Injectable()
export class EquipoService {

  private api = global.serverURL + '/equipo/';

  constructor(private http: HttpClient) {
  }

  createEquipo(equipo) {
    return this.http.post<Equipo>(this.api, equipo, httpOptions);
  }

  invitarJugadores(jugadores) {
    return this.http.post<Equipo>(this.api + 'invitar', jugadores, httpOptions);
  }

  getEquipo(id) {
    return this.http.get<Equipo>(this.api + id, httpOptions);
  }

}
