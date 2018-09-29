import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as global from '../app/app.global';
import {Equipo} from '../app/models/equipo';
import {environment} from "../environments/environment";

@Injectable()
export class EquipoService {

  private api = environment.baseUrl + '/equipo/';

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
