import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as global from '../app/app.global';
import {Jugador} from '../app/models/jugador';
import {environment} from "../environments/environment";

@Injectable()
export class JugadorService {

  private api = environment.baseUrl + '/jugador/';

  constructor(private http: HttpClient) {
  }

  getJugadores(nombre: any = null) {
    if (nombre === null) {
      return this.http.get<Array<Jugador>>(this.api + 'all', global.httpOptions);
    } else {
      return this.http.get<Array<Jugador>>(this.api + 'buscar/' + nombre, global.httpOptions);
    }
  }

  getJugadorById(id: string) {
    return this.http.get<Jugador>(this.api + 'id/' + id, global.httpOptions);
  }

  getJugadoresRankeados() {
    return this.http.get<Array<Jugador>>(this.api + 'ranking', global.httpOptions);
  }

}
