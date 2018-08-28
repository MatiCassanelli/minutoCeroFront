import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as global from '../app/app.global';
import {Equipo} from '../app/models/equipo';

@Injectable()
export class EquipoService {

  private api = global.serverURL + '/equipo/';

  constructor(private http: HttpClient) {
  }

  createEquipo(equipo) {
    return this.http.post<Equipo>(this.api, equipo, global.httpOptions);
  }

  invitarJugadores(jugadores) {
    return this.http.post<Equipo>(this.api + 'invitar', jugadores, global.httpOptions);
  }

  getEquipo(id) {
    return this.http.get<Equipo>(this.api + id, global.httpOptions);
  }

}
